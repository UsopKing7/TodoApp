export const BASE_URL = `http://${window.location.hostname}:3333`

export type UseUsuariosReturn = {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  hadnledSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export type UsePasswordRetuns = {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  hadnledRecuperar: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export interface UsernameEmail {
  username: string
  email: string
}

export interface TareasUsuario {
  id: string
  titulo: string
  hora: string
  completada: number
  descripcion: string
}

export type UseTareasReturn = {
  titulo: string
  descripcion: string
  completada: string
  hadnledRecuperar: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}
