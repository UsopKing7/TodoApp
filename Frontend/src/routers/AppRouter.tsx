import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Inicio } from '../pages/inicio/inicio'
import { Tareas } from '../pages/tareas/tareas'
import { AgregarTarea } from '../pages/tareas/agregarTarea'
import { DeleteTarea } from '../pages/tareas/deleteFromTarea'
import { ActualizarTarea } from '../pages/tareas/editarTareaHtml'
import { RecuperarPassword } from '../pages/inicio/recuperar'
import { RegistrarUsuario } from '../pages/inicio/agregarUsuario'

const NotFound = () => <h2>Pagina no encontrada</h2>
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registrar" element={<RegistrarUsuario />} />
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
      <Route
        path="/tarea/eliminar/:id"
        element={
          <ProtectedRoute>
            <DeleteTarea />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tarea/actualizar/:id"
        element={
          <ProtectedRoute>
            <ActualizarTarea />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
