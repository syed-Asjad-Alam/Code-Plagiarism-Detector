import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const TeacherCreateAssign = () => {
    const location = useLocation();
    const c_id = location.state.class;
    const [assignname, setassignname] = useState('')
    const [instruc, setinstruc] = useState('')
    const [expect, setexpect] = useState('')
    const [deadline, setdeadline] = useState('')
    const [assignfile, setassignfile] = useState()
    const [allowed, setallowed] = useState('')

    

    const navigate = useNavigate();

    const uploadfile = (e) =>{
        e.preventDefault();
        console.log('uploading file')

        const sendPostRequest = async () => {
            console.log('in post')
            try {
                const res = await axios.post('http://localhost:4000/teacher/upload',{
                    Assignment : assignfile
                });
                console.log(res.data);
                //setmsg(res.data.msg)
                //alert(res.data.msg)
                
      
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };
        sendPostRequest();


    }

    const CreatingAssign = (e)=>{
        e.preventDefault();
        console.log('Assign Creating ')
        console.log("assign file"+assignfile)
    
        const sendPostRequest = async () => {
          console.log('in post')
          try {
              const res = await axios.post('http://localhost:4000/teacher/dashboard/class/createAssignment/'+c_id,{
                AssignmentName: assignname,
                Instructions: instruc,
                Deadline: deadline,
                ExpectedOutput: expect,
                AssignmentFile:assignfile,
                AllowedCode: allowed,
                 });
              console.log(res.data);
              //setmsg(res.data.msg)
              alert(res.data.msg)
              if(res.data.msg === 'Created'){
                console.log('in if')
                console.log(res.data.assign)
                navigate('/assignments', {state: {class: c_id}})
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
    <div>Create New Assignment</div>
    <div className="form">
     <form method='POST' action='/upload' encType= 'multipart/form-data'>
       <div className="input-container">
         <label>Assignment Name :  </label>
         <input type="text" name="ename"
          onChange={(x) => setassignname(x.target.value)}
          value={assignname} required />
       </div>
       <div className="input-container">
         <label>Assignment Instructions : </label>
         <input type="text" name="inst" 
         value={instruc}
         onChange={(x) => setinstruc(x.target.value)} required />
       </div>
       <div className="input-container">
         <label>Assignment Deadline : </label>
         <input type="text" name="dead" 
         value={deadline}
         onChange={(x) => setdeadline(x.target.value)} required />
       </div>
       <div className="input-container">
         <label>Assignment Expected Output : </label>
         <input type="text" name="expect" 
         value={expect}
         onChange={(x) => setexpect(x.target.value)} required />
       </div><div className="input-container">
         <label>Assignment Allowed Code : </label>
         <input type="text" name="allowed" 
         value={allowed}
         onChange={(x) => setallowed(x.target.value)} required />
       </div>
       <div className="input-container">
         <label>Assignment File : </label>
         <input type="file" name="Assignment"  required 
         onChange={(x) => setassignfile(x.target.value)} />
         {/* <button type='submit' >Upload</button> */}
         
       </div>
       <div className="button-container">
         <button onClick={CreatingAssign}>Create</button>
       </div>
       
     </form>
   </div>

    </>
  )
}

export default TeacherCreateAssign