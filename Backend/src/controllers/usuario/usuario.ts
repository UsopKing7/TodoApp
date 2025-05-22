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
        td: user.username
      }))
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
      message: 'Usuario actualizado'
    })

  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})
