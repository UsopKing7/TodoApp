import z from 'zod'

export const loginSchema = z.object({
  email: z.string().email('El correo electrònico no es vàlido'),
  password: z.string().min(8, 'La contraseña es requerida y debe tener al menos 8 caracteres')
})

export const registerSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario es requerido y debe tener al menos 3 caracteres'),
  email: z.string().email('El correo electrònìco no es valido'),
  password: z.string().min(8, 'La contraseña es requerida y debe tener al menos 8 caracteres')
})

export const updateUsuario = z.object({
  username: z.string().min(3, 'El nombre usuario no es valido').optional(),
  email: z.string().email().optional(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').optional()
})

export const agregarTarea = z.object({
  titulo: z.string().min(3, 'El titulo es requerido y no debe ser vacio o menor a 3 caracteres'),
  descripcion: z.string().min(10, 'La descripcion es requerida y no debe ser vacio o menor a 10 caracteres'),
  completada: z.boolean().default(false)
})

export const updateTarea = z.object({
  titulo: z.string().min(3, 'El titulo es requerido y no debe ser vacio o menor a 3 caracteres').optional(),
  descripcion: z.string().min(10, 'La descripcion es requerida y no debe ser vacio o menor a 10 caracteres').optional(),
  completada: z.boolean().optional()
})