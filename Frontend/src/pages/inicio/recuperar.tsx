import { Link } from 'react-router-dom'
import { useRecuperarPassword } from './recuperarFetch'
import '../../styles/inicioStyle.css'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useVolverForm } from '../config'

export const RecuperarPassword = () => {
  const { email, setEmail, password, setPassword, hadnledRecuperar } = useRecuperarPassword()
  const { volver } = useVolverForm()
  return (
    <>
      <div className="auth-section">
        <div className="auth-card">
          <h2 className="auth-title">Actualizar contraseña</h2>

          <form onSubmit={hadnledRecuperar} className="auth-form">
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Buscar correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="form-input"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="form-input"
              />
            </div>

            <button type="submit" className="auth-button primary">
              Actualizar contraseña
            </button>
          </form>
          <div className="divider">
            <span className="divider-text">o</span>
          </div>

          <button onClick={volver} className='auth-button primary'>Volver</button>

          <Link to="/registrar" className="auth-button secondary">
            Crear una cuenta nueva
          </Link>
        </div>
      </div>
    </>
  )
}
