const { mariaDB } = require('./config/mariaDB');
const { sqLite } = require('./config/sqlLite');

const getProducts = (knex) => {
    knex('prutesteba').select('*')
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
}

getProducts(mariaDB);
getProducts(sqLite);