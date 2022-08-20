import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const TeacherCreateClass = () => {
    const location = useLocation();
    const teacher = location.state.teacher;
    const t_id = teacher._id;
    const [classname, setclassname] = useState('')
    const [classdescription, setdescription] = useState('')
    const navigate = useNavigate();


    const CreatingClass = (e)=>{
        e.preventDefault();
        console.log('Class ')
    
        const sendPostRequest = async () => {
          console.log('in post')
          try {
              const res = await axios.post('http://localhost:4000/teacher/dashboard/createClass/'+t_id,{
                   ClassName: classname,
                   ClassDescription: classdescription
                 });
              console.log(res.data);
              //setmsg(res.data.msg)
              alert(res.data.msg)
              if(res.data.msg === 'Created'){
                console.log('in if')
                console.log(res.data.teacher)
                navigate('/dashboard', {state: {teacher:teacher}})
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
    <div>Create New Class</div>
    <div className="form">
     <form >
       <div className="input-container">
         <label>Class Name :  </label>
         <input type="text" name="ename"
          onChange={(x) => setclassname(x.target.value)}
          value={classname} required />
       </div>
       <div className="input-container">
         <label>Class Description : </label>
         <input type="text" name="pass" 
         value={classdescription}
         onChange={(x) => setdescription(x.target.value)} required />
       </div>
       <div className="button-container">
         <button onClick={CreatingClass}>Create</button>
       </div>
       
     </form>
   </div>

    </>
  )
}

export default TeacherCreateClass