// Sistema de almacenamiento lite para colección de NFTs
// Completamente externo al contrato

export interface CollectedNFT {
  id: string // hash de transacción como ID único
  walletAddress: string
  eventId: string
  name: string
  image: string
  description: string
  claimedAt: string // timestamp
  transactionHash: string
}

export interface UserCollection {
  walletAddress: string
  nfts: CollectedNFT[]
  lastUpdated: string
}

const STORAGE_KEY = 'merch_nft_collection'

// Obtener colección completa del localStorage
export function getAllCollections(): Record<string, UserCollection> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error loading collections:', error)
    return {}
  }
}

// Obtener colección de un usuario específico
export function getUserCollection(walletAddress: string): CollectedNFT[] {
  try {
    const collections = getAllCollections()
    const userKey = walletAddress.toLowerCase()
    return collections[userKey]?.nfts || []
  } catch (error) {
    console.error('Error loading user collection:', error)
    return []
  }
}

// Guardar nuevo NFT a la colección del usuario
export function saveClaimedNFT(nft: CollectedNFT): void {
  try {
    const collections = getAllCollections()
    const userKey = nft.walletAddress.toLowerCase()
    
    // Inicializar colección del usuario si no existe
    if (!collections[userKey]) {
      collections[userKey] = {
        walletAddress: nft.walletAddress,
        nfts: [],
        lastUpdated: new Date().toISOString()
      }
    }
    
    // Verificar si ya existe este NFT (evitar duplicados)
    const existingIndex = collections[userKey].nfts.findIndex(
      existing => existing.id === nft.id
    )
    
    if (existingIndex >= 0) {
      // Actualizar NFT existente
      collections[userKey].nfts[existingIndex] = nft
      console.log('📝 NFT actualizado en colección:', nft.name)
    } else {
      // Agregar nuevo NFT
      collections[userKey].nfts.push(nft)
      console.log('✅ Nuevo NFT agregado a colección:', nft.name)
    }
    
    // Actualizar timestamp
    collections[userKey].lastUpdated = new Date().toISOString()
    
    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
    
    console.log('💾 Colección guardada para:', nft.walletAddress)
    console.log('📊 Total NFTs del usuario:', collections[userKey].nfts.length)
    
  } catch (error) {
    console.error('Error saving NFT to collection:', error)
  }
}

// Obtener estadísticas de la colección del usuario
export function getUserStats(walletAddress: string) {
  const userNFTs = getUserCollection(walletAddress)
  
  // Contar por tipo de item
  const itemCounts = userNFTs.reduce((acc, nft) => {
    acc[nft.name] = (acc[nft.name] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    totalNFTs: userNFTs.length,
    itemCounts,
    firstClaim: userNFTs.length > 0 ? userNFTs[0].claimedAt : null,
    lastClaim: userNFTs.length > 0 ? userNFTs[userNFTs.length - 1].claimedAt : null
  }
}

// Limpiar colección del usuario (para testing)
export function clearUserCollection(walletAddress: string): void {
  try {
    const collections = getAllCollections()
    const userKey = walletAddress.toLowerCase()
    
    if (collections[userKey]) {
      delete collections[userKey]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections))
      console.log('🗑️ Colección limpiada para:', walletAddress)
    }
  } catch (error) {
    console.error('Error clearing user collection:', error)
  }
}

// Exportar toda la data (para debugging)
export function exportCollections(): string {
  const collections = getAllCollections()
  return JSON.stringify(collections, null, 2)
}