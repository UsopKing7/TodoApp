import { useVolverForm } from '../config'
import { useAgregarTarea } from './agregarTareaFetch'
export const AgregarTarea = () => {
  const {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    completada,
    setCompletada,
    hadnledAgregarTarea
  } = useAgregarTarea()

  const { volver } = useVolverForm()
  return (
    <>
      <div className="form-section-dark">
        <div className="form-card-dark">
          <h2 className="form-title-dark">Crear Tarea</h2>

          <form onSubmit={hadnledAgregarTarea} className="form-container-dark">
            <div className="input-group-dark">
              <input
                type="text"
                placeholder="Título de la tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="input-field-dark"
                required
              />
            </div>

            <div className="input-group-dark">
              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="input-field-dark textarea-dark"
                rows={6}
                required
              />
            </div>

            <div className="input-group-dark">
              <select
                id="estado"
                value={completada === null ? '' : completada}
                onChange={(e) => {
                  const val = e.target.value
                  setCompletada(val === '' ? null : Number(val))
                }}
                className="input-field-dark select-dark"
                required
              >
                <option value="">Selecciona el estado</option>
                <option value={0}>Pendiente</option>
                <option value={1}>Realizada</option>
              </select>
            </div>

            <div className="btn-group-dark">
              <button type="submit" className="btn-dark primary-dark-btn">
                Crear Tarea
              </button>
              <button type="button" onClick={volver} className="btn-dark primary-dark-btn">
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
