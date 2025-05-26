import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { BASE_URL, type UseUsuariosReturn } from '../../config'

export const useUsuarios = (): UseUsuariosReturn => {
  const { id } = useParams<{ id: string }>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const hadnledSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (res.ok) {
      alert('Inicio de session exitoso')
      navigate(`/tareas/${id}`)
    } else {
      alert('Inicio de session fallida')
    }
  }
  return { email, setEmail, password, setPassword, hadnledSubmit }
}
