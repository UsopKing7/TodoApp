import { Link } from 'react-router-dom'
import { useRecuperarPassword } from './recuperarFetch'
import '../../styles/inicioStyle.css'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useVolverForm } from '../config'

export const RecuperarPassword = () => {
  const { email, setEmail, password, setPassword, hadnledRecuperar } =
    useRecuperarPassword()
  const { volver } = useVolverForm()
  return (
    <>
      <div className="rec-section">
        <div className="rec-card">
          <h2 className="auth-title">Actualizar contraseña</h2>

          <form onSubmit={hadnledRecuperar} className="rec-form">
            <div className="rec-group">
              <span className="rec-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Buscar correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="rec-input"
                required
              />
            </div>

            <div className="rec-group">
              <span className="rec-icon">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="rec-input"
                required
              />
            </div>

            <button type="submit" className="rec-button primary">
              Actualizar contraseña
            </button>
          </form>

          <div className="rec-divider">
            <span className="rec-divider-text">o</span>
          </div>

          <Link to="/registrar" className="rec-button primary">
            Crear una cuenta nueva
          </Link>

          <button onClick={volver} className="rec-button primary">
            Volver
          </button>
        </div>
      </div>
    </>
  )
}
