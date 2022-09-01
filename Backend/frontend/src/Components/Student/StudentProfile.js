import { useState } from 'react';
import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const location = useLocation();
  const navigate = useNavigate();
const [email, setemail] = useState()
const [fname, setfname] = useState() 
const [lname, setlname] = useState() 
const [num, setnum] = useState(); 
const student = location.state.student;
const s_id = student._id;

React.useEffect(()=>{

  axios.get("http://localhost:4000/student/profile/"+s_id).then((res) => {  
          setfname(res.data.student.firstname) 
          setlname(res.data.student.lastname) 
          setemail(res.data.student.email) 
          setnum(res.data.student.number) 
        });

}, []);

const updateprofile = () =>{
  navigate("/S_update", {state: {student:student, id: s_id, email: email, fname: fname,lname: lname, num:num}})

 } 

  return (
    <>
    <div>Student: {fname} Profile</div>
    <div>
      <p>
        Id: {s_id}
      </p>
      <p>
        FirstName: {fname}
      </p>
      <p>
        LastName: {lname}
      </p>
      <p>
        Email: {email}
      </p>
      <p>
        Phone Number: {num}
      </p>
      
      <div>
      <button onClick={updateprofile}>Update Profile</button>
      </div>
      
    </div>
    </>
  )
}

export default StudentProfile