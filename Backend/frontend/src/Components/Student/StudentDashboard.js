import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StudentClass from './StudentClass';

const StudentDashboard = () => {
    const location = useLocation();
const [classdata, setclassdata ] = useState()
const [msg, setmsg] = useState('');
const [msg2, setmsg2] = useState('');
const [show, setshow] = useState(false);
const [code, setcode] = useState('')
const navigate = useNavigate();
const student = location.state.student;
const s_id = student._id;

React.useEffect(()=>{
    //for showing joined classes
    const sendGetRequest = async () => {
        try {
            const res = await axios.get("http://localhost:4000/student/dashboard/"+s_id);
            setclassdata(res.data.class);
            setmsg(res.data.msg)
            //alert(res.data.msg)
        } catch (err) {
            console.error(err);
        }
    };
    
    sendGetRequest();
}, []);

//for join class
const JoinClass = (e)=>{
    e.preventDefault();
    const sendPostRequest = async () => {
      try {
          const res = await axios.post('http://localhost:4000/student/dashboard/joinclass/'+s_id,{
               classcode: code,
               
             });
          setmsg2(res.data.msg)
          alert(res.data.msg)
          if(res.data.msg === 'Joined'){
            //navigate('/S_dashboard', {state: {student: res.data.student}})
            window.location.reload(false);
          }

      } catch (err) {
          console.error(err);
      }
  };
  sendPostRequest();

  }

  return (
<>
    <div><h2>Student: {student.firstname} {student.lastname}  Dashboard</h2></div>
    <div>
        <button onClick={()=>(navigate('/S_profile', {state:{student: location.state.student }}))}>Profile</button>
    </div>
    <button onClick={()=>(navigate('/S_login'))}>Logout</button>
    <div>
        {msg!='done' ? <div><h3>{msg}</h3></div> : 
        <div>
             {classdata?.map((c)=>{
            return (
                <StudentClass 
                key = {c._id}
                classid = {c._id}
                classname = {c.ClassName}
                description = {c.ClassDescription}
                code = {c.ClassCode}
                student = {student}
                />
            )
        })
        } 
            </div>
            }
       

    </div>
    
    <div>
        <button onClick={()=>setshow(!show)}>Join Class</button>
    </div>
    {show ? <div>
        <input type={'text'} name='code' placeholder='Enter Class Code'
         value={code}
         onChange={(c) => setcode(c.target.value)} required></input>
         <button onClick={JoinClass}>
            Verify Code
         </button>
    </div> : <></> }
    

    </>  )
}

export default StudentDashboard