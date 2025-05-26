import { Router } from 'express'
import { pool } from '../../models/db'
import { UsernameConsulta, SAL } from '../../config'
import { updateUsuario } from '../../routers/validaciones'
import bcrypt from 'bcrypt'

export const routerUsuario = Router()

routerUsuario.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [usuario] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE id = ?', [id]
    )

    if (usuario.length === 0) res.status(404).json({ message: 'Usuario no encontrado' })

    res.status(200).json({
      message: 'usuario encontrado',
      data: usuario.map((user) => ({
        user: user.username,
        gmail: user.email
      })),
      username: req.user
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los usuarios',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerUsuario.patch('/usuario/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const vUsuario = updateUsuario.parse(req.body)
    let hashPassword: string | undefined = undefined

    if (vUsuario.password) {
      hashPassword = await bcrypt.hash(vUsuario.password, SAL.sal)
    }
    
    await pool.query<UsernameConsulta[]>(
      'UPDATE usuarios SET username = ?, email = ?, password = ? WHERE id = ?',
      [
        vUsuario.username,
        vUsuario.email,
        hashPassword,
        id
      ]
    )

    res.status(200).json({
      message: 'Usuario actualizado',
      username: req.user
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerUsuario.delete('/usuario/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [usuarioExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FORM usuarios WHERE id = ?', [id]
    )

    if (usuarioExiste.length === 0) res.status(404).json({ message: 'Usuario no encontrado' })

    await pool.query(
      'DELETE FROM usuarios WHERE id = ?', [id]
    )

    res.status(200).json({
      message: 'Usuario eliminado correctamente',
      username: req.user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerUsuario.patch('/recuperar/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email, password } = req.body
    const passwordHash = await bcrypt.hash(password, SAL.sal)

    const [UsuarioExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE id = ? AND email = ?', [id, email]
    )
    if (UsuarioExiste.length === 0) {
      res.status(404).json({ message: 'Usuario no existe' })
      return
    }

    await pool.query(
      'UPDATE usuarios SET password = ? WHERE id = ?', [passwordHash, id]
    )

    res.status(200).json({ message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la contraseña',
      error: error instanceof Error ? error.message : error
    })
  }
})