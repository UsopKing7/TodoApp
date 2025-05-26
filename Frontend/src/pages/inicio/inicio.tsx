import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLock,
  FaInstagram
} from 'react-icons/fa'
import '../../styles/inicioStyle.css'
import { useUsuarios } from './inicioFetch'

export const Inicio = () => {
  const { email, setEmail, password, setPassword, hadnledSubmit } =
    useUsuarios()
  return (
    <div className="inicio-container">
      <div className="hero-section">
        <div className="brand-content">
          <div className="logo-container">
            <img
              src="https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/481096388_1497384077885867_4480410341102582745_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=5Tkxn0qYLKEQ7kNvwHiP4DU&_nc_oc=Adng9uRt4K9nWnp19jXrz1B9sfNtuQIoFbxUvbLf-EaVEfJ7y2xrIj7A7vimz-hHuKkJ_ALpt3VSwjQ4wlgOG8FX&_nc_zt=23&_nc_ht=scontent.flpb1-1.fna&_nc_gid=_UAjGOHt9Xl36qn19sf8FQ&oh=00_AfLI0k19KmCfvN4s0AhxigQXFDU6skQK8lTXwN9J3pSeNA&oe=6839B904"
              alt="TodoApp Logo"
              className="brand-logo"
            />
          </div>

          <div className="social-links">
            <a
              href="https://github.com/UsopKing7"
              target="_blank"
              className="social-icon"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/nicolas_guarachi/"
              target="_blank"
              className="social-icon"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-guarachi-561694317/"
              target="_blank"
              className="social-icon"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="hero-text">
          <h1 className="app-title">
            Todo<span className="highlight">UsopKing</span>
          </h1>

          <div className="app-description">
            <h2 className="tagline">
              Organiza tu día,
              <br />
              simplifica tu vida.
            </h2>
            <p className="subtext">
              La herramienta definitiva para gestionar tus tareas diarias de
              manera eficiente.
            </p>
          </div>
        </div>
      </div>

      <div className="auth-section">
        <div className="auth-card">
          <h2 className="auth-title">Iniciar sesión</h2>

          <form onSubmit={hadnledSubmit} className="auth-form">
            <div className="input-group">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Correo electrónico"
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
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="form-input"
              />
            </div>

            <button type="submit" className="auth-button primary">
              Ingresar
            </button>

            <div className="form-footer">
              <Link to="/recuperar" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </form>

          <div className="divider">
            <span className="divider-text">o</span>
          </div>

          <Link to="/registrar" className="auth-button secondary">
            Crear una cuenta nueva
          </Link>
        </div>
      </div>
    </div>
  )
}
