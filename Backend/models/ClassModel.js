const mongoose = require('mongoose')

const Class_schema = new mongoose.Schema({
    ClassName: {
        type: String, 
        required: true
    },
    ClassDescription: {
        type: String, 
        required: true
    },
    ClassCode:{
        type:String, 
        required: true, 
        unique: true
    },
    ClassTeacher:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Teacher', 
        required: true
    },
    ClassStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Student'
        }
    ]



})


module.exports = mongoose.model('Class', Class_schema);