const Sequelize = require('sequelize');

const sequelize = new Sequelize('schedulemeeting', 'root', 'Ayana@17', {
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;