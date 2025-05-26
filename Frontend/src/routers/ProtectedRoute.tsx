import type { ReactNode } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = Cookies.get('token')

  if (!token) return <Navigate to='/' replace/>

  return children
}
