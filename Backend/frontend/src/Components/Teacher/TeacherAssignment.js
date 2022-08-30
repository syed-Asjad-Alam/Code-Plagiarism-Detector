import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ClassAssingments from './ClassAssingments';

const TeacherAssignment = () => {
    const location = useLocation();
    const [Assigndata, setAssingdata ] = useState()
    const [msg, setmsg] = useState('');
    const navigate = useNavigate();
    const c_id = location.state.class;
    //console.log(c_id)

    React.useEffect(()=>{
    
        const sendGetRequest = async () => {
            try {
                const res = await axios.get("http://localhost:4000/teacher/dashboard/class/"+c_id);
                //console.log(res.data);
                setAssingdata(res.data.Assignment);
                setmsg(res.data.msg)
                //console.log("Assignment data"+res.data.Assignment.ExpectedOutput)
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
    <div>Class Assignments </div>
    <div>
        {msg!='done' ? <div>{msg}</div> : 
        <div>
             {Assigndata?.map((a)=>{
            return (
                <ClassAssingments
                key = {a._id}
                Assignid = {a._id}
                assignname = {a.AssignmentName}
                instruction = {a.Instructions}
                expect = {a.ExpectedOutput}
                classid = {a.ClassID}
                deadline = {a.Deadline}
                file = {a.AssignmentFile}
                Allowed = {a.AllowedCode}
                />
            )
        })
        } 
            </div>
            }
       

    </div>
    <div>
        <button onClick={()=>(navigate('/createassign', {state: {class: c_id}}))}> Create New Assignment</button>
    </div>

    </>
  )
}

export default TeacherAssignment