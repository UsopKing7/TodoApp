import '../../styles/tareas.css'
import {
  FaCalendarAlt,
  FaClipboardList,
  FaInbox,
  FaInfoCircle,
  FaTasks,
  FaPlus
} from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'
import { BASE_URL, type UsernameEmail, type TareasUsuario } from '../../config'
import { useEffect, useState } from 'react'
import { useCerrarCession } from '../config'
import { Link } from 'react-router-dom'

export const Tareas = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { username, email }: UsernameEmail = location.state || null
  const { cerrarSession } = useCerrarCession()

  const [tareas, setTareas] = useState<TareasUsuario[]>([])
  const [tareaSeleccionada, setTareaSeleccionada] =
    useState<TareasUsuario | null>(null)

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/usuario/tareas/${id}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (Array.isArray(json.usuario)) {
          setTareas(json.usuario)
        } else {
          setTareas([])
        }
      } catch {
        setTareas([])
      }
    }
    fetchTareas()
  }, [id])

  const handleSeleccionarTarea = (tarea: TareasUsuario) => {
    setTareaSeleccionada(tarea)
  }

  const formatearFecha = (fechaIso: string): string => {
    const fecha = new Date(fechaIso)
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <>
      <header className="app-header">
        <button className="menu-button" aria-label="Menú">
          <FaTasks size={24} className="menu-icon" />
        </button>
        <h1 className="app-title">TodoApp - UsopKing</h1>
      </header>

      <main className="app-container">
        <section className="task-card">
          <div className="user-info">
            <h3>
              Bienvenido, <span className="username">{username}</span>
            </h3>
            <p className="user-email">{email}</p>
          </div>

          <div className="task-section">
            <h2 className="section-title">
              <FaTasks className="section-icon" /> Tus Tareas
              <span className="task-count">{tareas.length} tareas</span>
            </h2>

            <ul className="task-list">
              {tareas.length === 0 ? (
                <li className="empty-state">
                  <FaInbox size={48} />
                  <p>No hay tareas pendientes</p>
                </li>
              ) : (
                tareas.map((tarea, index) => (
                  <li
                    key={tarea.id || index}
                    className={`task-item ${
                      tareaSeleccionada?.id === tarea.id ? 'selected' : ''
                    }`}
                  >
                    <label htmlFor={`task-${index}`} className="task-label">
                      <span
                        className="task-title"
                        onClick={() => handleSeleccionarTarea(tarea)}
                      >
                        {tarea.titulo}
                      </span>
                      {tarea.hora && (
                        <span className="task-date">
                          <FaCalendarAlt /> {formatearFecha(tarea.hora)}
                        </span>
                      )}
                    </label>
                    <h5
                      className={
                        tarea.completada === 1 ? 'realizado' : 'pendiente'
                      }
                    >
                      {tarea.completada === 1 ? 'Realizado' : 'Pendiente'}
                    </h5>
                  </li>
                ))
              )}
            </ul>
          </div>
          <Link to={`/tareas/agregar/${id}`} className="agregar-btn">
            {' '}
            <FaPlus />
          </Link>
        </section>

        <section className="details-card">
          <h2 className="section-title">
            <FaInfoCircle className="section-icon" /> Detalles
          </h2>
          <div className="details-content">
            {tareaSeleccionada ? (
              <>
                <h3 className="detail-title">{tareaSeleccionada.titulo}</h3>
                {tareaSeleccionada.hora && (
                  <p className="detail-date">
                    <FaCalendarAlt /> Creada:{' '}
                    {formatearFecha(tareaSeleccionada.hora)}
                  </p>
                )}
                <div className="detail-description">
                  <h4>Descripción:</h4>
                  <p>
                    {tareaSeleccionada.descripcion ||
                      'No hay descripción disponible'}
                  </p>
                </div>
              </>
            ) : tareas.length > 0 ? (
              <>
                <h3 className="detail-title">
                  Selecciona una tarea para ver detalles
                </h3>
                <p className="detail-description">
                  Haz clic en cualquier tarea de la lista para ver su
                  descripción completa, fecha de creación y otras opciones.
                </p>
              </>
            ) : (
              <div className="empty-details">
                <FaClipboardList size={48} />
                <p>No hay tareas para mostrar detalles</p>
              </div>
            )}
          </div>
          <button onClick={cerrarSession} className="logout-button">
            Cerrar sesión
          </button>
        </section>
      </main>
    </>
  )
}
