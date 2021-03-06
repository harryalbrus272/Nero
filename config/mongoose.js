const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shashwatksingh:HJiuwiiYtU9vsJR@cluster0.wvifl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
db.once('open', ()=> {
    console.log('Connected to Database :: MongoDB');
});
module.exports = db;