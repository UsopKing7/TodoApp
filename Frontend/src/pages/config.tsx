import { useNavigate } from 'react-router-dom'

export const useVolverForm = () => {
  const navigate = useNavigate()

  const volver = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(-1)
  }
  return { volver }
}