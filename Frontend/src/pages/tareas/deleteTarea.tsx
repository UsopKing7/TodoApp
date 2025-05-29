import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../config'

export const useDeleteTarea = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/api/usuario/tarea/eliminar/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
  
    if (res.ok) {
      alert('Tarea eliminada correctamente')
      navigate(-1)
    } else {
      alert('Error al eliminar la tarea')
    }
  }
  return { handleDelete }
}