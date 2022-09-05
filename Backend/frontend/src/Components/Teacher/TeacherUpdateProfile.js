import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const TeacherUpdateProfile = () => {
const location = useLocation();
const teacher = location.state.teacher;
const navigate = useNavigate();
const [email, setemail] = useState(location.state.email)
const [lname, setlname] = useState(location.state.lname) 
const [num, setnum] = useState(location.state.num)
const [currentpass, setcurrentpass] = useState('');
const [newpass, setnewpass] = useState('');
const [confirmpass, setconfirmpass] = useState('');
const [show, setshow] = useState(false);


const t_id = location.state.id 

const postdata = (e) =>{
    e.preventDefault();
    console.log('here')

    axios.put("http://localhost:4000/teacher/profile/update/"+t_id, {
        lastname : lname,
        number:num,
        CurrentPassword: currentpass,
        NewPassword: newpass,
        ConfirmPassword: confirmpass,

    }).then(res => {
        console.log(res.data)
        alert(res.data.msg)
        if(res.data.msg === 'updated'){
            // navigate("/profile", {state: {id: t_id}})
            navigate("/dashboard", {state: {teacher: teacher}})

        }
    })

}

  return (
    <>
    <div><h2>Teacher Update Profile</h2></div>
    <div>
    <label>ID: </label>
     <input className="input" type="text" value = {t_id} disabled = {true}/>
     <br></br>
     <label>FirstName Name: </label>
    <input className="e-input" type="text" disabled = {true} value = {location.state.fname} />
     <br/>
    <label>Last Name: </label>
    <input className="e-input" type="text" placeholder="Enter Name" required = {true}
     value = {lname} onChange= {(x)=>setlname(x.target.value)}/>
     <br/>
     <label>Email: </label>
     <input className="input" type="text" disabled = {true} value = {location.state.email}/>
     <br></br>
     <label>Number: </label>
     <input className="input" type="text" required = {true}
     value = {num} onChange= {(x)=>setnum(x.target.value)}/>
     </div>
     <div>
     <label>Password: </label>
     <input className="input" type="text" placeholder='Password is required For changes' required = {true}
     value = {currentpass} onChange= {(x)=>setcurrentpass(x.target.value)}/>
     </div>
     <br/>
     <div>
        <button onClick={()=>setshow(!show)}>Update Password?</button>
        {show ?  <>
                <div>
            <label>New Password: </label>
            <input className="input" type="text" placeholder='New Password' required = {true}
            value = {newpass} onChange= {(x)=>setnewpass(x.target.value)}/>
            </div>
            <div>
            <label>Confirm Password: </label>
            <input className="input" type="text" placeholder='Confirm Password' required = {true}
            value = {confirmpass} onChange= {(x)=>setconfirmpass(x.target.value)}/>
            </div>
            </> 
     : <p></p>}

     </div>

     

     <button onClick={postdata}>Submit</button>                    
                
    
    </>
  )
}

export default TeacherUpdateProfile