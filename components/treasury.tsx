"use client"

import { useState, useEffect } from "react"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"
import { getUserCollection, getUserStats, CollectedNFT } from "@/lib/nft-collection-storage"

export function Treasury() {
  const { address } = useBaseAccountUser()
  const [userNFTs, setUserNFTs] = useState<CollectedNFT[]>([])
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (address) {
      loadUserCollection()
    } else {
      setUserNFTs([])
      setStats(null)
      setIsLoading(false)
    }
  }, [address])

  const loadUserCollection = () => {
    if (!address) return
    
    setIsLoading(true)
    try {
      const collection = getUserCollection(address)
      const userStats = getUserStats(address)
      
      setUserNFTs(collection)
      setStats(userStats)
      
      console.log('📊 Colección cargada:', collection.length, 'NFTs')
      console.log('📈 Estadísticas:', userStats)
    } catch (error) {
      console.error('Error loading user collection:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!address) {
    return (
      <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider mb-2">
            🏛️ Treasury
          </h3>
          <p className="text-sm text-white/70 mb-4">
            Tu colección personal de NFTs
          </p>
          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-white/60 text-sm">
              🔌 Conecta tu wallet para ver tu colección
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider mb-2">
            🏛️ Treasury
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full" />
            <span className="text-white/70 text-sm">Cargando colección...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider mb-2">
          🏛️ Treasury
        </h3>
        <p className="text-sm text-white/70">
          Tu colección personal de NFTs
        </p>
      </div>

      {userNFTs.length === 0 ? (
        <div className="text-center">
          <div className="bg-black/30 rounded-lg p-6">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-white/60 text-sm mb-2">
              Aún no tienes NFTs en tu colección
            </p>
            <p className="text-white/40 text-xs">
              ¡Reclama códigos para empezar tu colección!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Estadísticas */}
          <div className="bg-black/30 rounded-lg p-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-purple-400 font-medium">📊 Total:</span>
              <span className="text-white/80 font-bold">{stats?.totalNFTs || 0} NFTs</span>
            </div>
            {stats?.lastClaim && (
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-purple-400 font-medium">⏰ Último claim:</span>
                <span className="text-white/60">{formatDate(stats.lastClaim)}</span>
              </div>
            )}
          </div>

          {/* Grid de NFTs */}
          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {userNFTs.map((nft, index) => (
              <div key={nft.id} className="bg-black/30 rounded-lg p-3 border border-white/10">
                <div className="w-full aspect-square bg-white/10 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.jpg'
                    }}
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-white/90 font-medium text-xs mb-1">
                    {nft.name}
                  </h4>
                  <p className="text-white/50 text-xs">
                    {formatDate(nft.claimedAt)}
                  </p>
                  <div className="mt-1">
                    <span className="inline-block bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contadores por tipo */}
          {stats?.itemCounts && Object.keys(stats.itemCounts).length > 0 && (
            <div className="bg-black/30 rounded-lg p-3">
              <h4 className="text-purple-400 text-xs font-medium mb-2">📦 Por tipo:</h4>
              <div className="space-y-1">
                {Object.entries(stats.itemCounts).map(([itemName, count]) => (
                  <div key={itemName} className="flex justify-between items-center text-xs">
                    <span className="text-white/70">{itemName}</span>
                    <span className="text-purple-400 font-bold">×{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botón de refrescar */}
          <button
            onClick={loadUserCollection}
            className="w-full bg-purple-500/20 text-purple-400 text-xs py-2 rounded hover:bg-purple-500/30 transition-colors"
          >
            🔄 Actualizar colección
          </button>
        </div>
      )}
    </div>
  )
}