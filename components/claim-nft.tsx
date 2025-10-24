"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"
import { MERCH_MANAGER_ABI, MERCH_MANAGER_ADDRESS } from "@/lib/contracts"

interface ClaimResponse {
  eventId: string
  tokenURI: string
  signature: string
  is_valid: boolean
  metadata?: any
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

      setClaimData(data)
      setStep('verified')
      console.log('Código verificado:', data)

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
    
    // Reset after success
    setTimeout(() => {
      setClaimCode("")
      setClaimData(null)
      setStep('input')
    }, 5000)
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
          Reclamar NFT
        </h3>
        <p className="text-xs text-white/60 uppercase tracking-wider">
          Ingresa tu código de evento
        </p>
      </div>

      {/* Success State */}
      {step === 'success' && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <p className="text-green-400 font-bold mb-2">¡NFT Reclamado Exitosamente!</p>
            <p className="text-xs text-white/80">
              Tu Soul Bound Token ha sido mintado
            </p>
            {hash && (
              <p className="text-xs text-white/60 mt-2 font-mono">
                TX: {hash.slice(0, 10)}...{hash.slice(-8)}
              </p>
            )}
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
                Verificando...
              </>
            ) : (
              'Verificar Código'
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
              <span className="text-green-400 text-sm font-bold">Código Válido</span>
            </div>
            <p className="text-xs text-white/80">
              {claimData.metadata?.name || 'NFT de Evento'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetForm}
              className="flex-1 bg-white/10 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={mintNFT}
              disabled={isPending || isConfirming}
              className="flex-2 bg-[#c8ff00] text-black font-bold py-3 px-4 rounded-lg uppercase tracking-wider hover:bg-[#b3e600] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  Confirmando...
                </>
              ) : isConfirming ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  Minteando...
                </>
              ) : (
                'Reclamar NFT'
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
          Los códigos son proporcionados en eventos
        </p>
      </div>
    </div>
  )
}