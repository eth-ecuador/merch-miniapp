"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, PhotoIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { MERCH_MANAGER_ABI, MERCH_MANAGER_ADDRESS } from "@/lib/contracts"

interface EventFormData {
  name: string
  description: string
  image: File | null
  quantity: number
}

export default function CreateEventsPage() {
  const { displayName, address, isLoading } = useBaseAccountUser()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })
  
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    image: null,
    quantity: 1
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState<'form' | 'uploading' | 'creating' | 'success'>('form')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      
      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToIPFS = async (file: File): Promise<string> => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('uploaderAddress', address || '')

      const response = await fetch('https://merch-backend-ot7l.onrender.com/api/events/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error uploading to IPFS')
      }

      const data = await response.json()
      return data.ipfsHash
    } catch (error) {
      console.error('Error uploading to IPFS:', error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  const createEventMetadata = (imageHash: string) => {
    const metadata = {
      name: formData.name,
      description: formData.description,
      image: `ipfs://${imageHash}`,
      attributes: [
        {
          trait_type: "Event Type",
          value: "Merchandise"
        },
        {
          trait_type: "Quantity",
          value: formData.quantity
        },
        {
          trait_type: "Creator",
          value: displayName || "Anonymous"
        }
      ]
    }

    return metadata
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.image || !address) {
      alert('Por favor completa todos los campos y conecta tu wallet')
      return
    }

    try {
      // Step 1: Upload image to IPFS
      setCurrentStep('uploading')
      console.log('Subiendo imagen a IPFS...')
      const imageHash = await uploadToIPFS(formData.image)
      console.log('Imagen subida:', imageHash)

      // Step 2: Create metadata
      console.log('Creando metadata...')
      const metadata = createEventMetadata(imageHash)
      console.log('Metadata creada:', metadata)

      // Step 3: Create event on blockchain
      setCurrentStep('creating')
      console.log('Creando evento en la blockchain...')
      
      const imageUri = `ipfs://${imageHash}`
      
      writeContract({
        address: MERCH_MANAGER_ADDRESS,
        abi: MERCH_MANAGER_ABI,
        functionName: 'createEvent',
        args: [
          formData.name,
          formData.description,
          imageUri,
          BigInt(formData.quantity)
        ],
      })

    } catch (error) {
      console.error('Error creating event:', error)
      alert('Error creando el evento. Por favor intenta de nuevo.')
      setCurrentStep('form')
    }
  }

  // Handle transaction success
  if (isConfirmed && currentStep === 'creating') {
    setCurrentStep('success')
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        description: "",
        image: null,
        quantity: 1
      })
      setPreviewUrl(null)
      setCurrentStep('form')
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0000ff] via-[#4169e1] to-[#1e90ff] flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0000ff] via-[#4169e1] to-[#1e90ff] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white uppercase tracking-wider">
            Crear Evento
          </h1>
        </div>

        {/* Progress Status */}
        {currentStep === 'success' && (
          <div className="bg-green-500/20 border border-green-400 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">✓</span>
              </div>
              <h3 className="text-green-400 font-bold uppercase tracking-wider">¡Evento Creado Exitosamente!</h3>
            </div>
            <p className="text-white text-sm">
              El backend detectará automáticamente tu evento y generará 100 códigos de reclamación.
            </p>
            {hash && (
              <p className="text-white/80 text-xs mt-2 font-mono">
                TX: {hash.slice(0, 10)}...{hash.slice(-8)}
              </p>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del evento */}
          <div>
            <label className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
              Nombre del Evento
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#c8ff00] focus:outline-none"
              placeholder="Ingresa el nombre del evento"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#c8ff00] focus:outline-none resize-none"
              placeholder="Describe tu evento"
              required
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
              Imagen del Evento
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                required
              />
              <label
                htmlFor="image-upload"
                className="block w-full p-6 bg-black/30 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#c8ff00] transition-colors"
              >
                {previewUrl ? (
                  <div className="space-y-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <p className="text-sm text-white/80 text-center">
                      Haz clic para cambiar la imagen
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <PhotoIcon className="w-12 h-12 text-white/50 mx-auto mb-2" />
                    <p className="text-white/80">Seleccionar imagen</p>
                    <p className="text-xs text-white/60 mt-1">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
              Cantidad
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#c8ff00] focus:outline-none"
              placeholder="Cantidad de NFTs"
              required
            />
          </div>

          {/* Creator Info */}
          {address && (
            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
              <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Creator</p>
              <p className="text-sm text-white font-medium">{displayName || 'Anonymous'}</p>
              <p className="text-xs text-white/80 font-mono">{address.slice(0, 6)}...{address.slice(-4)}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={currentStep !== 'form' || !address}
            className="w-full bg-[#c8ff00] text-black font-bold py-4 px-6 rounded-lg uppercase tracking-wider hover:bg-[#b3e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {currentStep === 'uploading' ? (
              <>
                <CloudArrowUpIcon className="w-5 h-5" />
                Subiendo a IPFS...
              </>
            ) : currentStep === 'creating' || isPending || isConfirming ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                {isPending ? 'Confirmando...' : isConfirming ? 'Procesando...' : 'Creando Evento...'}
              </>
            ) : currentStep === 'success' ? (
              <>
                ✅ ¡Evento Creado!
              </>
            ) : (
              'Crear Evento'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}