import { useState } from 'react';
import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';


const TeacherProfile = () => {
    const location = useLocation();
  const navigate = useNavigate();
const [email, setemail] = useState()
const [fname, setfname] = useState() 
const [lname, setlname] = useState() 
const [num, setnum] = useState(); 
const teacher = location.state.teacher;
const t_id = teacher._id;

console.log("t in profile" + t_id)

React.useEffect(()=>{

    axios.get("http://localhost:4000/teacher/profile/"+t_id).then((res) => {  
            console.log(res.data.teacher);
            setfname(res.data.teacher.firstname) 
            setlname(res.data.teacher.lastname) 
            setemail(res.data.teacher.email) 
            setnum(res.data.teacher.number) 
          });
  
  }, []);

  const updateprofile = () =>{
    navigate("/update", {state: {teacher:teacher, id: t_id, email: email, fname: fname,lname: lname, num:num}})
  
   } 
    
  return (
    <>
    <div>Teacher: {fname} Profile</div>
    <div>
      <p>
        Id: {t_id}
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

export default TeacherProfile