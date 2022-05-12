const { mariaDB } = require('./config/mariaDB');
const { sqLite } = require('./config/sqlLite');

const createTable = async knex => {
    await knex.schema.createTable('prutesteba', table => {
        table.increments('id');
        table.string('name');
        table.integer('price');
      });
   }

createTable(mariaDB);
createTable(sqLite);