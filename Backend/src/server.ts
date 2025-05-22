import express from 'express'
import { PORT } from './config'
import { midelware } from './routers/middelware'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.use(midelware)

app.listen(PORT.port, '0.0.0.0', () => {
  console.table({
    URL: `http://0.0.0.0:${PORT.port}`
  })
})
