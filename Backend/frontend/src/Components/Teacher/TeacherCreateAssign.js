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
    const [assignfile, setassignfile] = useState(null)
    const [allowed, setallowed] = useState('')

    

    const navigate = useNavigate();

    // const uploadfile = (e) =>{
    //     e.preventDefault();
    //     console.log('uploading file')

    //     const sendPostRequest = async () => {
    //         console.log('in post')
    //         try {
    //             const res = await axios.post('http://localhost:4000/teacher/upload',{
    //                 Assignment : assignfile
    //             });
    //             console.log(res.data);
    //             //setmsg(res.data.msg)
    //             //alert(res.data.msg)
                
      
    //         } catch (err) {
    //             // Handle Error Here
    //             console.error(err);
    //         }
    //     };
    //     sendPostRequest();


    // }

    // const changeHandler = (event) => {

    //   setassignfile(event.target.files[0]);
      
    //   console.log("here"+assignfile.name)
    //   console.log("after")
    //   console.log(event.target.files[0])
  
    // };


    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   console.log("here");
    //   const data = new FormData(event.currentTarget);
    //   sendData(data);
    // };

    const CreatingAssign = (e)=>{
      console.log("create"+ assignfile.name)
        e.preventDefault();
        // console.log('Assign Creating ')
        // console.log("assign file"+assignfile)
    
        const sendPostRequest = async () => {
          console.log('in post')
          try {
              const res = await axios.post('http://localhost:4000/teacher/dashboard/class/createAssignment/'+c_id, {
                AssignmentName: assignname,
                Instructions: instruc,
                Deadline: deadline,
                ExpectedOutput: expect,
                AssignmentFile:assignfile,
                AllowedCode: allowed,
                 }, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                 });
              //console.log(res.data);
              //setmsg(res.data.msg)
              alert(res.data.msg)
              if(res.data.msg === 'Created'){
                // console.log('in if')
                // console.log(res.data.assign)
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
     <form method='POST' encType='multipart/form-data'>
       <div className="input-container">
         <label>Assignment Name :  </label>
         <input type="text" name="Assignname"
          onChange={(x) => setassignname(x.target.value)}
          value={assignname} required />
       </div>
       <div className="input-container">
         <label>Assignment Instructions : </label>
         <input type="text" name="instruction" 
         value={instruc}
         onChange={(x) => setinstruc(x.target.value)} required />
       </div>
       <div className="input-container">
         <label>Assignment Deadline : </label>
         <input type="text" name="deadline" 
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
         <input type="file" name="Assignment"
         onChange={(e)=>setassignfile(e.target.files[0])}  />         
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