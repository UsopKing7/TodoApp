import { Router } from 'express'
import { pool } from '../../models/db'
import { Login, UsernameConsulta, Register, SAL, SECRET, UsuarioToken } from '../../config'
import { loginSchema, registerSchema } from '../../routers/validaciones'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { rutaProtegida } from '../Inicio/rutaProtected'

export const routerLogin = Router()

routerLogin.post('/login', async (req, res)  => {
  try {
    const validatorLogin: Login = loginSchema.parse(req.body)
    const [usuarioExistente] = await pool.query<UsernameConsulta[]>(
      'SELECT * FROM usuarios WHERE email = ?', [validatorLogin.email]
    )

    if (usuarioExistente.length === 0){
      res.status(404).json({ message: 'Usuario no encontrado' })
      return
    }

    const usuario = usuarioExistente[0]

    const passwordVerificado = await bcrypt.compare(validatorLogin.password, usuarioExistente[0].password)

    if (!passwordVerificado) {
      res.status(401).json({ message: 'Contraseña incorrecta' })
      return
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, username: usuario.username }, SECRET.secret, { expiresIn: '1h' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    })
    res.status(200).json({
      message: 'Login exitoso'
    })

  } catch (error: unknown) {
    res.status(500).json({
      message: 'Error al verificar el usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerLogin.post('/register', async (req, res) => {
  try {
    const validationRegister: Register = registerSchema.parse(req.body)
    const hashPassword = await bcrypt.hash(validationRegister.password, SAL.sal)
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
    res.status(500).json({
      message: 'Error al verificar el usuario',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerLogin.post('/logout', async (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  
  res.status(200).json({ message: 'Session serrada correctamente' })
})

export const routerId = Router()
routerId.get('/id', rutaProtegida, async (req, res) => {
  const user = req.user as UsuarioToken
  const { id, email, username } = user
  res.status(200).json({ id, email, username })
})