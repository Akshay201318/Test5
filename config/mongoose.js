const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://engineer:engineer54321@cluster0.v1spv.mongodb.net/<dbname>?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting with the database"));

db.once('open', function () {

    console.log("Sucsesfully! connected to the database ");
    
});


module.exports = db;