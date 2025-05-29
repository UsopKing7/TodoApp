import { useDeleteTarea } from './deleteTarea'
import { useVolverForm } from '../config'

export const DeleteTarea = () => {
  const { handleDelete } = useDeleteTarea()
  const { volver } = useVolverForm()

  return (
    <div className="delete-container">
      <div className="delete-card">
        <h2 className="auth-title">¿Desea eliminar la tarea?</h2>
        <form onSubmit={handleDelete} className="delete-form">
          <button type="submit" className="delete-button danger">
            Eliminar
          </button>
          <button type="button" onClick={volver} className="delete-button">
            Volver
          </button>
        </form>
      </div>
    </div>
  )
}
