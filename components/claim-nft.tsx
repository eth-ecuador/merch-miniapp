"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"
import { MERCH_MANAGER_ABI, MERCH_MANAGER_ADDRESS } from "@/lib/contracts"
import { saveClaimedNFT, CollectedNFT } from "@/lib/nft-collection-storage"

interface ClaimResponse {
  eventId: string
  tokenURI: string
  signature: string
  is_valid: boolean
  metadata?: any
  // Agregamos la imagen asignada externamente
  assignedImage?: {
    name: string
    image: string
    description: string
  }
}

// Lista de imágenes disponibles en basic_merch
const BASIC_MERCH_ITEMS = [
  { name: "Coffee Cup", image: "/basic_merch/cup.png", description: "Premium ceramic coffee cup" },
  { name: "Travel Glass", image: "/basic_merch/glass_carryon.png", description: "Durable travel glass" },
  { name: "Glass Cup", image: "/basic_merch/glass_cup.png", description: "Elegant glass cup" },
  { name: "Event Hat", image: "/basic_merch/hat_merch.png", description: "Stylish event hat" },
  { name: "Tote Bag", image: "/basic_merch/tote_bag.png", description: "Eco-friendly tote bag" },
  { name: "Event T-Shirt", image: "/basic_merch/tshirt.png", description: "Comfortable event t-shirt" }
]

// Función para asignar imagen completamente aleatoria
function getRandomMerchItem(walletAddress: string) {
  // Generar índice completamente aleatorio
  const randomIndex = Math.floor(Math.random() * BASIC_MERCH_ITEMS.length)
  
  console.log('🎲 Item aleatorio seleccionado:', randomIndex, '→', BASIC_MERCH_ITEMS[randomIndex].name)
  
  return BASIC_MERCH_ITEMS[randomIndex]
}

