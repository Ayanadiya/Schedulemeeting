const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Booking= sequelize.define('booking',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
}, {
    timestamps: false, // Disable automatic timestamp fields
});



module.exports=Booking;