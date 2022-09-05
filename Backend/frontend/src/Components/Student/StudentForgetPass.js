import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const StudentForgetPass = () => {
    const [email, setemail] = useState('')

    const emailsending = (e) =>{
        e.preventDefault();

        const sendPostRequest = async () =>{
            try{
            const res = await axios.post('http://localhost:4000/student/forgetpass/'+email)
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
    <div><h2>STUDENT FORGET PASSWORD</h2></div>
   <div className="form">
     <form >
       <div className="input-container">
         <label>Email </label>
         <input type="text" name="ename"
          onChange={(x) => setemail(x.target.value)}
          value={email} required />
       </div>
       <div className="button-container">
         <button onClick={emailsending}>Send Email</button>
       </div>
     </form>
   </div>
    </>
  )
}

export default StudentForgetPass