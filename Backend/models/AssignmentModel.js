const mongoose = require('mongoose');

const Assignmentschema = new mongoose.Schema({
    AssignmentName: {
        type: String,
        required: true
    },
    Instructions: {
        type: String,
        required: false
    },
    ExpectedOutput: {
        type: String, 
        required: false
    },
    Deadline: {
        //type: Date
        type:String, 
        required:true
    },
    AssignmentFile:{
        type:String, 
        required:true
    },
    AllowedCode : {
        type:String, 
        required:false
    },
    ClassID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Class', 
        required: true
    }


}) 

module.exports = mongoose.model('Assignment', Assignmentschema);