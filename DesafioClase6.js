// server.js
// where your node app starts
const fs = require("fs");
const express = require("express");
const app = express();

let visitas = 0;
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${server.address().port}`);
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/visitas", (req, res) => {
  visitas++;
  res.send(
    `<h1 style="color:0000FF">La cantidad de visitas es ${visitas}</h1>`
  );
});

app.get("/", (req, res) => {
  res.send(`<h1 style="color:0000FF">Hola mundo en el titulo</h1>`);
});

app.get("/productos", (req, res) => {
  fs.promises
    .readFile("./items.txt", "utf-8")
    .then((data) => res.send(`<p>${data}</p>`))
    .catch((err) => console.log("Hubo un error"));
});

app.get("/productoRandom", (req, res) => {
  fs.promises
    .readFile("./items.txt", "utf-8")
    .then((data) => {
      const json = JSON.parse(data.toString("utf-8"));
      let indexR = getRandom(0, json.length);
      res.send(`<p>${JSON.stringify(json[indexR])}</p>`);
    })
    .catch((err) => console.log("Hubo un error"));
});
