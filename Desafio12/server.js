const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const fs = require("fs");
const { Router } = express;
const app = express();
const productos = Router();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 3000;

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './views');
app.set('view engine', 'pug');
//public
app.use(express.static('public'));
//rutas con express
app.use('/products', productos);

const products = [
  {
		"title": "adsf",
		"price": 546,
    "pic":'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Monster-256.png',
		"id": 2
	},
	{
		"title": "Hola",
		"price": 54,
    "pic":'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Fairy-256.png',
		"id": 60
	},
	{
		"title": "a ver",
		"price": 23,
    "pic":'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Unicorn-256.png',
		"id": 106
	},
	{
		"title": "a ver",
		"price": 23,
    "pic":'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Sword-256.png',
		"id": 160
	}
]
// productos.get('/', items.getAll);
// productos.post('/', items.save);

// chat en vivo

const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" }
];

io.on('connection',socket => {
  socket.emit('messages', messages);
  socket.emit('products', products);
  socket.on('new-message', (data) => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
  socket.on('new-item', (data) => {
    products.push(data);
    io.sockets.emit('products', products);
  })
});

productos.get('/',(req,res)=>{

  res.render('index.pug')

})

httpServer.listen(PORT, err => {
  if (err) throw new Error(`error en el sv ${err}`)
  console.log(`el sv escuchar en ${PORT} en http://localhost:3000/products`);
})



// // clase con los metodos
// class Contenedor {
//   constructor(txt) {
//     this.archivo = txt;
//   }
//   // guardar nuevo objeto
//   async save(req, res) {
//     try {
//       const data = await fs.promises.readFile('items.txt', 'utf-8');
//       const json = JSON.parse(data.toString("utf-8"));
//       let title = req.body.title;
//       let price = parseInt(req.body.price, 10);
//       let pic = req.body.pic;
//       const obj = { title: title, price: price, pic: pic, id: data.length };
//       json.push(obj);
//       await fs.promises.writeFile('items.txt', JSON.stringify(json, null, "\t"));
//       return res.render('index.pug', {
//         success: true,
//         message: `El id del producto es ${data.length}`
//       });
//     }
//     catch (err) {
//       console.log(`Hubo un error = ${err} `);
//     }
//   }
//   // mostrar todos los productos
//   async getAll(req, res) {
//     try {
//       const data = await fs.promises.readFile('items.txt', 'utf-8');
//       return res.render('index.pug', { products: JSON.parse(data.toString("utf-8")) });
//     }
//     catch (err) {
//       console.log(`Hubo un error = ${err} `);
//     }
//   }
// }


