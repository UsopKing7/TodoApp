import { Routes, Route } from 'react-router-dom'
import { Inicio } from '../pages/inicio'

export const AppRouter = () => {
  console.log('hola')
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
    </Routes>
  )
}
