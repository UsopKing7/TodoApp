import { Router } from 'express'
import { routerLogin } from '../controllers/Inicio/login'
import { routerUsuario } from '../controllers/usuario/usuario'
import { tareasUsuario } from '../controllers/tareas/tareasUsuario'

export const midelware = Router()

midelware.use('/api', routerLogin)
midelware.use('/api', routerUsuario)
midelware.use('/api', tareasUsuario)