'use client'

import { useState } from 'react'
import { usePublicClient } from 'wagmi'
import { MERCH_MANAGER_ADDRESS } from '@/lib/contracts'

// ABI solo para los eventos que necesitamos
const EVENT_ABI = [
  {
    "type": "event",
    "name": "EventCreated",
    "inputs": [
      { "name": "eventId", "type": "bytes32", "indexed": true, "internalType": "bytes32" },
      { "name": "creator", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "name", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "description", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "imageURI", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "maxAttendees", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ]
  },
  {
    "type": "event",
    "name": "EventRegistered",
    "inputs": [
      { "name": "eventId", "type": "bytes32", "indexed": true, "internalType": "bytes32" },
      { "name": "metadata", "type": "string", "indexed": false, "internalType": "string" }
    ]
  }
] as const

export function EventIdFinder() {
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const publicClient = usePublicClient()

  const fetchLatestEvents = async () => {
    if (!publicClient) {
      console.error('Public client not available')
      return
    }

    setIsLoading(true)
    console.log('🔍 Buscando últimos 10 eventos creados...')

    try {
      // Obtener el bloque actual
      const currentBlock = await publicClient.getBlockNumber()
      
      // Consultar los últimos 20,000 bloques (suficiente para encontrar eventos recientes)
      const fromBlock = currentBlock - BigInt(20000) > BigInt(0) ? currentBlock - BigInt(20000) : BigInt(0)

      // Obtener eventos EventCreated
      const eventCreatedLogs = await publicClient.getLogs({
        address: MERCH_MANAGER_ADDRESS,
        event: EVENT_ABI[0], // EventCreated
        fromBlock: fromBlock,
        toBlock: currentBlock
      })

      console.log('📅 Total eventos encontrados:', eventCreatedLogs.length)

      // Tomar solo los últimos 10 eventos (más recientes)
      const latestEvents = eventCreatedLogs
        .slice(-10) // Últimos 10
        .reverse() // Más reciente primero
        .map((log, index) => {
          const { eventId, creator, name, description, imageURI, maxAttendees, timestamp } = log.args
          
          console.log(`\n🎉 Evento #${index + 1} (Más reciente):`)
          console.log('   Event ID:', eventId)
          console.log('   Name:', name)
          console.log('   Creator:', creator)
          console.log('   Block:', log.blockNumber?.toString())
          console.log('   Tx Hash:', log.transactionHash)

          return {
            eventId: eventId as string,
            name: name as string,
            creator: creator as string,
            description: description as string,
            imageURI: imageURI as string,
            maxAttendees: maxAttendees?.toString(),
            timestamp: timestamp?.toString(),
            blockNumber: log.blockNumber?.toString(),
            transactionHash: log.transactionHash
          }
        })

      setEvents(latestEvents)

      console.log('\n🔑 ÚLTIMOS 10 EVENT IDs:')
      latestEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.eventId} - "${event.name}"`)
      })

      if (latestEvents.length === 0) {
        console.log('⚠️  No se encontraron eventos recientes')
      }

    } catch (error: any) {
      console.error('❌ Error consultando eventos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
          � Últimos 10 Eventos Creados
        </h3>
        <p className="text-xs text-white/70">
          Lista los 10 eventos más recientes del contrato
        </p>
      </div>

      <button
        onClick={fetchLatestEvents}
        disabled={isLoading}
        className="w-full bg-blue-500/20 text-blue-400 font-bold py-2 px-4 rounded-lg uppercase tracking-wider hover:bg-blue-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full" />
            Consultando...
          </>
        ) : (
          '� Obtener Últimos 10 Eventos'
        )}
      </button>

      {events.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-blue-400 mb-3">
            ✅ {events.length} eventos encontrados (más reciente primero):
          </p>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {events.map((event, index) => (
              <div key={index} className="bg-black/30 rounded p-3 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-mono text-blue-400 font-semibold">
                    Event ID: {event.eventId}
                  </div>
                  <div className="text-xs text-white/40">
                    #{index + 1}
                  </div>
                </div>
                <div className="text-sm text-white/90 font-medium mb-1">
                  📌 {event.name}
                </div>
                <div className="text-xs text-white/60 space-y-1">
                  <div>� Creator: {event.creator?.slice(0, 8)}...{event.creator?.slice(-6)}</div>
                  <div>🧱 Bloque: {event.blockNumber} | 🔗 Tx: {event.transactionHash?.slice(0, 10)}...</div>
                  {event.description && (
                    <div>📝 {event.description}</div>
                  )}
                  {event.maxAttendees && (
                    <div>👥 Max asistentes: {event.maxAttendees}</div>
                  )}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(event.eventId)
                    console.log('📋 Event ID copiado:', event.eventId)
                  }}
                  className="mt-2 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 transition-colors"
                >
                  📋 Copiar Event ID
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && !isLoading && (
        <div className="mt-4 text-center text-white/50 py-6">
          📭 No hay eventos para mostrar. Haz clic en el botón para buscar.
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-xs text-white/40">
          💡 Los Event IDs aparecen aquí y también en la consola del navegador. 
          Puedes copiar cualquiera para usar en tu API mock.
        </p>
      </div>
    </div>
  )
}