'use client'

import { useState } from 'react'
import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { MERCH_MANAGER_ADDRESS, MERCH_MANAGER_ABI } from '@/lib/contracts'

// Lista de imágenes premium disponibles
const PREMIUM_MERCH_ITEMS = [
  { name: "Premium Backpack", image: "/premiun_merch/backpack-leather.png", description: "Luxury leather backpack" },
  { name: "Premium Box", image: "/premiun_merch/box.png", description: "Exclusive collectible box" },
  { name: "Premium Hat", image: "/premiun_merch/hat.png", description: "Limited edition hat" },
  { name: "Premium Headphones", image: "/premiun_merch/headphones.png", description: "High-quality headphones" },
  { name: "Premium Key", image: "/premiun_merch/keyyy.png", description: "Special access key" },
  { name: "Premium Thermo", image: "/premiun_merch/thermo.png", description: "Insulated premium bottle" }
]

// Función para asignar imagen completamente aleatoria
function getRandomPremiumItem(walletAddress: string) {
  // Generar índice completamente aleatorio
  const randomIndex = Math.floor(Math.random() * PREMIUM_MERCH_ITEMS.length)
  
  console.log('🎲 Premium item selected:', randomIndex, '→', PREMIUM_MERCH_ITEMS[randomIndex].name)
  
  return PREMIUM_MERCH_ITEMS[randomIndex]
}

export default function UpgradeMerch() {
  const [tokenId, setTokenId] = useState('')
  const [assignedPremiumImage, setAssignedPremiumImage] = useState<any>(null)
  const { address } = useAccount()
  
  const { 
    writeContract, 
    data: hash, 
    isPending 
  } = useWriteContract()

  // Obtener el fee de upgrade
  const { data: upgradeFee } = useReadContract({
    address: MERCH_MANAGER_ADDRESS,
    abi: MERCH_MANAGER_ABI,
    functionName: 'getUpgradeFee',
  })

  // EventId hardcodeado
  const eventId = '0x6b312232b3620ed141d4909a14bb3a9596ea213d41750da2e8427d3d7f82cd4d'

  // Esperar confirmación de transacción
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Asignar imagen premium cuando el upgrade sea exitoso
  if (isSuccess && hash && !assignedPremiumImage) {
    const premiumItem = getRandomPremiumItem(address || '')
    setAssignedPremiumImage(premiumItem)
    console.log('🎉 Premium NFT upgraded! Assigned image:', premiumItem.name)
  }

  const handleUpgrade = async () => {
    if (!tokenId || !address || !upgradeFee) return

    try {      
      await writeContract({
        address: MERCH_MANAGER_ADDRESS,
        abi: MERCH_MANAGER_ABI,
        functionName: 'mintCompanionWithAttestation',
        args: [
          BigInt(tokenId), // SBT ID
          address, // organizer (puede ser el mismo usuario)
          eventId // eventId hardcodeado
        ],
        value: upgradeFee
      })
    } catch (error) {
      console.error('Error upgrading NFT:', error)
      alert('Error upgrading NFT. Please try again.')
    }
  }

  const resetForm = () => {
    setTokenId('')
    setAssignedPremiumImage(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">
           UPGRADE MERCH
        </h3>
        <p className="text-sm text-white/70">
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenId" className="block text-sm font-medium text-white/80 mb-2">
            Token ID of the SBT to upgrade:
          </label>
          <input
            type="number"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Ej: 1"
            min="1"
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#c8ff00] focus:outline-none font-mono"
          />
        </div>

        {upgradeFee && (
          <div className="bg-blue-500/20 border border-blue-400 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">💰</span>
              </div>
              <span className="text-blue-400 text-sm">
                Fee: <span className="font-bold">{formatEther(upgradeFee)} ETH</span>
              </span>
            </div>
          </div>
        )}

        {tokenId && (
          <div className="bg-green-500/20 border border-green-400 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">✓</span>
              </div>
              <span className="text-green-400 text-sm font-bold">Ready for upgrade</span>
            </div>
          </div>
        )}

        <button
          onClick={handleUpgrade}
          disabled={!tokenId || !address || isPending || isConfirming}
          className="w-full bg-[#c8ff00] text-black font-bold py-3 px-4 rounded-lg uppercase tracking-wider hover:bg-[#b3e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            'Upgrade a Premium NFT'
          )}
        </button>

        {hash && (
          <div className="bg-green-500/20 border border-green-400 rounded-lg p-3">
            {isConfirming ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full" />
                <span className="text-green-400 text-sm">Confirming transaction...</span>
              </div>
            ) : isSuccess ? (
              <div className="space-y-3">
                {/* Congratulations Header */}
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">🎉</div>
                  <h4 className="text-lg font-bold text-[#c8ff00] uppercase tracking-wider mb-1">
                    CONGRATULATIONS!
                  </h4>
                  <p className="text-sm text-white/80">
                    YOU GET THIS PREMIUM MERCH
                  </p>
                </div>

                {/* Premium Image Display */}
                {assignedPremiumImage && (
                  <div className="bg-black/50 rounded-lg p-4 border border-purple-400/30">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={assignedPremiumImage.image} 
                          alt={assignedPremiumImage.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-purple-400 mb-1">
                          {assignedPremiumImage.name}
                        </h4>
                        <p className="text-xs text-white/70">
                          {assignedPremiumImage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Transaction Info */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <span className="text-green-400 font-bold">Upgrade successful!</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-white/60 font-mono mb-2">
                    TX: {hash.slice(0, 10)}...{hash.slice(-8)}
                  </p>
                  <a 
                    href={`https://sepolia.basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs hover:bg-blue-500/30 transition-colors"
                  >
                    🔍 Check on BaseScan
                  </a>
                </div>

                {/* Reset button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={resetForm}
                    className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Upgrade another NFT?
                  </button>
                </div>
              </div>
            ) : (
              <a 
                href={`https://sepolia.basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs hover:bg-blue-500/30 transition-colors"
              >
                Check transaction on BaseScan
              </a>
            )}
          </div>
        )}

        {!address && (
          <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">!</span>
              </div>
              <span className="text-red-400 text-sm">
                Connect your wallet to upgrade
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-xs text-white/40">
          Convert your Soul Bound Token into a premium NFT
        </p>
      </div>
    </div>
  )
}