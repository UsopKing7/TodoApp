import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BASE_URL, type UseUsuariosReturn } from '../../config'

export const useUsuarios = (): UseUsuariosReturn => {
  //const { _id } = useParams<{ id: string }>()
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
      const idRes = await fetch(`${BASE_URL}/api/id`, {
        credentials: 'include'
      })
      const data = await idRes.json()
      console.log(data)

      if (data.id) {
        navigate(`/tareas/${data.id}`, {
          state: {
            username: data.username,
            email: data.email
          }
        })
      }
      
    } else {
      alert('Inicio de session fallida')
    }
  }
  return { email, setEmail, password, setPassword, hadnledSubmit }
}
