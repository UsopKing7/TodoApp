import { Router } from 'express'
import { pool } from '../../models/db'
import { TareasConsulta, AgregarTarea, TareaInsertar, UsernameConsulta, UpdateTarea } from '../../config'
import { agregarTarea, updateTarea } from '../../routers/validaciones'

export const tareasUsuario = Router()

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
      }))
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las tareas del usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})

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
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error al agregar la tarea',
      error: error instanceof Error ? error.message : error
    })
  }
})

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
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error al encontar la tarea para eliminar',
      error: error instanceof Error ? error.message : error
    })
  }
})

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