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

export interface UsernameConsulta extends RowDataPacket{
  id: `${string}-${string}-${string}-${string}-${string}`
  username: string
  email: string
  password: string
}

export type Register = {
  username: string,
  email: string,
  password: string
}

interface Sal {
  sal: number
}

export const SAL: Sal = {
  sal: Number(process.env.SAL) || 10
}