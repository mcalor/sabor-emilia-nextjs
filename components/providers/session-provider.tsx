
'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface SessionProviderProps {
  children: React.ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}
