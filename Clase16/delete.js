const { mariaDB } = require('./config/mariaDB');
const { sqLite } = require('./config/sqlLite');

const deleteProducts = (knex) => {
    knex('productos').where({id:2}).del()
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
}

deleteProducts(mariaDB);
deleteProducts(sqLite);