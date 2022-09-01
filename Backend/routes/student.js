const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const multer = require("multer");
const Student = require('../models/StudentModel')
const Class = require('../models/ClassModel')
const Assignment = require('../models/AssignmentModel')
const Solution = require('../models/SolutionModel')

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
    //console.log(req_email)
    const found = await Student.findOne({email: req_email})
    //console.log(found)
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
    //console.log("here Student dashboard" + id)
    const found = await Class.find({ClassStudents : id});
    if(found.length>=1){
        //console.log(found)
        res.json({msg: 'done', class: found})
    }
    else {
        res.json({msg: 'No Class Joined Yet'})
    }

})

//student joining class with class code
router.post('/dashboard/joinclass/:Sid', async (req,res)=>{
    if(!req.body.classcode){
        return res.json({msg: 'Enter Code to Join'})
    }
    const S_id = req.params.Sid
    const code = req.body.classcode;
    const found = await Class.findOne({ClassCode : code})
    //console.log('found'+found)
   
    if(found){
        console.log('in firt if'+ found)            
        //comparing in class student array that student already a member or not
        const already = found.ClassStudents.some((x=>x.toString()==S_id));
        if(already){
            //console.log('in 2nd if'+ already)
            return res.json({msg: 'You are already a member of this class', class:found})
        }
        try{
            
            const classId = found._id;
            const updateClass = await Class.updateOne({_id :classId},{
                $push :{
                    ClassStudents : S_id
                }
            })
            res.json({msg:'Joined', class: found}) 
        }
        catch(err){
            res.json({msg:'Error Occur while Joining, Try again', err:err})
        }
    }
    else{
        res.json({msg:'Incorrect Class Code'})
    }
})

//Student getting assignments of class
router.get('/dashboard/class/:id', async (req, res)=>{
    const Cl_id = req.params.id;
    //console.log("here student in class" + Cl_id)
    try{
    const found = await Assignment.find({ClassID : Cl_id});
    if(found.length>=1){
        //console.log("found"+found)
        res.json({msg: 'done', Assignment: found})

    }
    else {
        res.json({msg: 'No Assignments'})
    }
}
catch (err){
    res.json(err)
}
})

//middleware to upload files
var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'AssignmentsSubmitted')
    },
    filename: (req, file, cb)=> {
      cb(null,  Date.now() + '-' + file.originalname)
    }
  });
 
var upload = multer({storage: storage })

//student submitting assignment in class
router.post('/dashboard/class/submitassignment/:Aid', upload.single('SubmittedFile'), (req, res)=>{
    const A_id = req.params.Aid;
     var fileinfo = req.file;
     //console.log(fileinfo)
     var filename = fileinfo.filename
    if(!req.body.StudentID){
        return res.json({msg:'Some Error occur, try again later'})
    }
        try{
            const submit_assign = new Solution({
                "SubmittedFile": filename,
                "AssignmentID": A_id,
                "StudentID": req.body.StudentID,
                "StudentName": req.body.StudentName ? req.body.StudentName : "Student Name"

            });
            //console.log("solution"+submit_assign)
            submit_assign.save()
            .then(res.json({msg:'Submitted', assign : submit_assign}))
    
        }
        catch(err){
            res.json(err)
        }    

})


//view student profile
router.get('/profile/:Sid', async (req, res) =>{
    //console.log('here')
    const student = await Student.findById({_id: req.params.Sid});
    res.json({student: student})
} )

//update profile with current password of profile, optional new & confirm password
// return if current pass from req does not matches with stored pass
router.put('/profile/update/:Sid', async (req, res)=>{
    if(!req.body.lastname || !req.body.CurrentPassword || !req.body.number){
        return res.json({msg:'Fill Fields Correctly'})
    }
    const studentone = await Student.findById({_id : req.params.Sid});
    //console.log(studentone)
    if(studentone){
        //if user does not want to update password
        if(!req.body.NewPassword){
            //console.log('no new')
            const success = await bcrypt.compare(req.body.CurrentPassword, studentone.password)
            if(success){ 
                //console.log('success') 
            try{
                const update_student = await Student.updateOne({_id: req.params.Sid},{
                    $set : {
                        lastname : req.body.lastname ? req.body.lastname : studentone.lastname,
                        number : req.body.number ? req.body.number : studentone.number,
                        }
                })
                res.json({msg: 'updated', update_student}) 
            }
            catch(err){
                //console.log(err)
                res.json({msg: 'User Does not Exist', err: err})
            }

            }
            else{
                return res.json({msg: 'Password does not match with stored one'})
            }
       }
       //if user want to update password
       else if(req.body.NewPassword && req.body.ConfirmPassword){
        //console.log("new")
        if(req.body.NewPassword !== req.body.ConfirmPassword){
            return res.json({msg: 'New & Confirm Password Fields Does not Match'})
        }
        const success = await bcrypt.compare(req.body.CurrentPassword, studentone.password)
        const salt = await bcrypt.genSalt();
        const hashpassword =await  bcrypt.hash(req.body.NewPassword, salt);
            if(success){  
            try{
                const update_student = await Student.updateOne({_id: req.params.Sid},{
                    $set : {
                        lastname : req.body.lastname ? req.body.lastname : studentone.lastname,
                        number : req.body.number ? req.body.number : studentone.number,
                        password : hashpassword
                        }
                })
                res.json({msg: 'updated', update_student}) 
            }
            catch(err){
                res.json({msg: 'User Does not Exist', err})
            }

            }
            else{
                return res.json({msg: 'Password does not match with stored one'})
            }


       }

        
    }
    
})



module.exports = router