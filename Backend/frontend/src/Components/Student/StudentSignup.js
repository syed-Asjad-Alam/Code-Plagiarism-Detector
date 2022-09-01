import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import {Redirect} from 'react-router-dom'


const StudentSignup = () => {
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [number, setnumber] = useState('')
  const [msg, setmsg] = useState('')
  const navigate = useNavigate();

  const usersignup = async (e)=>{
    e.preventDefault();  
    const sendPostRequest = async () => {
      console.log('in post')
      try {
          const res = await axios.post('http://localhost:4000/student/signup',{
            firstname: fname,
            lastname: lname,
            email: email,
            number: number,
            password: password
             });
          console.log(res.data);
          setmsg(res.data.msg)
          alert(res.data.msg)
          if(res.data.msg === 'Registered'){
            console.log('in if')
            navigate('/S_login')
          }

      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  };
  sendPostRequest();
  }

  return (
    <>
    <div>STUDENT SIGN UP</div>
   <div className="form">
     <form >
     <div className="input-container">
         <label>First Name </label>
         <input type="text" name="ename"
          onChange={(x) => setfname(x.target.value)}
          value={fname} required />
       </div>
       <div className="input-container">
         <label>Last Name </label>
         <input type="text" name="ename"
          onChange={(x) => setlname(x.target.value)}
          value={lname} required />
       </div>
       <div className="input-container">
         <label>Mobile Number </label>
         <input type="text" name="ename"
          onChange={(x) => setnumber(x.target.value)}
          value={number} required />
       </div>
       <div className="input-container">
         <label>Email </label>
         <input type="text" name="ename"
          onChange={(x) => setemail(x.target.value)}
          value={email} required />
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" 
         value={password}
         onChange={(x) => setpassword(x.target.value)} required />
       </div>
       <div className="button-container">
         <button onClick={usersignup}>Sign Up!</button>
       </div>
       <div>
        <a href='/S_login'>Already have an account?</a>
       </div>
     </form>
   </div>
    </>
  )
}

export default StudentSignup