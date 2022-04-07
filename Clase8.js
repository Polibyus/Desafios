const express = require('express');

const { Router } = express;

const app = express();
const personas = Router();
const mascotas = Router();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/personas', personas);
app.use('/mascotas', mascotas);

app.use(express.static('public'));
app.use('/custom/url', express.static(__dirname + '/public'));



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})




personas.get('/', (req, res) => {
  console.log('Personas ok');
  const listaPers = req.query;
  res.json(listaPers);
})

mascotas.get('/', (req, res) => {
  console.log('Mascotas ok');
  const listaMasc = {nombre: 'pepein', raza: 'de la calle'};
  res.json(listaMasc);
})

personas.post('/', (req, res) => {
  res.send(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

