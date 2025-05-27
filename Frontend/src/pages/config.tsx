import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'

export const useVolverForm = () => {
  const navigate = useNavigate()

  const volver = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(-1)
  }
  return { volver }
}

export const useCerrarCession = () => {
  const navigate = useNavigate()

  const cerrarSession = async () => {
    const res = await fetch(`${BASE_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    })
  
    if (res.ok) {
      alert('Session cerrada Correctamente')
      navigate('/')
    } else {
      alert('Error al cerrar session')
    }
  }

  return { cerrarSession }
}
