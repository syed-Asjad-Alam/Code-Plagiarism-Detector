const mongoose = require('mongoose');

const Studentschema = new mongoose.Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email : {
        type: String,
        required:true,
        unique:true
    },
    number: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('Student', Studentschema);