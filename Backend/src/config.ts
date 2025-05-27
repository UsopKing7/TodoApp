import { RowDataPacket } from 'mysql2'

interface Port {
  port: number
}

export const PORT: Port = {
  port: Number(process.env.PORT) || 3333
}

export type Login = {
  email: string
  password: string
}

// interfase para el Usuario de la base de datos
export interface UsernameConsulta extends RowDataPacket {
  id: `${string}-${string}-${string}-${string}-${string}`
  username: string
  email: string
  password: string
}

// interfase para las tareas de la base de datos
export interface TareasConsulta extends RowDataPacket {
  id: `${string}-${string}-${string}-${string}-${string}`
  titulo: string
  descripcion: string
  completada: number
  fecha_creacion: Date
  usuario_id: `${string}-${string}-${string}-${string}-${string}`
}

// interface para insertar tareas
export interface TareaInsertar extends RowDataPacket {
  id: `${string}-${string}-${string}-${string}-${string}`
  titulo: string
  descripcion: string
  completada: number
  fecha_creacion: Date
  usuario_id: `${string}-${string}-${string}-${string}-${string}`
}

export type Register = {
  username: string
  email: string
  password: string
}

interface Sal {
  sal: number
}

export const SAL: Sal = {
  sal: Number(process.env.SAL) || 10
}

// typos para update usuario
export type UpdateUsuario = {
  username?: string | undefined
  email?: string | undefined
  password1?: string | undefined
}

// typos para agregar tareas
export type AgregarTarea = {
  titulo: string
  descripcion: string
  completada: number
}

// typos para actualizar tareas
export type UpdateTarea = {
  titulo?: string
  descripcion?: string
  completada?: number
}

// Interface para el secret_key
interface secret {
  secret: string
}

export const SECRET: secret = {
  secret: String(process.env.SECRET_KEY)
}

// interface para ruta protegida
export interface UsuarioToken {
  email: string
  username: string
  id: string
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: string | UsuarioToken
    }
  }
}