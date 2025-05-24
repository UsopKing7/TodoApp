import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { SECRET, UsuarioToken } from '../../config'

export const rutaProtegida = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token

  if (!token) res.status(401).json({ message: 'No estas autenticado' })

  try {
    const decoded = jwt.verify(token, SECRET.secret) as UsuarioToken
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token invalido o expirado' })
    return
  }
}
