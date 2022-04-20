const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

// El servidor funcionando en el puerto 3000
httpServer.listen(3000, () => console.log('SERVER ON'))

io.on('connection', (socket) => {
// "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado')
// Se imprimirá solo la primera vez que se ha abierto la conexión    
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')

    socket.on('notificacion', data => {
        console.log(data)
    })
})


