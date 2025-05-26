import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Inicio } from '../pages/inicio/inicio'
import { Tareas } from '../pages/tareas/tareas'
import { RecuperarPassword } from '../pages/inicio/recuperar'

const NotFound = () => <h2>Pagina no encontrada</h2>
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />
      <Route
        path="/tareas/:id"
        element={
          <ProtectedRoute>
            <Tareas />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
