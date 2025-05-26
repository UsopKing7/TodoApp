export const BASE_URL = `http://${window.location.hostname}:3333`

export type UseUsuariosReturn = {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  hadnledSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}
