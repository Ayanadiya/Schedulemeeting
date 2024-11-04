const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const cors =require('cors');


const sequelize = require('./utils/database');
const Slot = require('./Models/slots');
const Booking = require('./Models/booking');

const slotsroutes=require('./Routes/slots')

const app =express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

app.use(slotsroutes)

Slot.hasMany(Booking);
Booking.belongsTo(Slot);

sequelize.sync()
.then(result =>{
    console.log(result);
    app.listen(3000);
}).catch(err => console.log(err));