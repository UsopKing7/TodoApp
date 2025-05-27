import { Router } from 'express'
import { routerLogin, routerId } from '../controllers/Inicio/login'
import { rutaProtegida } from '../controllers/Inicio/rutaProtected'
import { routerUsuario } from '../controllers/usuario/usuario'
import { tareasUsuario } from '../controllers/tareas/tareasUsuario'
import { rutaVerifi } from '../controllers/Inicio/verify'
import { routerRecuperar } from '../controllers/Inicio/recuperar'
export const midelware = Router()

midelware.use('/api', routerId)
midelware.use('/api', routerLogin)
midelware.use('/api', routerRecuperar)
midelware.use('/api', rutaVerifi)
midelware.use('/api', rutaProtegida, routerUsuario)
midelware.use('/api', rutaProtegida, tareasUsuario)