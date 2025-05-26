import { Router, Request, Response } from 'express'
import { UsernameConsulta, SAL } from '../../config'
import bcrypt from 'bcrypt'
import { pool } from '../../models/db'

export const routerRecuperar = Router()

routerRecuperar.patch('/recuperar', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const passwordHash = await bcrypt.hash(password, SAL.sal)

    const [UsuarioExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    )

    if (UsuarioExiste.length === 0) {
      res.status(404).json({ message: 'Usuario no existe' })
      return
    }
    const idUser = UsuarioExiste[0].id

    await pool.query('UPDATE usuarios SET password = ? WHERE id = ?', [
      passwordHash,
      idUser
    ])

    res.status(200).json({ message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la contraseña',
      error: error instanceof Error ? error.message : error
    })
  }
})
