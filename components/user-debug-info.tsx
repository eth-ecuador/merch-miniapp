'use client'

import type { BaseAccountUser } from '@/hooks/useBaseAccountUser'
import { useEffect } from 'react'

interface UserDebugInfoProps {
  userInfo: BaseAccountUser
}

export function UserDebugInfo({ userInfo }: UserDebugInfoProps) {
  useEffect(() => {
    console.log('=== BASE ACCOUNT USER DEBUG ===', userInfo)
  }, [userInfo])

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-4 text-xs font-mono z-50 border-t border-green-500">
      <div className="max-w-4xl mx-auto space-y-2">
        <h3 className="text-green-400">DEBUG - Base Account User</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p><span className="text-yellow-400">Address:</span> {userInfo.address ?? 'not available'}</p>
            <p><span className="text-yellow-400">Connected:</span> {userInfo.isConnected ? 'yes' : 'no'}</p>
            <p><span className="text-yellow-400">Loading:</span> {userInfo.isLoading ? 'yes' : 'no'}</p>
            <p><span className="text-yellow-400">Mini App:</span> {userInfo.isInMiniApp ? 'yes' : 'no'}</p>
          </div>
          <div className="space-y-1">
            <p><span className="text-yellow-400">Display Name:</span> {userInfo.displayName ?? 'n/a'}</p>
            <p><span className="text-yellow-400">Username:</span> {userInfo.username ?? 'n/a'}</p>
            <p><span className="text-yellow-400">PFP URL:</span> {userInfo.pfpUrl ? 'present' : 'missing'}</p>
            <p><span className="text-yellow-400">Auth Pending:</span> {userInfo.authInProgress ? 'yes' : 'no'}</p>
          </div>
        </div>
        <div>
          <p><span className="text-yellow-400">Error:</span> {userInfo.error ?? 'none'}</p>
        </div>
      </div>
    </div>
  )
}
