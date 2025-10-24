import { EventIdFinder } from '@/components/event-id-finder'
import { ClaimNFT } from '@/components/claim-nft'

export default function DevToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            🛠️ Dev Tools
          </h1>
          <p className="text-sm text-white/60">
            Herramientas para desarrolladores
          </p>
        </div>

        {/* Event ID Finder */}
        <EventIdFinder />

        {/* Separador */}
        <div className="border-t border-white/20"></div>

        {/* Claim NFT para pruebas */}
        <div className="bg-white/5 border border-white/20 rounded-lg p-4">
          <h3 className="text-sm font-bold text-white mb-3 text-center">
            🎟️ Test Claim NFT
          </h3>
          <ClaimNFT />
        </div>

        {/* Info */}
        <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
          <h3 className="text-sm font-bold text-yellow-400 mb-2">💡 Instrucciones:</h3>
          <ol className="text-xs text-white/80 space-y-1 list-decimal list-inside">
            <li>Haz clic en "Buscar Event IDs" para consultar eventos del contrato</li>
            <li>Revisa la consola del navegador (F12) para ver los Event IDs</li>
            <li>Copia un Event ID válido para usar en tu mock API</li>
            <li>Prueba el claim NFT con un código válido del backend</li>
          </ol>
        </div>
      </div>
    </div>
  )
}