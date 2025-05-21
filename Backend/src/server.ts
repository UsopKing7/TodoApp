import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3333

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'Pong' })
})

app.listen(PORT, () => {
  console.table({
    URL: `http:192.168.1.15:${PORT}`
  })
})
