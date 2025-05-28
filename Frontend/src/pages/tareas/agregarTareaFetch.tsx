import { useNavigate, useParams } from "react-router-dom"
import { BASE_URL } from "../../config"
import { useState } from "react"

export const useAgregarTarea = () => {
  const { id } = useParams<{ id: string }>()
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [completada, setCompletada] = useState<number | null>(0)
  const navigate = useNavigate()

  const hadnledAgregarTarea = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/api/usuario/agregar-tarea/${id}`, {
      method: 'POST',
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

    const data = await res.json()

    if (res.ok) {
      alert('Tarea creada correctamente')
      navigate(-1)
    } else {
      alert(data.message || 'Error al crear la tarea')
    }
  }

  return { titulo, setTitulo, descripcion, setDescripcion, completada, setCompletada, hadnledAgregarTarea }
}
