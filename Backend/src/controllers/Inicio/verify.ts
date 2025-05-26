import { Router } from 'express'
import { rutaProtegida } from './rutaProtected'

export const rutaVerifi = Router()

rutaVerifi.get('/verify', rutaProtegida, async(req, res) => {
  res.status(200).json({
    message: 'Autenticado correctamente',
    user: req.user
  })
})