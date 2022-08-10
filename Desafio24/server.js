const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const app = express()
const productos = require('./fakerProducts')
const PORT = 3000;

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './views');
app.set('view engine', 'pug');
//public
app.use(express.static('public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://JuanchiFP:juanchi123@cluster0.jaeglry.mongodb.net/sesiones',
        mongoOptions: advancedOptions
    }),
    secret: 'JuanchiFP',
    resave: false,
    saveUninitialized: false
}))

app.get('/', checkUnlogged, (req, res) => {
    res.render('login.pug')
})

app.get('/productos', (req, res) => {
    res.render('productos.pug', { productos: productos })
})

app.get('/index', (req, res) => {
    const { username, password } = req.query;
    if (username == 'JuanchiFP' && password == 'juanchi123') {
        req.session.user = username;
        req.session.admin = true;
        req.session.logged = true;
    } else {
        res.render('login.pug', { error: true })
    }
    res.render('index.pug', { username: req.session.user })
})

app.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send({ status: 'Logout Error', body: error })
        }
    })

    res.render('login.pug', { mensaje: 'Te has desconectado' })
})

function checkUnlogged(req, res, next) {
    if (req.session.logged == undefined) {
        return next();
    }
    return res.render('index.pug', { username: req.session.user })
}


app.listen(PORT, err => {
    if (err) throw new Error(`error en el sv ${err}`)
    console.log(`el sv escucha en ${PORT} en http://localhost:3000`);
})
