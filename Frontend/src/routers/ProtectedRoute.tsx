import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { BASE_URL } from '../config'

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/verify`, {
          method: 'GET',
          credentials: 'include'
        })
        setIsAuth(res.ok)
      } catch {
        setIsAuth(false)
      }
    }

    verify()
  }, [])

  if (isAuth === null) return 
  if (!isAuth) return <Navigate to="/" replace/>

  return <>{children}</>
}
