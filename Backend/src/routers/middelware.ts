import { Router } from 'express'
import { routerLogin } from '../controllers/Inicio/login'
import { rutaProtegida } from '../controllers/Inicio/rutaProtected'
import { routerUsuario } from '../controllers/usuario/usuario'
import { tareasUsuario } from '../controllers/tareas/tareasUsuario'

export const midelware = Router()

midelware.use('/api', routerLogin)
midelware.use('/api', rutaProtegida, routerUsuario)
midelware.use('/api', tareasUsuario)