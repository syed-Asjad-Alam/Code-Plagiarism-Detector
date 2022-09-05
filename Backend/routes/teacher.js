const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const multer = require("multer");
const Teacher = require('../models/TeacherModel');
const Class = require('../models/ClassModel')
const Assignment = require('../models/AssignmentModel')
const Solution = require('../models/SolutionModel')


mongoose.connect('mongodb+srv://subyyal:byyl12345@clustercpc.4rwoizy.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser : true}).then(()=>{
    console.log('connected to db in teacher')
}).catch(e => console.log(e));

router.get('/', (req, res)=>{
    res.json('on Teacher')
})

//teacher Signup
router.post('/signup', async (req, res)=>{
    //res.send('sign up')
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password){
        //return res.status(404).send('Fill Field correctly')
        return res.json({msg: 'Some Fields Are Missing'})
    }
    const emailexist = await Teacher.findOne({email : req.body.email})

    if(emailexist){
        console.log(emailexist)
        //return res.status(400).send("Email Already Exist")
        return res.json({msg: 'Email Already Exist'})
    }
    try{
        const salt = await bcrypt.genSalt();
        const hashpassword =await  bcrypt.hash(req.body.password, salt);
        const new_teacher = new Teacher({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "email": req.body.email,
            "number": req.body.number,
            "password": hashpassword
        });
        console.log(new_teacher)
        new_teacher.save()
        .then(res.json({msg:'Registered', teacher : new_teacher}))

    }
    catch(err){
        res.send(err)
    }  
})

//Teacher login
router.post('/login', async (req, res)=>{
    //res.send('login')
    if(!req.body.email || !req.body.password){
        //return res.status(404).send('Fill Fields Correctly')
        return res.json({msg:'Fill Fields Correctly'})

    }
    try{
        //console.log(req.body.email)
    const found = await Teacher.findOne({email: req.body.email})
    if(found){
        const success = await bcrypt.compare(req.body.password, found.password)
        if(success){
            //const token = jwt.sign({_id : found._id}, process.env.TOKEN_SECRET);
             //res.header('token', token)
             res.json({msg:'Login', teacher: found})
        }
        else{
            //res.status(403).send('Password does not Match!')
            res.json({msg:'Password does not Match!'})

        }
        
    }
    else{
        res.json({msg:'Teacher Email does not exist'})
    }
}
catch(err){
    console.log(err)
    res.send(err)
}
})

