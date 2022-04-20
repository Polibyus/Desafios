const express = require('express');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/datos', function(req, res){
    res.render('datos.pug', {min: req.query.min, nivel: req.query.nivel, max: req.query.max, titulo: req.query.titulo });
})

const server = app.listen(PORT, () => {
    console.log(`sv en puerto ${PORT}`);
})