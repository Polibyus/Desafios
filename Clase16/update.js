const { mariaDB } = require('./config/mariaDB');
const { sqLite } = require('./config/sqlLite');

const updateProducts = (knex) => {
    knex('productos').where({id:1}).update({name: 'Lavarropa'})
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}

updateProducts(mariaDB);
updateProducts(sqLite);