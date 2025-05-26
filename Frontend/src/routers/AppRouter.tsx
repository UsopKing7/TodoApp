import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Inicio } from '../pages/inicio/inicio'
import { Tareas } from '../pages/tareas/tareas'

const NotFound = () => <h2>Pagina no encontrada</h2>
export const AppRouter = () => {
  console.log('hola')
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route
        path="/tareas"
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