//forget Teacher password
router.post('/forgetpass/:Temail', async (req, res)=>{
    const req_email = req.params.Temail;
    //console.log(req_email)
    const found = await Teacher.findOne({email: req_email})
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
            text: `Your Password ${pass}`
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

//displaying classes on teacher dashboard
router.get('/dashboard/:Tid', async (req, res)=>{
    const id = req.params.Tid;
    //console.log("here Teacher dashboard" + id)
    const found = await Class.find({ClassTeacher : id});
    if(found.length>=1){
        //console.log(found)
        res.json({msg: 'done', class: found})
    }
    else {
        res.json({msg: 'No Class Created Yet'})
    }

})

//creating class with specific teacher id
router.post('/dashboard/createClass/:Tid', async (req, res)=>{
    const T_id = req.params.Tid;
    if(!req.body.ClassName || !req.body.ClassDescription){
        return res.json({msg: 'Fill Field Correctly'})
    }
//generating class id
        var C_id = '';
        var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++ ) {
          C_id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        //console.log(C_id)

        try{
            const new_class = new Class({
                "ClassName": req.body.ClassName,
                "ClassDescription": req.body.ClassDescription,
                "ClassCode": C_id,
                "ClassTeacher": T_id,
                "ClassStudents": []
            });
            console.log(new_class)
            new_class.save()
            .then(res.json({msg:'Created', class : new_class}))
    
        }
        catch(err){
            res.json(err)
        }    

})

//getting assignments of class
router.get('/dashboard/class/:id', async (req, res)=>{
    const Cl_id = req.params.id;
    //console.log("here in class" + Cl_id)
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
      cb(null, 'AssignmentsUpload')
    },
    filename: (req, file, cb)=> {
      cb(null,  Date.now() + '-' + file.originalname)
    }
  });
 
var upload = multer({storage: storage })

//creating assignment in class
router.post('/dashboard/class/createAssignment/:Cid', upload.single('AssignmentFile'), (req, res)=>{
    const C_id = req.params.Cid;
    // console.log(req)
    // console.log(req.file)
     var fileinfo = req.file;
     console.log(fileinfo)
     var filename = fileinfo.filename
    if(!req.body.AssignmentName){
        return res.json({msg: 'Fill Field Correctly'})
    }
        try{
            const new_assign = new Assignment({
                "AssignmentName": req.body.AssignmentName,
                "Instructions": req.body.Instructions,
                "ExpectedOutput": req.body.ExpectedOutput,
                "Deadline":req.body.Deadline,
                "AssignmentFile": filename,
                "AllowedCode": req.body.AllowedCode,
                "ClassID" : C_id
            });
           // console.log(new_assign)
            new_assign.save()
            .then(res.json({msg:'Created', assign : new_assign}))
    
        }
        catch(err){
            res.json(err)
        }    

})


//Teacher Viewing Submitted Assignment
router.get('/dashboard/class/viewsubmit/:A_id', async (req, res)=>{
    const A_id = req.params.A_id;
    //console.log("here Teacher viewing" + A_id)
    const found = await Solution.find({AssignmentID : A_id});
    if(found.length>=1){
        //console.log(found)
        res.json({msg: 'done', submit: found})
    }
    else {
        res.json({msg: 'No Assignment Submitted By Student Yet.'})
    }

})

//view profile
router.get('/profile/:id', async (req, res) =>{
    //console.log('here')
    const teacher = await Teacher.findById({_id: req.params.id});
    res.json({teacher: teacher})
} )

//update profile with current password of profile, optional new & confirm password
// return if current pass from req does not matches with stored pass
router.put('/profile/update/:id', async (req, res)=>{
    if(!req.body.lastname || !req.body.CurrentPassword || !req.body.number){
        return res.json({msg:'Fill Fields Correctly'})
    }
    const teacherone = await Teacher.findById({_id : req.params.id});
    //console.log(teacherone)
    if(teacherone){
        //if user does not want to update password
        if(!req.body.NewPassword){
            //console.log('no new')
            const success = await bcrypt.compare(req.body.CurrentPassword, teacherone.password)
            if(success){ 
               // console.log('success') 
            try{
                const update_teacher = await Teacher.updateOne({_id: req.params.id},{
                    $set : {
                        lastname : req.body.lastname ? req.body.lastname : teacherone.lastname,
                        number : req.body.number ? req.body.number : teacherone.number,
                        }
                })
                res.json({msg: 'updated', update_teacher}) 
            }
            catch(err){
                console.log(err)
                res.json({msg: 'User Does not Exist', err: err})
            }

            }
            else{
                return res.json({msg: 'Password does not match with stored one'})
            }
       }
       //if user want to update password
       else if(req.body.NewPassword && req.body.ConfirmPassword){
        console.log("new")
        if(req.body.NewPassword !== req.body.ConfirmPassword){
            return res.json({msg: 'New & Confirm Password Fields Does not Match'})
        }
        const success = await bcrypt.compare(req.body.CurrentPassword, teacherone.password)
        const salt = await bcrypt.genSalt();
        const hashpassword =await  bcrypt.hash(req.body.NewPassword, salt);
            if(success){  
            try{
                const update_teacher = await Teacher.updateOne({_id: req.params.id},{
                    $set : {
                        lastname : req.body.lastname ? req.body.lastname : teacherone.lastname,
                        number : req.body.number ? req.body.number : teacherone.number,
                        password : hashpassword
                        }
                })
                res.json({msg: 'updated', update_teacher}) 
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