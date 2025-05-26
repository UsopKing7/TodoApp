import '../../styles/tareas.css'
import { FaBars } from 'react-icons/fa'

export const Tareas = () => {
  return (
    <>
      <header className="cabezera-header">
        <FaBars size={32} className="icono-menu" />
        <h1 className="titulo-todo-app">TodoApp - UsopKing</h1>
      </header>

      <main className="contenedor-tareas">
        <section className="tarjeta tareas-todo">
          <h2 className="titulo-seccion">Tus Tareas</h2>
          <ul className="lista-tareas">
            <li>📝 Aprender React</li>
          </ul>
        </section>

        <section className="tarjeta descripcion-todo">
          <h2 className="titulo-seccion">Descripción</h2>
        </section>
      </main>
    </>
  )
}
