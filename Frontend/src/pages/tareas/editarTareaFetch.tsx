import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { BASE_URL } from '../../config'

export const useEditarTarea = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [completada, setCompletada] = useState<number | null>(0 | 1)

  const handleEditarTarea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/api/usuario/tarea/editar/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        titulo,
        descripcion,
        completada: Number(completada)
      })
    })

    if (res.ok) {
      alert('Tarea Actualizada Correctamente')
      navigate(-1)
    }
  }

  return {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    completada,
    setCompletada,
    handleEditarTarea
  }
}
