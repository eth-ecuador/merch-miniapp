'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { getAddress, isAddress } from 'viem'
import { useAccount, useConnect } from 'wagmi'

const FALLBACK_DISPLAY_NAME = 'Anon User'

type QuickAuthPayload = {
  address?: string
  sub?: number
  iss?: string
  aud?: string
  exp?: number
  iat?: number
}

export interface BaseAccountUser {
  address?: string
  displayName?: string
  username?: string
  pfpUrl?: string
  fid?: number
  isConnected: boolean
  isLoading: boolean
  isInMiniApp: boolean
  error?: string
  authInProgress: boolean
  requestAuthAddress: () => Promise<string | undefined>
}

function decodeQuickAuthPayload(token: string): QuickAuthPayload | null {
  if (typeof window === 'undefined' || typeof window.atob !== 'function') {
    return null
  }

  try {
    const [, segment] = token.split('.')
    if (!segment) {
      return null
    }

    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const json = window.atob(padded)
    return JSON.parse(json) as QuickAuthPayload
  } catch (error) {
    console.error('Failed to decode QuickAuth token', error)
    return null
  }
}

export function useBaseAccountUser(): BaseAccountUser {
  const { address: wagmiAddress, status: accountStatus } = useAccount()
  const { connectAsync, connectors, isPending: isConnectPending, error: connectError } = useConnect()

  const [isInMiniApp, setIsInMiniApp] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [displayName, setDisplayName] = useState(FALLBACK_DISPLAY_NAME)
  const [username, setUsername] = useState<string | undefined>()
  const [pfpUrl, setPfpUrl] = useState<string | undefined>()
  const [fid, setFid] = useState<number | undefined>()
  const [authAddress, setAuthAddress] = useState<string | undefined>()
  const [authInProgress, setAuthInProgress] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [autoConnectAttempted, setAutoConnectAttempted] = useState(false)
  const [autoAuthAttempted, setAutoAuthAttempted] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadContext() {
      try {
        const inMiniApp = await sdk.isInMiniApp()
        if (cancelled) return

        setIsInMiniApp(inMiniApp)

        if (!inMiniApp) {
          setDisplayName(FALLBACK_DISPLAY_NAME)
          setUsername(undefined)
          setPfpUrl(undefined)
          setFid(undefined)
          return
        }

        const context = await sdk.context
        if (cancelled) return

        setDisplayName(context.user.displayName || context.user.username || FALLBACK_DISPLAY_NAME)
        setUsername(context.user.username ?? undefined)
        setPfpUrl(context.user.pfpUrl ?? undefined)
        setFid(context.user.fid ?? undefined)
      } catch (err) {
        console.error('Error loading MiniApp context', err)
        if (!cancelled) {
          setError('No pudimos cargar tu perfil de Base.')
        }
      } finally {
        if (!cancelled) {
          setInitializing(false)
        }
      }
    }

    loadContext()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isInMiniApp) return
    if (autoConnectAttempted) return
    if (wagmiAddress) return
    if (isConnectPending) return
    if (!connectors || connectors.length === 0) return

    const farcasterConnector = connectors.find((connector) => connector.id === 'farcaster')
    if (!farcasterConnector) return

    setAutoConnectAttempted(true)

    connectAsync({ connector: farcasterConnector }).catch((err) => {
      console.warn('MiniApp connector auto-connect failed', err)
      setError((prev) => prev ?? 'No pudimos conectar tu Base Account automáticamente.')
    })
  }, [connectAsync, connectors, isConnectPending, isInMiniApp, autoConnectAttempted, wagmiAddress])

  useEffect(() => {
    if (!connectError) return
    setError(connectError.message)
  }, [connectError])

  const requestAuthAddress = useCallback(async () => {
    if (!isInMiniApp) {
      setError('Abre esta página dentro de Base App para autorizar tu wallet.')
      return undefined
    }

    setAuthInProgress(true)
    setError(undefined)

    try {
      const { token } = await sdk.quickAuth.getToken()
      const payload = decodeQuickAuthPayload(token)

      if (!payload?.address || !isAddress(payload.address)) {
        throw new Error('El token QuickAuth no contiene una dirección válida')
      }

      const normalized = getAddress(payload.address as `0x${string}`)
      setAuthAddress(normalized)
      return normalized
    } catch (err) {
      const message =
        err instanceof Error && err.name === 'SignIn.RejectedByUser'
          ? 'Autorización cancelada por el usuario.'
          : 'No pudimos obtener tu dirección. Intenta de nuevo.'

      setError(message)
      throw err
    } finally {
      setAuthInProgress(false)
    }
  }, [isInMiniApp])

  useEffect(() => {
    if (!isInMiniApp) return
    if (autoAuthAttempted) return
    if (wagmiAddress || authAddress) return

    setAutoAuthAttempted(true)

    const cachedToken = sdk.quickAuth.token
    if (cachedToken) {
      const payload = decodeQuickAuthPayload(cachedToken)
      if (payload?.address && isAddress(payload.address)) {
        try {
          setAuthAddress(getAddress(payload.address as `0x${string}`))
          return
        } catch (err) {
          console.warn('Failed to normalise cached QuickAuth address', err)
        }
      }
    }

    requestAuthAddress().catch((err) => {
      if (!(err instanceof Error) || err.name !== 'SignIn.RejectedByUser') {
        console.warn('QuickAuth automatic flow failed', err)
      }
    })
  }, [authAddress, isInMiniApp, autoAuthAttempted, requestAuthAddress, wagmiAddress])

  const resolvedAddress = useMemo(() => wagmiAddress ?? authAddress, [wagmiAddress, authAddress])
  const isConnectingAccount = accountStatus === 'connecting' || accountStatus === 'reconnecting'
  const isConnected = Boolean(resolvedAddress)
  const isLoading = initializing || (isInMiniApp && !resolvedAddress && (authInProgress || isConnectingAccount || isConnectPending))

  return {
    address: resolvedAddress,
    displayName,
    username,
    pfpUrl,
    fid,
    isConnected,
    isLoading,
    isInMiniApp,
    error,
    authInProgress,
    requestAuthAddress,
  }
}
