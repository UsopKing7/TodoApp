import { useDeleteTarea } from './deleteTarea'
import { useVolverForm } from '../config'

export const DeleteTarea = () => {
  const { handleDelete } = useDeleteTarea()
  const { volver } = useVolverForm()

  return (
    <>
    <h1>Desea eleiminar la tarea</h1>
      <form onSubmit={handleDelete}>
        <button type='submit'>Eliminar</button>
        <button onClick={volver}>Voler</button>
      </form>
    </>
  )
}
