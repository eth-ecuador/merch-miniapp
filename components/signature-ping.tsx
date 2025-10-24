'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { parseEther } from 'viem'

const SIGNATURE_PING_ADDRESS = '0x7fb73f0a85899490b7cd689753b8c0d2ebF64062' as const
const SIGNATURE_PING_ABI = [
  {
    inputs: [],
    name: 'ping',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'hasSigned',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
    name: 'Pinged',
    type: 'event',
  },
] as const

export function SignaturePing() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const [isLoading, setIsLoading] = useState(false)

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const handlePing = async () => {
    try {
      setIsLoading(true)
      
      // Switch to Base Sepolia if not already on it
      if (chainId !== baseSepolia.id) {
        await switchChain({ chainId: baseSepolia.id })
      }

      // Execute the ping function
      writeContract({
        address: SIGNATURE_PING_ADDRESS,
        abi: SIGNATURE_PING_ABI,
        functionName: 'ping',
        value: parseEther('0.001'), // Send 0.001 ETH as test value
      })
    } catch (err) {
      console.error('Error calling ping:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async () => {
    try {
      setIsLoading(true)
      
      // Switch to Base Sepolia if not already on it
      if (chainId !== baseSepolia.id) {
        await switchChain({ chainId: baseSepolia.id })
      }

      // Execute the reset function
      writeContract({
        address: SIGNATURE_PING_ADDRESS,
        abi: SIGNATURE_PING_ABI,
        functionName: 'reset',
      })
    } catch (err) {
      console.error('Error calling reset:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-center">
        <p className="text-red-300">Conecta tu wallet para continuar</p>
      </div>
    )
  }

  const isWrongNetwork = chainId !== baseSepolia.id
  const isProcessing = isPending || isConfirming || isLoading

  return (
    <div className="space-y-4">
      <div className="bg-blue-900/20 border border-cyan-400/50 rounded-lg p-4">
        <h3 className="text-[#c8ff00] font-bold text-lg mb-2">Prueba de Conexión Base Sepolia</h3>
        <p className="text-cyan-300 text-sm mb-2">Contrato: {SIGNATURE_PING_ADDRESS}</p>
        <p className="text-cyan-300 text-sm">Red actual: {chainId === baseSepolia.id ? 'Base Sepolia ✅' : `${chainId} (necesitas cambiar a Base Sepolia)`}</p>
      </div>

      {isWrongNetwork && (
        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 text-center">
          <p className="text-yellow-300 mb-2">Debes cambiar a Base Sepolia</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handlePing}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-[#c8ff00] to-[#a8df00] text-black font-bold py-3 px-6 rounded-lg 
                   hover:from-[#a8df00] hover:to-[#88bf00] transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   shadow-lg shadow-[#c8ff00]/20"
        >
          {isProcessing ? 'Procesando...' : '🚀 PING'}
        </button>

        <button
          onClick={handleReset}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg 
                   hover:from-red-700 hover:to-red-800 transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   shadow-lg shadow-red-600/20"
        >
          {isProcessing ? 'Procesando...' : '🔄 RESET'}
        </button>
      </div>

      {/* Status Messages */}
      {hash && (
        <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
          <p className="text-green-300 text-sm">
            Transacción enviada: 
            <a 
              href={`https://sepolia.basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c8ff00] hover:underline ml-1"
            >
              Ver en BaseScan
            </a>
          </p>
        </div>
      )}

      {isConfirming && (
        <div className="bg-blue-900/20 border border-cyan-400/50 rounded-lg p-4 text-center">
          <p className="text-cyan-300">⏳ Esperando confirmación...</p>
        </div>
      )}

      {isConfirmed && (
        <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 text-center">
          <p className="text-green-300">✅ Transacción confirmada!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300 text-sm">Error: {error.message}</p>
        </div>
      )}
    </div>
  )
}