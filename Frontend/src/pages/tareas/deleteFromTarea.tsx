import { useDeleteTarea } from './deleteTarea'
import { useVolverForm } from '../config'

export const DeleteTarea = () => {
  const { handleDelete } = useDeleteTarea()
  const { volver } = useVolverForm()

  return (
    <>
      <div className="auth-section">
      <h2>¿Desea eleiminar la tarea?</h2>
        <div className="auth-card">
          <form onSubmit={handleDelete}>
            <button type="submit" className="auth-button primary">
              Eliminar
            </button>
            <button onClick={volver} className="auth-button primary">
              Voler
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
