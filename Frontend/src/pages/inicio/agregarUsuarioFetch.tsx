import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BASE_URL } from '../../config'

export const useAgregarUsuario = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const HandleAgregarUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    if (res.ok) {
      alert(`Usuario creao corectamente${username}`)
      navigate('/')
    }
  }

  return { username, setUsername, email, setEmail, password, setPassword, HandleAgregarUsuario }
}
