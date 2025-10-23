'use client'

import { useCallback } from 'react'
import { CircuitBackground } from "@/components/circuit-background"
import { ProfileHeader } from "@/components/profile-header"
import { NavigationTabs } from "@/components/navigation-tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { UserDebugInfo } from "@/components/user-debug-info"
import { useBaseAccountUser } from "@/hooks/useBaseAccountUser"

export default function ProfilePage() {
  const userInfo = useBaseAccountUser()
  const {
    address,
    displayName,
    username,
    pfpUrl,
    isConnected,
    isLoading,
    error,
    authInProgress,
    isInMiniApp,
    requestAuthAddress,
  } = userInfo

  const handleAuthorize = useCallback(async () => {
    try {
      await requestAuthAddress()
    } catch {
      // Errors are surfaced through the hook state
    }
  }, [requestAuthAddress])

  return (
    <div className="min-h-screen bg-[#1a1a4d] text-white relative overflow-hidden">
      <CircuitBackground />

      <div className="relative z-10 p-6 max-w-md mx-auto">
        <ProfileHeader />
        <NavigationTabs />

        <div className="relative mt-12 mb-8">
          <div className="absolute -top-8 -left-4 w-16 h-16 border-l-4 border-t-4 border-[#c8ff00]"></div>
          <div className="absolute -top-8 -right-4 w-16 h-16 border-r-4 border-t-4 border-[#c8ff00]"></div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#c8ff00]"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-[#c8ff00]"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-[#c8ff00]"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#c8ff00]"></div>

              <div className="w-64 h-64 bg-[#0000ff] rounded-2xl border-4 border-white flex items-center justify-center shadow-2xl overflow-hidden">
                {isLoading ? (
                  <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full" aria-label="Cargando perfil" />
                ) : pfpUrl ? (
                  <img
                    src={pfpUrl}
                    alt={displayName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[160px] font-bold text-white">
                    {displayName ? displayName[0]?.toUpperCase() : 'A'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mb-6 space-y-3">
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                {isLoading ? 'Cargando...' : displayName || 'Anon User'}
              </h2>
              <p className="text-xl text-white/90 uppercase tracking-wide">Novato del Merch</p>
              {username && (
                <p className="text-lg text-white/70 tracking-wide">@{username}</p>
              )}
            </div>

            {address && (
              <div className="bg-black/30 rounded-lg p-3 mx-4 border border-[#c8ff00]/30">
                <p className="text-sm text-[#c8ff00] uppercase tracking-wide mb-1">Direccion Base Account</p>
                <p className="text-xs text-white/90 font-mono break-all">{address}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/40 rounded-lg p-3 mx-4 border border-red-500/30">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {!isInMiniApp && !isLoading && (
              <div className="bg-amber-900/40 rounded-lg p-3 mx-4 border border-amber-500/30">
                <p className="text-sm text-amber-200">
                  Abre esta vista desde la Base App para cargar tu perfil y tu wallet.
                </p>
              </div>
            )}

            {isInMiniApp && !isConnected && !isLoading && (
              <div className="bg-blue-900/30 rounded-lg p-3 mx-4 border border-blue-400/30 space-y-3">
                <p className="text-sm text-blue-200">
                  Autoriza tu Base Account para mostrar la direccion de tu wallet.
                </p>
                <button
                  type="button"
                  onClick={handleAuthorize}
                  disabled={authInProgress}
                  className="w-full rounded-md bg-[#c8ff00] text-black font-semibold py-2 uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {authInProgress ? 'Solicitando...' : 'Autorizar wallet'}
                </button>
              </div>
            )}
          </div>

          <div className="relative border-2 border-[#c8ff00] h-6 mb-6 overflow-hidden bg-[#0a0a3d] mx-4">
            <div className="h-full w-[35%] bg-[#c8ff00] shadow-[0_0_20px_rgba(200,255,0,0.8)]" />
          </div>

          <p className="text-center text-[#00d4ff] text-lg font-bold uppercase tracking-wide px-4">
            Consigue mas items y llega a:
            <br />
            <span className="text-xl">Coleccionista Iniciado</span>
          </p>

          <div className="absolute -bottom-8 -left-4 w-16 h-16 border-l-4 border-b-4 border-[#c8ff00]"></div>
          <div className="absolute -bottom-8 -right-4 w-16 h-16 border-r-4 border-b-4 border-[#c8ff00]"></div>
        </div>

        <BottomNavigation currentPath="/profile" />
      </div>

      <UserDebugInfo userInfo={userInfo} />
    </div>
  )
}
