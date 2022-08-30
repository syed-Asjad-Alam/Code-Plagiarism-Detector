const mongoose = require('mongoose');

const SubmittedAssignmentschema = new mongoose.Schema({
    SubmittedFile:{
        type:String, 
        required:true
    },
    SubmissionTime:{
        type:Date,
        default: Date.now
    },
    AssignmentID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Assignment', 
        required: true
    },
    StudentID :{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Student', 
        required: true
    },
    StudentName:{
        type:String,
        default:'Student Name'
    }


}) 

module.exports = mongoose.model('Solution', SubmittedAssignmentschema);