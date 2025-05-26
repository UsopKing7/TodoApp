import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BASE_URL, type UsePasswordRetuns } from '../../config'

export const useRecuperarPassword = (): UsePasswordRetuns => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const hadnledRecuperar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/api/recuperar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
  
    if (res.ok) {
      alert('Contraseña actualizada correctamente')
      navigate('/')
    } else {
      alert('Error al encontrar el usuario o el usuario no existe')
    }
  }

  return { email, setEmail, password, setPassword, hadnledRecuperar }
}
