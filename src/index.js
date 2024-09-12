import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const getPath = fileName => path.join(__dirname, `pages/${fileName}`)

app.get('/', (req, res) => {
  res.sendFile(getPath('/index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(getPath('/about.html'))
})

app.get('/contact-me', (req, res) => {
  res.sendFile(getPath('/contact-me.html'))
})

app.all('*', (req, res) => {
  res.status(404).sendFile(getPath('/404.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
