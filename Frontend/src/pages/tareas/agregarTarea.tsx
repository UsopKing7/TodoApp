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
  return (
    <>
      <div className="auth-section">
        <div className="auth-card">
          <h2 className="auth-title">Crear Tarea</h2>

          <form onSubmit={hadnledAgregarTarea} className="auth-form">
            <div className="input-group">
              <span className="input-icon"></span>
              <input
                type="text"
                id="email"
                placeholder="titulo tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                autoComplete="email"
                className="form-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon"></span>
              <input
                type="text"
                id="password"
                placeholder="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                autoComplete="current-password"
                className="form-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon"></span>
              <select
                id="estado"
                value={completada === null ? '' : completada}
                onChange={(e) => {
                  const val = e.target.value
                  setCompletada(val === '' ? null : Number(val))
                }}
                className="form-input"
              >
                <option value="">Seleccion el estado</option>
                <option value={0}>Pendiente</option>
                <option value={1}>Realizada</option>
              </select>
            </div>

            <button type="submit" className="auth-button primary">
              Crear Tarea
            </button>
            <button onClick={useVolverForm} className="auth-button primary">
              Volver
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
