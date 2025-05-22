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
