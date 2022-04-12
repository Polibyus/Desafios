const express = require('express');
const app = express();
const PORT = 8080;
const handlebars = require('express-handlebars');

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"));

fakeApi = () => [
    { name: 'Katarina', lane: 'midlaner'},
    { name: 'Jayce', lane: 'top'},
    { name: 'Heimer', lane: 'midlaner'},
    { name: 'Kassadin', lane: 'midlaner'},
    { name: 'Fizz', lane: 'midlaner'}
];

app.get('/', (req, res) => {
    res.render('main', { suggestedChamps: fakeApi(), listExist: true });
});

app.listen(PORT, err => {
    if(err) throw new Error(`error en el sv ${err}`)
    console.log(`el sv escuchar en ${PORT}`);
})
