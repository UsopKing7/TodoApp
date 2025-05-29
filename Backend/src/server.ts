import express from 'express'
import { PORT } from './config'
import { midelware } from './routers/middelware'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(midelware)

app.listen(PORT.port, '0.0.0.0', () => {
  console.table({
    URL: `http://0.0.0.0:${PORT.port}`
  })
})
