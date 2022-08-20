import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TeacherClass from './TeacherClass';


const TeacherDashboard = () => {
const location = useLocation();
const [classdata, setclassdata ] = useState()
const [msg, setmsg] = useState('');
const navigate = useNavigate();
const teacher = location.state.teacher;
const t_id = teacher._id;


console.log('teacher : '+teacher)
console.log("cccc"+classdata)
console.log("t : "+t_id)


React.useEffect(()=>{
    
    const sendGetRequest = async () => {
        try {
            const res = await axios.get("http://localhost:4000/teacher/dashboard/"+t_id);
            console.log(res.data);
            setclassdata(res.data.class);
            setmsg(res.data.msg)
            //console.log(classdata)
            alert(res.data.msg)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    
    sendGetRequest();
}, []);
  return (
    <>
    <div>Teacher: {teacher.firstname + teacher.lastname}  Dashboard</div>
    <div>
        {msg!='done' ? <div>{msg}</div> : 
        <div>
             {classdata?.map((c)=>{
            return (
                <TeacherClass 
                key = {c._id}
                classid = {c._id}
                classname = {c.ClassName}
                description = {c.ClassDescription}
                code = {c.ClassCode}
                teacher = {teacher}
                />
            )
        })
        } 
            </div>
            }
       

    </div>
    <div>
        <button onClick={()=>(navigate('/createclass', {state: {teacher: teacher}}))}> Create Class</button>
    </div>

    </>
  )
}

export default TeacherDashboard