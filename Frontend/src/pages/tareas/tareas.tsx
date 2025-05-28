import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { BASE_URL, type UsernameEmail, type TareasUsuario } from '../../config'
import { useCerrarCession } from '../config'
import '../../styles/tareas.css'

// Lazy loading para íconos
const FaCalendarAlt = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaCalendarAlt })))
const FaClipboardList = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaClipboardList })))
const FaInbox = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaInbox })))
const FaInfoCircle = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaInfoCircle })))
const FaTasks = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaTasks })))
const FaPlus = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaPlus })))

const LoadingSpinner = () => <div className="spinner"></div>

export const Tareas = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { username, email }: UsernameEmail = location.state || {}
  const { cerrarSession } = useCerrarCession()

  const [tareas, setTareas] = useState<TareasUsuario[]>([])
  const [tareaSeleccionada, setTareaSeleccionada] = useState<TareasUsuario | null>(null)
  const [filtro, setFiltro] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Filtrar tareas basado en el input
  const tareasFiltradas = useMemo(() => {
    return tareas.filter(tarea => 
      tarea.titulo.toLowerCase().includes(filtro.toLowerCase())
    )
  }, [tareas, filtro])

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        setCargando(true)
        const res = await fetch(`${BASE_URL}/api/usuario/tareas/${id}`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!res.ok) throw new Error('Error al obtener tareas')
        
        const json = await res.json()
        setTareas(Array.isArray(json.usuario) ? json.usuario : [])
        setError('')
      } catch {
        setError('No se pudieron cargar las tareas. Intente más tarde.')
        setTareas([])
      } finally {
        setCargando(false)
      }
    }
    
    fetchTareas()
  }, [id])

  const handleSeleccionarTarea = (tarea: TareasUsuario) => {
    setTareaSeleccionada(tarea)
  }

  const formatearFecha = (fechaIso: string): string => {
    if (!fechaIso) return 'Sin fecha definida'
    
    try {
      const fecha = new Date(fechaIso)
      return fecha.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    } catch {
      return 'Fecha inválida'
    }
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <Suspense fallback={<LoadingSpinner />}>
          <button className="menu-button" aria-label="Menú">
            <FaTasks size={24} className="menu-icon" />
          </button>
        </Suspense>
        <h1 className="app-title">TodoApp - {username || 'Usuario'}</h1>
      </header>

      <main className="app-container">
        <section className="task-card">
          <div className="user-info">
            <h3>
              Bienvenido, <span className="username">{username || 'Usuario'}</span>
            </h3>
            <p className="user-email">{email || 'No especificado'}</p>
            
            <div className="actions-container">
              <Link to={`/tareas/agregar/${id}`} className="action-btn agregar-btn">
                <Suspense fallback={<LoadingSpinner />}>
                  <FaPlus /> Nueva Tarea
                </Suspense>
              </Link>
              
              <input
                type="text"
                className="form-input"
                placeholder="Filtrar por título"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                disabled={cargando || tareas.length === 0}
              />
            </div>
          </div>
          
          <div className="task-section">
            <h2 className="section-title">
              <Suspense fallback={<LoadingSpinner />}>
                <FaTasks className="section-icon" />
              </Suspense>
              Tus Tareas
              <span className="task-count">
                {cargando ? '...' : `${tareasFiltradas.length} de ${tareas.length}`} tareas
              </span>
            </h2>
            
            {error && <div className="error-message">{error}</div>}
            
            {cargando ? (
              <div className="loading-state">
                <LoadingSpinner />
                <p>Cargando tareas...</p>
              </div>
            ) : tareasFiltradas.length === 0 ? (
              <div className="empty-state">
                <Suspense fallback={<LoadingSpinner />}>
                  <FaInbox size={48} />
                </Suspense>
                <p>{filtro ? 'No hay coincidencias' : 'No hay tareas pendientes'}</p>
              </div>
            ) : (
              <ul className="task-list">
                {tareasFiltradas.map((tarea) => (
                  <TaskListItem
                    key={tarea.id}
                    tarea={tarea}
                    seleccionada={tareaSeleccionada?.id === tarea.id}
                    onSeleccionar={handleSeleccionarTarea}
                    formatearFecha={formatearFecha}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>

        <TaskDetails 
          tareaSeleccionada={tareaSeleccionada} 
          tareas={tareas}
          formatearFecha={formatearFecha}
          cerrarSession={cerrarSession}
        />
      </main>
    </div>
  )
}

// Componente separado para items de tarea (mejora rendimiento)
const TaskListItem = ({
  tarea,
  seleccionada,
  onSeleccionar,
  formatearFecha
}: {
  tarea: TareasUsuario
  seleccionada: boolean
  onSeleccionar: (tarea: TareasUsuario) => void
  formatearFecha: (fecha: string) => string
}) => {
  return (
    <li className={`task-item ${seleccionada ? 'selected' : ''}`}>
      <div className="task-content" onClick={() => onSeleccionar(tarea)}>
        <span className="task-title">{tarea.titulo}</span>
        {tarea.hora && (
          <span className="task-date">
            <Suspense fallback={<LoadingSpinner />}>
              <FaCalendarAlt /> {formatearFecha(tarea.hora)}
            </Suspense>
          </span>
        )}
      </div>
      
      <div className="task-status">
        <span className={tarea.completada === 1 ? 'realizado' : 'pendiente'}>
          {tarea.completada === 1 ? 'Realizado' : 'Pendiente'}
        </span>
      </div>
      
      <div className="task-actions">
        <Link 
          to={`/tarea/actualizar/${tarea.id}`}
          className="action-btn actualizar-btn"
        >
          Editar
        </Link>
        <Link 
          to={`/tarea/eliminar/${tarea.id}`}
          className="action-btn eliminar-btn"
        >
          Eliminar
        </Link>
      </div>
    </li>
  )
}

// Componente separado para detalles de tarea
const TaskDetails = ({
  tareaSeleccionada,
  tareas,
  formatearFecha,
  cerrarSession
}: {
  tareaSeleccionada: TareasUsuario | null
  tareas: TareasUsuario[]
  formatearFecha: (fecha: string) => string
  cerrarSession: () => void
}) => {
  return (
    <section className="details-card">
      <h2 className="section-title">
        <Suspense fallback={<LoadingSpinner />}>
          <FaInfoCircle className="section-icon" />
        </Suspense>
        Detalles
      </h2>
      
      <div className="details-content">
        {tareaSeleccionada ? (
          <>
            <h3 className="detail-title">{tareaSeleccionada.titulo}</h3>
            <p className="detail-date">
              <Suspense fallback={<LoadingSpinner />}>
                <FaCalendarAlt />
              </Suspense>
              Creada: {formatearFecha(tareaSeleccionada.hora)}
            </p>
            <div className="detail-description">
              <h4>Descripción:</h4>
              <p>{tareaSeleccionada.descripcion || 'No hay descripción disponible'}</p>
            </div>
            
            <div className="detail-meta">
              <span className={`status-badge ${
                tareaSeleccionada.completada === 1 ? 'realizado' : 'pendiente'
              }`}>
                {tareaSeleccionada.completada === 1 ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          </>
        ) : tareas.length > 0 ? (
          <div className="selection-prompt">
            <Suspense fallback={<LoadingSpinner />}>
              <FaClipboardList size={40} />
            </Suspense>
            <h3>Selecciona una tarea</h3>
            <p>Haz clic en cualquier tarea de la lista para ver su descripción completa y detalles.</p>
          </div>
        ) : (
          <div className="empty-details">
            <Suspense fallback={<LoadingSpinner />}>
              <FaInbox size={48} />
            </Suspense>
            <p>No hay tareas para mostrar</p>
          </div>
        )}
      </div>
      
      <button onClick={cerrarSession} className="logout-button">
        Cerrar sesión
      </button>
    </section>
  )
}