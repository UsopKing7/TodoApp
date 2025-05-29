import { useVolverForm } from '../config'
import { useAgregarUsuario } from './agregarUsuarioFetch'

export const RegistrarUsuario = () => {
  const { volver } = useVolverForm()
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    HandleAgregarUsuario
  } = useAgregarUsuario()
  return (
    <>
      <div className="edit-section">
        <div className="edit-card">
          <h1 className='auth-title'>Registro de usuario</h1>
          <form onSubmit={HandleAgregarUsuario}>
            <div className="edit-group">
              <label className="edit-label">Username</label>
              <input
                type="text"
                placeholder="username"
                value={username}
                className="edit-input"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="edit-group">
              <label className="edit-label">Correo electronico</label>
              <input
                type="text"
                placeholder="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="edit-input"
                required
              />
            </div>

            <div className="edit-group">
              <label className="edit-label">Password</label>
              <input
                type='password'
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="edit-input"
                required
              />
            </div>

            <button type="submit" className='edit-button primary'>Registrar</button>
            <button onClick={volver} className='edit-button primary'>Cancelar</button>
          </form>
        </div>
      </div>
    </>
  )
}
