import { Router } from 'express'
import { routerLogin } from '../controllers/Inicio/login'

export const midelware = Router()

midelware.use('/api', routerLogin)