export function ClaimNFT() {
  const { address } = useBaseAccountUser()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const [claimCode, setClaimCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [claimData, setClaimData] = useState<ClaimResponse | null>(null)
  const [step, setStep] = useState<'input' | 'verified' | 'minting' | 'success'>('input')

  const verifyCode = async () => {
    if (!claimCode.trim() || !address) {
      setError("Por favor ingresa un código y conecta tu wallet")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      const response = await fetch('https://merch-backend-ot7l.onrender.com/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY!
        },
        body: JSON.stringify({
          code: claimCode.trim(),
          walletAddress: address
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error verificando el código')
      }

      if (!data.is_valid) {
        throw new Error(data.error || 'Código inválido')
      }

      // 🎨 Asignar imagen aleatoria basada en wallet address
      const assignedImage = getRandomMerchItem(address)
      console.log('🎨 Imagen asignada:', assignedImage.name, '->', assignedImage.image)

      // Agregar imagen a los datos del claim
      const enhancedData = {
        ...data,
        assignedImage
      }

      setClaimData(enhancedData)
      setStep('verified')
      console.log('Código verificado con imagen:', enhancedData)

    } catch (err: any) {
      console.error('Error verifying code:', err)
      setError(err.message)
    } finally {
      setIsVerifying(false)
    }
  }

  const mintNFT = async () => {
    if (!claimData || !address) return

    setStep('minting')
    setError(null)

    try {
      console.log('Minteando NFT con datos:', {
        to: address,
        tokenURI: claimData.tokenURI,
        eventId: claimData.eventId,
        signature: claimData.signature
      })

      writeContract({
        address: MERCH_MANAGER_ADDRESS,
        abi: MERCH_MANAGER_ABI,
        functionName: 'mintSBTWithAttestation',
        args: [
          address as `0x${string}`,
          claimData.tokenURI,
          claimData.eventId as `0x${string}`,
          claimData.signature as `0x${string}`
        ],
      })

    } catch (err: any) {
      console.error('Error minting NFT:', err)
      setError(err.message)
      setStep('verified')
    }
  }

  // Handle transaction success
  if (isConfirmed && step === 'minting') {
    setStep('success')
    
    // 💾 Guardar NFT en colección local
    if (claimData && hash && address) {
      const nftData: CollectedNFT = {
        id: hash, // usar hash como ID único
        walletAddress: address,
        eventId: claimData.eventId,
        name: claimData.assignedImage?.name || 'Unknown Item',
        image: claimData.assignedImage?.image || '',
        description: claimData.assignedImage?.description || '',
        claimedAt: new Date().toISOString(),
        transactionHash: hash
      }
      
      saveClaimedNFT(nftData)
      console.log('💾 NFT guardado en colección local:', nftData)
    }
  }

  const resetForm = () => {
    setClaimCode("")
    setClaimData(null)
    setError(null)
    setStep('input')
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-[#c8ff00] uppercase tracking-wider mb-1">
          CLAIM NFT
        </h3>
        <p className="text-xs text-white/60 uppercase tracking-wider">
          Enter your event code
        </p>
      </div>

      {/* Success State */}
      {step === 'success' && (
        <div className="text-center space-y-4">
          {/* Mostrar la imagen NFT obtenida */}
          {claimData?.assignedImage && (
            <div className="mx-auto mb-4">
              <div className="w-24 h-24 mx-auto mb-3 bg-white/10 rounded-lg overflow-hidden border border-[#c8ff00]/50">
                <img 
                  src={claimData.assignedImage.image} 
                  alt={claimData.assignedImage.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg'
                  }}
                />
              </div>
              <h4 className="text-[#c8ff00] font-bold text-sm mb-1">
                {claimData.assignedImage.name}
              </h4>
              <p className="text-xs text-white/70">
                You have obtained this NFT!
              </p>
            </div>
          )}
          
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <p className="text-green-400 font-bold mb-2">NFT Claimed Successfully!</p>
            <p className="text-xs text-white/80">
              Your Soul Bound Token has been minted
            </p>
            {hash && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-white/60 font-mono">
                  TX: {hash.slice(0, 10)}...{hash.slice(-8)}
                </p>
                {/* Link a BaseScan */}
                <a 
                  href={`https://base-sepolia.blockscout.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs hover:bg-blue-500/30 transition-colors"
                >
                  🔍 Ver en BaseScan
                </a>
              </div>
            )}
          </div>

          {/* Botón para canjear otro código */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={resetForm}
              className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Claim another code?
            </button>
          </div>
        </div>
      )}

      {/* Input State */}
      {step === 'input' && (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
              placeholder="VIP-ABC123-0001"
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#c8ff00] focus:outline-none font-mono"
              disabled={isVerifying}
            />
          </div>

          <button
            onClick={verifyCode}
            disabled={isVerifying || !claimCode.trim() || !address}
            className="w-full bg-[#c8ff00] text-black font-bold py-3 px-4 rounded-lg uppercase tracking-wider hover:bg-[#b3e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>
        </div>
      )}

      {/* Verified State */}
      {step === 'verified' && claimData && (
        <div className="space-y-4">
          <div className="bg-green-500/20 border border-green-400 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">✓</span>
              </div>
              <span className="text-green-400 text-sm font-bold">Valid code</span>
            </div>
            <p className="text-xs text-white/80">
              {claimData.metadata?.name || 'Event NFT'}
            </p>
          </div>

          {/* Mostrar imagen asignada */}
          {claimData.assignedImage && (
            <div className="bg-[#c8ff00]/10 border border-[#c8ff00]/30 rounded-lg p-3">
              <p className="text-xs text-[#c8ff00] mb-3 uppercase tracking-wider text-center">
                 Your NFT will be:
              </p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                  <img 
                    src={claimData.assignedImage.image} 
                    alt={claimData.assignedImage.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.jpg'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">
                    {claimData.assignedImage.name}
                  </h4>
                  <p className="text-xs text-white/70">
                    {claimData.assignedImage.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={resetForm}
              className="flex-1 bg-white/10 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={mintNFT}
              disabled={isPending || isConfirming}
              className="flex-2 bg-[#c8ff00] text-black font-bold py-3 px-4 rounded-lg uppercase tracking-wider hover:bg-[#b3e600] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  Confirming...
                </>
              ) : isConfirming ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  Minting...
                </>
              ) : (
                'Claim NFT'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">!</span>
            </div>
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-center">
        <p className="text-xs text-white/40">
          Event codes are provided at events
        </p>
      </div>
    </div>
  )
}