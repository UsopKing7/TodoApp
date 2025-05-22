import { Router } from 'express'
import { routerLogin } from '../controllers/Inicio/login'
import { routerUsuario } from '../controllers/usuario/usuario'

export const midelware = Router()

midelware.use('/api', routerLogin)
midelware.use('/api', routerUsuario)
