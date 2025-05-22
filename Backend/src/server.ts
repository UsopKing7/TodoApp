import express from 'express'
import { pool } from './models/db'
import { PORT } from './config'

const app = express()
app.use(express.json())

app.get('/', async (_req, res) => {
  const [rpws] = await pool.query('SELECT * FROM usuarios')
  res.status(200).json({rpws})
})

app.listen(PORT.port, '0.0.0.0', () => {
  console.table({
    URL: `http://0.0.0.0:${PORT.port}`
  })
})
