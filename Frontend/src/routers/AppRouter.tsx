import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Inicio } from '../pages/inicio/inicio'
import { Tareas } from '../pages/tareas/tareas'
import { AgregarTarea } from '../pages/tareas/agregarTarea'
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
      <Route
        path="/tareas/agregar/:id"
        element={
          <ProtectedRoute>
            <AgregarTarea />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
