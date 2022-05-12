const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { Router } = express;
const app = express();
const productos = Router();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 3000;
const { mariaDB } = require('./config/mariaDB');
const { sqLite } = require('./config/sqlLite');

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './views');
app.set('view engine', 'pug');
//public
app.use(express.static('public'));
//rutas con express
app.use('/productos', productos);


// clase con los metodos
class Contenedor {
  constructor() { }
  // guardar nuevo objeto
  async save(knex, item) {
    try {
      let title = item.title;
      let price = parseInt(item.price, 10);
      let pic = item.pic;
      const obj = { title: title, price: price, pic: pic };
      knex('productos').insert(obj)
        .then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
  // mostrar todos los productos
  getAll = async (knex) => {
    try {
      const data = await knex('productos').select('*')
        .then((result) => {
          return result;
        }).catch((err) => {
          console.log(err);
        });
      return data;
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
}

const items = new Contenedor();

const createTableProd = async knex => {
  await knex.schema.hasTable('productos').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('productos', table => {
        table.increments('id');
        table.string('title');
        table.integer('price');
        table.string('pic');
      });
    }
  });
}

const createTableMsg = async knex => {
  await knex.schema.hasTable('mensajes').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('mensajes', table => {
        table.increments('id');
        table.string('author');
        table.string('text');
      });
    }
  });
}

createTableMsg(sqLite);
createTableProd(mariaDB);

// chat en vivo

const getMsg = async (knex) => {
  try {
    const data = await knex('mensajes').select('*')
      .then((result) => {
        return result;
      }).catch((err) => {
        console.log(err);
      });
    return data;
  }
  catch (err) {
    console.log(`Hubo un error = ${err} `);
  }
}

const newMsg = (knex, data) => {
  knex('mensajes').insert(data)
  .then((result) => {
      console.log(result);
  }).catch((err) => {
      console.log(err);
  });
}


io.on('connection', async socket => {
  socket.emit('messages', await getMsg(sqLite));
  socket.emit('products', await items.getAll(mariaDB));
  socket.on('new-message', async (data) => {
    newMsg(sqLite, data);
    io.sockets.emit('messages', await getMsg(sqLite));
  });
  socket.on('new-item', async (data) => {
    await items.save(mariaDB, data);
    const prod = await items.getAll(mariaDB);
    io.sockets.emit('products', prod);
  })
});

productos.get('/', (req, res) => {
  res.render('index.pug')
})

httpServer.listen(PORT, err => {
  if (err) throw new Error(`error en el sv ${err}`)
  console.log(`el sv escuchar en ${PORT} en http://localhost:3000/productos`);
})




