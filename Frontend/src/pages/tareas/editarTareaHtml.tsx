import { BASE_URL } from '../../config'
import { useVolverForm } from '../config'
import { useEditarTarea } from './editarTareaFetch'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ActualizarTarea = () => {
  const { id } = useParams<{ id: string }>()
  const { volver } = useVolverForm()
  const {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    completada,
    setCompletada,
    handleEditarTarea
  } = useEditarTarea()

  useEffect(() => {
    const fetchTareaUnica = async () => {
      const res = await fetch(`${BASE_URL}/api/usuario/tarea-unica/${id}`, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        setTitulo(data.titulo || 'No se encontro el titulo')
        setDescripcion(data.descripcion || 'No se encontro la descripcion')
        setCompletada(data.completada || 'No se pudo encontrar el estado')
      }
    }
    fetchTareaUnica()
  }, [id, setCompletada, setTitulo, setDescripcion])

  return (
    <>
      <div className="edit-section">
        <div className="edit-card">
          <h2 className="auth-title">Datos a Actualizar</h2>
          <form onSubmit={handleEditarTarea}>
            <div className="edit-group">
              <label className="edit-label">Título</label>
              <input
                type="text"
                placeholder="Título de la tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="edit-input"
                required
              />
            </div>

            <div className="edit-group">
              <label className="edit-label">Descripción</label>
              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="edit-input"
                rows={6}
                required
              />
            </div>

            <div className="edit-group">
              <label className="edit-label">Estado</label>
              <select
                value={completada === null ? '' : completada}
                onChange={(e) => {
                  const val = e.target.value
                  setCompletada(val === '' ? null : Number(val))
                }}
                className="edit-input"
                required
              >
                <option value="">Seleccionar estado</option>
                <option value={0}>Pendiente</option>
                <option value={1}>Realizada</option>
              </select>
            </div>

            <button type="submit" className="edit-button primary">
              Actualizar
            </button>
            <button type="button" onClick={volver} className="edit-button">
              Volver
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
