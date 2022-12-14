 import React from 'react'
 import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
 
 const TeacherForgetPass = () => {
    const [email, setemail] = useState('')

    const emailsending = (e) =>{
        e.preventDefault();

        const sendPostRequest = async () =>{
            try{
            const res = await axios.post('http://localhost:4000/teacher/forgetpass/'+email)
            console.log(res.data)
            alert(res.data.msg)
            }
            catch(err){
                console.log(err);

            }
        }
        sendPostRequest();

    }

   return (
    <>
    <div><h2>TEACHER FORGET PASSWORD</h2></div>
   <div className="form">
     <form >
       <div className="input-container">
         <label>Email </label>
         <input type="text" name="ename"
          onChange={(x) => setemail(x.target.value)}
          value={email} required />
       </div>
       <br/>
       <div className="button-container">
         <button onClick={emailsending}>Send Email</button>
       </div>
     </form>
   </div>
    </>
   )
 }
 
 export default TeacherForgetPass