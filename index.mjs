import http from 'node:http'
import fs from 'node:fs'

const port = 3000

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url
  if (filePath == './') {
    filePath = './index.html'
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./404.html', (error, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end(content, 'utf8')
        })
      } else {
        res.writeHead(500)
        res.end(`Sorry, an error occurred: ${error.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(content, 'utf8')
    }
  })
})

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`)
})
