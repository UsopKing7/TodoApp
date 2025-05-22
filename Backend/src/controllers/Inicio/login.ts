import { Router } from 'express'
import { pool } from '../../models/db'
import { Login, UsernameConsulta, Register, SAL } from '../../config'
import { loginSchema, registerSchema } from '../../routers/validaciones'
import bcrypt from 'bcrypt'

export const routerLogin = Router()

routerLogin.post('/login', async (req, res)  => {
  const validatorLogin: Login = loginSchema.parse(req.body)

  try {
    const [usuarioExistente] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE email = ?', [validatorLogin.email]
    )

    if (usuarioExistente.length === 0) res.status(404).json({ message: 'Usuario no encontrado' })

    const passwordVerificado = await bcrypt.compare(validatorLogin.password, usuarioExistente[0].password)

    if (!passwordVerificado) res.status(401).json({ message: 'Contraseña incorrecta' })

    res.status(200).json({
      message: 'Login exitoso',
    })

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error al verificar el usuario',
        error: error.message || error
      })
    }
    res.status(500).json({
      message: 'Error interno del servidor',
      error 
    })
  }
})

routerLogin.post('/register', async (req, res) => {
  const validationRegister: Register = registerSchema.parse(req.body)
  const hashPassword = await bcrypt.hash(validationRegister.password, SAL.sal)
  try {
    const [correoExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE email = ?', [validationRegister.email]
    )
    
    const [usernameExiste] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE username = ?', [validationRegister.username]
    )
    if (correoExiste.length > 0) res.status(404).json({ message: 'El correo ya existe' })
    if (usernameExiste.length > 0) res.status(404).json({ message: 'El nombre de usuario ya existe' })

    await pool.query<UsernameConsulta[]>(
      'INSERT INTO usuarios (username, email, password) VALUES (?,?,?)',
      [
        validationRegister.username,
        validationRegister.email,
        hashPassword
      ]
    )

    res.status(201).json({
      message: 'Usuario resgistrado exitosamente'
    })
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error al registrar el usuario',
        error: error.message || error
      })
    }
    res.status(500).json({
      message: 'Error interno del servidor',
      error
    })
  }
})
