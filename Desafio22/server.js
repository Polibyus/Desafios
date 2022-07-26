const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 3000;
const productos = require('./fakerProducts')
const messages = require('./normalizeMSJ')
const compresion = require('./normalizeMSJ')

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './views');
app.set('view engine', 'pug');
//public
app.use(express.static('public'));

// Chat dale loco que sale

io.on('connection', socket => {
  socket.emit('messages', messages);
  socket.on('new-message', (data) => {
    messages.push(data);
    socket.emit('messages', messages);
  });
});

app.get('/', (req, res) => {
  res.render('index.pug')
})

app.get('/api/productos', (req, res) => {
  res.render('productos.pug', { productos: productos })
})

app.get('/chat', (req, res) => {
  res.render('chat.pug')
})


httpServer.listen(PORT, err => {
  if (err) throw new Error(`error en el sv ${err}`)
  console.log(`el sv escuchar en ${PORT} en http://localhost:3000`);
})
