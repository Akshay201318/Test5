const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Test5');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting with the database"));

db.once('open', function () {

    console.log("Sucsesfully! connected to the database ");
    
});


module.exports = db;