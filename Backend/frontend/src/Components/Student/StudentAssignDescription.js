import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const StudentAssignDescription = () => {
  const [submitfile, setsubmitfile] = useState(null)

    const location = useLocation();
    const navigate = useNavigate();
    //p is used for the props coming from StudentClassAssignment.js
    var A_id = location.state.p.Assignid;
    var student = location.state.p.student;
    var c_id = location.state.p.classid;
    var S_name = student.firstname + " " + student.lastname;

  const submitAssign = (e) =>{
    e.preventDefault();

    const sendPostRequest = async () => {
      try {
          const res = await axios.post('http://localhost:4000/student/dashboard/class/submitassignment/'+A_id, {
            SubmittedFile: submitfile,
            StudentID : student._id,
            StudentName : S_name
             }, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
             });
          alert(res.data.msg)
          if(res.data.msg === 'Submitted'){
            navigate('/S_assignments', {state: {class: c_id, student: student}})
          }

      } catch (err) {
          console.error(err);
      }
  };
  sendPostRequest();


  }  

  return (
 <>
    <div><h2>Student Assignment Description</h2></div>
    <div>Assignment Name : {location.state.p.assignname}</div>
    <br/>
    <div>Assignment Instructions : {location.state.p.instruction}</div>
    <br/>
    <div>Assignment Deadline : {location.state.p.deadline}</div>
    <br/>
    <div>Assignment Expected Output : {location.state.p.expect}</div>
    <br/>
    <div>Assignment Allowed Code File : {location.state.p.Allowed}</div>
    <br/>
    <div>Assignment File : {location.state.p.file}</div>
    <br/>
    <div>
    <label>Attach Your Work : </label>
         <input type="file" name="Assignment"
         onChange={(e)=>setsubmitfile(e.target.files[0])}  />         
       </div>
       <br></br>
    <button onClick={submitAssign}>Submit Assignment</button>
    </>
  )
}

export default StudentAssignDescription