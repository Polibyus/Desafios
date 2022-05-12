const { mariaDB } = require('./config/mariaDB');
const { sqLite } = require('./config/sqlLite');

const insertProducts = (knex) => {
    knex('prutesteba').insert({name: 'Heladera', price: 200})
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}

insertProducts(mariaDB);
insertProducts(sqLite);