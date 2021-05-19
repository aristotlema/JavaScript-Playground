const Sequelize = require ('sequelize');

module.exports = new Sequelize('playlist_database', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});


