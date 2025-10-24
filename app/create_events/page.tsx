"use client"

// Keep "use client" exactly as in your file

import { useState } from "react"
import Link from "next/link"
import { ArrowLeftIcon, PhotoIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { MERCH_MANAGER_ABI, MERCH_MANAGER_ADDRESS } from "@/lib/contracts"

// Futuristic theme pieces (same look as your Store page)
import { CircuitBackground } from "@/components/circuit-background"
import { FuturisticCard } from "@/components/futuristic-card"

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
        { trait_type: "Event Type", value: "Merchandise" },
        { trait_type: "Quantity", value: formData.quantity },
        { trait_type: "Creator", value: displayName || "Anonymous" }
      ]
    }
    return metadata
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.image || !address) {
      alert('Please complete all fields and connect your wallet')
      return
    }

    try {
      setCurrentStep('uploading')
      const imageHash = await uploadToIPFS(formData.image)
      const metadata = createEventMetadata(imageHash)

      setCurrentStep('creating')
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
      alert('Error creating the event. Please try again.')
      setCurrentStep('form')
    }
  }

  // Handle transaction success
  if (isConfirmed && currentStep === 'creating') {
    setCurrentStep('success')
    setTimeout(() => {
      setFormData({ name: "", description: "", image: null, quantity: 1 })
      setPreviewUrl(null)
      setCurrentStep('form')
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
        <CircuitBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#c8ff00] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Futuristic header */}
        <FuturisticCard accentColor="#00d4ff" contentClassName="p-5 md:p-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 rounded-lg border-2 border-cyan-400/60 hover:border-cyan-300 hover:bg-cyan-400/10 transition"
              aria-label="Back"
            >
              <ArrowLeftIcon className="w-5 h-5 text-cyan-300" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest text-[#c8ff00] uppercase">
                Create Event
              </h1>
              <div className="mt-2 h-2 bg-blue-900/50 border-2 border-cyan-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#c8ff00] to-[#a8df00] w-1/3" />
              </div>
            </div>
          </div>
        </FuturisticCard>

        {/* Progress / success state */}
        {currentStep === 'success' && (
          <FuturisticCard accentColor="#61ff7e" contentClassName="p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#61ff7e] rounded-sm grid place-items-center font-extrabold text-black leading-none">✓</div>
              <div>
                <h3 className="text-[#61ff7e] font-bold uppercase tracking-wider">Event Created Successfully!</h3>
                <p className="text-cyan-100/80 text-sm mt-1">
                  The backend will automatically detect your event and generate 100 claim codes.
                </p>
                {hash && (
                  <p className="text-cyan-200/80 text-xs mt-2 font-mono">
                    TX: {hash.slice(0, 10)}...{hash.slice(-8)}
                  </p>
                )}
              </div>
            </div>
          </FuturisticCard>
        )}

        {/* Form wrapped in a futuristic card */}
        <FuturisticCard accentColor="#00d4ff" contentClassName="p-5 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
            <label className="block pl-3 text-xs md:text-sm font-semibold text-cyan-200 mb-2 uppercase tracking-[0.2em]">
                    Event Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a0a3d] border-2 border-cyan-400/40 rounded-lg text-white placeholder-cyan-200/40 focus:outline-none focus:border-[#c8ff00] focus:ring-0"
                placeholder="Enter the event name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block pl-3 text-xs md:text-sm font-semibold text-cyan-200 mb-2 uppercase tracking-[0.2em]">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-[#0a0a3d] border-2 border-cyan-400/40 rounded-lg text-white placeholder-cyan-200/40 focus:outline-none focus:border-[#c8ff00] resize-none"
                placeholder="Describe your event"
                required
              />
            </div>

            {/* Image */}
            <div>
            <label className="block pl-3 text-xs md:text-sm font-semibold text-cyan-200 mb-2 uppercase tracking-[0.2em]">
                Event Image
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
                  className="block w-full p-4 md:p-6 bg-[#0a0a3d] border-2 border-dashed border-cyan-400/40 rounded-lg cursor-pointer hover:border-[#c8ff00] transition"
                >
                  {previewUrl ? (
                    <div className="space-y-3">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <p className="text-xs md:text-sm text-cyan-100/80 text-center">
                        Click to change the image
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <PhotoIcon className="w-12 h-12 text-cyan-300/60 mx-auto mb-2" />
                      <p className="text-cyan-100/90">Select an image</p>
                      <p className="text-[10px] md:text-xs text-cyan-200/60 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Quantity */}
            <div>
            <label className="block pl-3 text-xs md:text-sm font-semibold text-cyan-200 mb-2 uppercase tracking-[0.2em]">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 bg-[#0a0a3d] border-2 border-cyan-400/40 rounded-lg text-white placeholder-cyan-200/40 focus:outline-none focus:border-[#c8ff00]"
                placeholder="Number of NFTs"
                required
              />
            </div>

            {/* Creator info */}
            {address && (
              <div className="bg-[#0a0a3d] rounded-lg p-4 border-2 border-cyan-400/30">
                <p className="text-[10px] text-cyan-300/70 uppercase tracking-[0.25em] mb-1">Creator</p>
                <p className="text-sm text-cyan-50 font-medium">{displayName || 'Anonymous'}</p>
                <p className="text-xs text-cyan-200/80 font-mono">{address.slice(0, 6)}...{address.slice(-4)}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={currentStep !== 'form' || !address}
              className="w-full bg-[#c8ff00] text-black font-extrabold py-4 px-6 rounded-lg uppercase tracking-widest hover:bg-[#b3e600] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(currentStep === 'uploading' || isUploading) ? (
                <>
                  <CloudArrowUpIcon className="w-5 h-5" />
                  Uploading to IPFS...
                </>
              ) : (currentStep === 'creating' || isPending || isConfirming) ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                  {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Creating Event...'}
                </>
              ) : currentStep === 'success' ? (
                <>✅ Event Created!</>
              ) : (
                'Create Event'
              )}
            </button>
          </form>
        </FuturisticCard>

        {/* Decorative footer */}
        <div className="mt-8 opacity-70">
          <FuturisticCard accentColor="#00d4ff" contentClassName="py-3 px-4">
            <p className="text-center text-xs tracking-[0.25em] text-cyan-200/70 uppercase">
              Powered by Base
            </p>
          </FuturisticCard>
        </div>
      </div>
    </div>
  )
}
