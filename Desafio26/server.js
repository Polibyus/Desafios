const express = require('express')
const session = require('express-session')
const routes = require('./src/routes/routes')
const UserModel = require('./src/models/usuarios');
const MongoStore = require('connect-mongo')
const { MONGO_URI } = require('./src/config/globals');

const { TIEMPO_EXPIRACION } = require('./src/config/globals')
const {validatePass} = require('./src/utils/passValidator');
const {createHash} = require('./src/utils/hashGenerator')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const PORT = 3000;

const app = express()

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: advancedOptions
    }),
    secret: 'JuanchiFP',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './src/views');
app.set('view engine', 'pug');
//public
app.use(express.static('public'));

app.use(passport.initialize())
app.use(passport.session())


passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                console.log('No se encontro usuario');
                return callback(null, false)
            }

            if(!validatePass(user, password)) {
                console.log('Invalid Password');
                return callback(null, false)
            }

            return callback(null, user)
        })
    }
))


passport.use('signup', new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            if (user) {
                console.log('El usuario ya existe');
                return callback(null, false)
            }

            console.log(req.body);

            const newUser = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: username,
                password: createHash(password)
            }

            console.log(newUser);


            UserModel.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }
                console.log(userWithId);
                console.log('Registro de usuario satisfactoria');

                return callback(null, userWithId)
            })
        })
    }
))


passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    UserModel.findById(id, callback)
})


//  INDEX
app.get('/', routes.getRoot);

//  LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

//  SIGNUP
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//  LOGOUT
app.get('/logout', routes.getLogout);


// PROFILE
app.get('/productos', routes.checkAuthentication, routes.getProductos);


//  FAIL ROUTE
app.get('*', routes.failRoute);

app.listen(PORT, err => {
    if (err) throw new Error(`error en el sv ${err}`)
    console.log(`el sv escucha en ${PORT} en http://localhost:3000`);
})
