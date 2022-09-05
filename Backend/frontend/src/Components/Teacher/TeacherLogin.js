import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [msg, setmsg ] = useState('');
  const navigate = useNavigate();
  
  const userlogin = (e)=>{
    e.preventDefault();
    //console.log('here login')

    const sendPostRequest = async () => {
      //console.log('in post')
      try {
          const res = await axios.post('http://localhost:4000/teacher/login',{
               email: email,
               password: password
             });
          //console.log(res.data);
          setmsg(res.data.msg)
          alert(res.data.msg)
          if(res.data.msg === 'Login'){
            //console.log('in if')
            //console.log(res.data.teacher)
            navigate('/dashboard', {state: {teacher: res.data.teacher}})
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
    <div><h2>TEACHER LOGIN</h2></div>
   <div className="form">
     <form >
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
         <button onClick={userlogin}>Login</button>
       </div>
       <br></br>
       <a href='/signup'>Don't have account?</a>
       <div>
        <br></br>
        <button onClick={()=> navigate('/forgetpass')}>Forget Password?</button>
       </div>
     </form>
   </div>
    </>
  )
}

export default TeacherLogin