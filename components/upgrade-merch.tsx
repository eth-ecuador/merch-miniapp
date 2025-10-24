'use client'

import { useState } from 'react'
import { useWriteContract, useReadContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { MERCH_MANAGER_ADDRESS, MERCH_MANAGER_ABI } from '@/lib/contracts'

export default function UpgradeMerch() {
  const [tokenId, setTokenId] = useState('')
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
  const eventId = '0x0eac07785f7b27268559ab98f25d670e1d16dcdde0c96b0941b1db0d5663b0dc'

  // Esperar confirmación de transacción
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

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

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-center">🔄 UPGRADE MERCH</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Convierte tu SBT a Premium NFT (tradeable ERC-721)
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700 mb-2">
            Token ID del SBT a actualizar:
          </label>
          <input
            type="number"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 1"
            min="1"
          />
        </div>

        {upgradeFee && (
          <div className="text-sm text-gray-600 text-center">
            <p>Fee de upgrade: <span className="font-semibold">{formatEther(upgradeFee)} ETH</span></p>
          </div>
        )}

        {tokenId && (
          <div className="text-sm text-green-600 text-center">
            <p>✅ Listo para upgrade</p>
          </div>
        )}

        <button
          onClick={handleUpgrade}
          disabled={!tokenId || !address || isPending || isConfirming}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending || isConfirming ? 'Procesando...' : 'Upgrade a Premium NFT'}
        </button>

        {hash && (
          <div className="text-center text-sm">
            {isConfirming ? (
              <p className="text-yellow-600">Confirmando transacción...</p>
            ) : isSuccess ? (
              <div className="text-green-600">
                <p>✅ ¡Upgrade exitoso!</p>
                <a 
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ver en BaseScan
                </a>
              </div>
            ) : (
              <a 
                href={`https://sepolia.basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ver transacción en BaseScan
              </a>
            )}
          </div>
        )}

        {!address && (
          <p className="text-center text-red-600 text-sm">
            Conecta tu wallet para hacer upgrade
          </p>
        )}
      </div>
    </div>
  )
}