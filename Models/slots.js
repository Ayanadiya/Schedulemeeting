const Sequelize = require('sequelize');
const sequelize = require('../utils/database');



const Slot= sequelize.define('slots',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    time:{
        type:Sequelize.TIME,
        allowNull:false
    },
    available:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
}, {
    timestamps: false, // Disable automatic timestamp fields
});



module.exports=Slot;