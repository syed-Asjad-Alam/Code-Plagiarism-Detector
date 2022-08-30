const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const multer = require("multer");
const Student = require('../models/StudentModel')
const Class = require('../models/ClassModel')

router.get('/', (req, res)=>{
    res.json('on Student')
})

//studentsignup
router.post('/signup', async (req, res)=>{
    //res.send('sign up')
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password){
        //return res.status(404).send('Fill Field correctly')
        return res.json({msg: 'Some Fields Are Missing'})
    }
    const emailexist = await Student.findOne({email : req.body.email})

    if(emailexist){
        console.log(emailexist)
        //return res.status(400).send("Email Already Exist")
        return res.json({msg: 'Email Already Exist'})
    }
    try{
        const salt = await bcrypt.genSalt();
        const hashpassword =await  bcrypt.hash(req.body.password, salt);
        const new_student = new Student({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "number": req.body.number,
            "password": hashpassword
        });
        console.log(new_student)
        new_student.save()
        .then(res.json({msg:'Registered', student : new_student}))

    }
    catch(err){
        res.send(err)
    }  
})

//Student login
router.post('/login', async (req, res)=>{
    //res.send('login')
    if(!req.body.email || !req.body.password){
        //return res.status(404).send('Fill Fields Correctly')
        return res.json({msg:'Fill Fields Correctly'})

    }
    try{
    const found = await Student.findOne({email: req.body.email})
    if(found){
        const success = await bcrypt.compare(req.body.password, found.password)
        if(success){
            //const token = jwt.sign({_id : found._id}, process.env.TOKEN_SECRET);
             //res.header('token', token)
             res.json({msg:'Login', student: found})
        }
        else{
            //res.status(403).send('Password does not Match!')
            res.json({msg:'Password does not Match!'})

        }
        
    }
    else{
        res.json({msg:'Student Email does not exist'})
    }
}
catch(err){
    console.log(err)
    res.send(err)
}
})

//forget student password
router.post('/forgetpass/:Semail', async (req, res)=>{
    const req_email = req.params.Semail;
    console.log(req_email)
    const found = await Student.findOne({email: req_email})
    console.log(found)
    if(found){
        var pass = found.password;
        console.log(pass)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS
            }
          });
          
          var message= {
            from: 'siddiquisubyyal@gmail.com',
            to: `${req_email}`,
            subject: 'Sending CPC Password to grant the access in website!',
            text: `Your Student Password ${pass}`
          };
          
          transporter.sendMail(message, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.json({msg: 'Email Sent to your Email Address'})
            }
          })

    }
    else{
        res.json({msg: 'The Email is not Registered with us'})
    }
    
})

//displaying classes on student dashboard
router.get('/dashboard/:Sid', async (req, res)=>{
    const id = req.params.Sid;
    console.log("here Student dashboard" + id)
    const found = await Class.find({ClassStudents : id});
    if(found.length>=1){
        console.log(found)
        res.json({msg: 'done', class: found})
    }
    else {
        res.json({msg: 'No Class Joined Yet'})
    }

})

//student joining class with class code

router.post('/dashboard/joinclass/:id', async (req,res)=>{
    if(!req.body.classcode){
        return res.json({msg: 'Enter Code to Join'})
    }
    const S_id = req.params.id
    const code = req.body.classcode;
    const found = await Class.findOne({ClassCode : code})
    if(found){
        console.log('in firt if'+ found)
        //this is not working properly yet
        const already = await Class.findOne({ClassStudents: [S_id]})
            if(already){
                console.log('in 2nd if'+ already)
                return res.json({msg: 'You are already a member of this class', class:already})
            }
        try{
            
            const classId = found._id;
            const updateClass = await Class.updateOne({_id :classId},{
                $push :{
                    ClassStudents : S_id
                }
            })
            res.json({msg: 'Joined', class: found}) 
        }
        catch(err){
            res.json({msg:'Error Occur while Joining, Try again', err:err})
        }
        



    }
    else{
        res.json({msg: 'Incorrect Class Code'})
    }

})



module.exports = router