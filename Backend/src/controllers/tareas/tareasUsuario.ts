import { Router } from 'express'
import { pool } from '../../models/db'
import { TareasConsulta, AgregarTarea, TareaInsertar, UsernameConsulta, UpdateTarea } from '../../config'
import { agregarTarea, updateTarea } from '../../routers/validaciones'

export const tareasUsuario = Router()

// Mostrar una tarea especifica del Usuario
tareasUsuario.get('/usuario/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const [usuarioExiste] = await pool.query<TareasConsulta[]>(
      'SELECT * FROM usuarios WHERE id = ?', [id]
    )

    if (usuarioExiste.length === 0) res.status(404).json({ message: 'Usuario no encontrado' })

    const [tareas] = await pool.query<TareasConsulta[]>(
      'SELECT * FROM tareas WHERE usuario_id = ?', [id]
    )

    if (tareas.length === 0) res.status(404).json({ message: 'No hay tareas para este usuario' })

    res.status(200).json({
      message: 'Tareas obtenidas del usuario',
      usuario: tareas.map((tarea) => ({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        completada: tarea.completada,
        hora: tarea.fecha_creacion
      })),
    }),
    req.user
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las tareas del usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})

// Agregar una tarea especifica al usuario
tareasUsuario.post('/usuario/agregar-tarea/:id', async (req, res) => {
  try {
    const { id } = req.params
    const vTarea: AgregarTarea = agregarTarea.parse(req.body)

    const [usuarioExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE id = ?', [id]
    )

    if (usuarioExiste.length === 0) res.status(404).json({ message: 'Usuario no encontrado' })

    await pool.query<TareaInsertar[]>(
      'INSERT INTO tareas (titulo, descripcion, completada, usuario_id) VALUES (?,?,?,?)',
      [
        vTarea.titulo,
        vTarea.descripcion,
        vTarea.completada,
        id
      ]
    )

    res.status(201).json({
      message: 'Tarea agregada exitosamente',
      titulo: vTarea.titulo,
      descripcion: vTarea.descripcion,
      completada: vTarea.completada
    }),
    req.user

  } catch (error) {
    res.status(500).json({
      message: 'Error al agregar la tarea',
      error: error instanceof Error ? error.message : error
    })
  }
})

// Eliminar una tarea en especifica
tareasUsuario.delete('/usuario/tarea/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [tareaExiste] = await pool.query<TareasConsulta[]>(
      'SELECT * FROM tareas WHERE id = ?', [id]
    )

    if (tareaExiste.length === 0) res.status(404).json({ message: 'La tarea no existe' })
    
    await pool.query(
      'DELETE FROM tareas WHERE id = ?', [id]
    )

    res.status(200).json({
      message: 'Tarea eliminada correctamente',
      tarea: tareaExiste.map((tarea) => ({
        titulo: tarea.titulo
      }))
    }),
    req.user

  } catch (error) {
    res.status(500).json({
      message: 'Error al encontar la tarea para eliminar',
      error: error instanceof Error ? error.message : error
    })
  }
})

// eliminar todos las tareas del usuario
tareasUsuario.delete('/usuario/delete/tareas/:id_usuario', async (req, res) => {
  try {
    const { id_usuario } = req.params
    const [usuarioExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE id = ?', [id_usuario]
    )

    if (usuarioExiste.length === 0) { 
      res.status(404).json({ message: 'No se puede econtrar al usuario' })
      return
    }

    const [UsuarioConTareas] = await pool.query<TareasConsulta[]>(
      'SELECT * FROM tareas WHERE usuario_id = ?', [id_usuario]
    )

    if (UsuarioConTareas.length === 0) {
      res.status(404).json({ message: 'El usuario no tiene tareas'})
      return
    } 

    await pool.query(
      'DELETE FROM tareas WHERE usuario_id = ?', [id_usuario]
    )

    res.status(200).json({
      username: usuarioExiste.map((user) => ({
        username: `tareas eliminadas de ${user.username}`
      })),
      tareasElimindas: UsuarioConTareas.map((tarea) => ({
        tarea: tarea.titulo
      }))
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar todas las tareas',
      error: error instanceof Error ? error.message : error
    })
    return
  }
})

// Actualizar una tarea en especifica al Usuario
tareasUsuario.patch('/usuario/tarea/editar/:id', async (req, res) => {
  try {
    const { id } = req.params
    const vTareaUpdate: UpdateTarea = updateTarea.parse(req.body)

    const [tareaExiste] = await pool.query<TareasConsulta[]>(
      'SELECT * FROM tareas WHERE id = ?', [id]
    )

    if(tareaExiste.length === 0) res.status(404).json({ message: 'No existe la tarea' })

    await pool.query<TareasConsulta[]>(
      'UPDATE tareas SET titulo = ?, descripcion = ?, completada = ? WHERE id = ?',
      [
        vTareaUpdate.titulo,
        vTareaUpdate.descripcion,
        vTareaUpdate.completada,
        id
      ]
    )

    res.status(200).json({
      message: 'Tarea actualizada'
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la tarea',
      erro: error instanceof Error ? error.message : error
    })
  }
})
