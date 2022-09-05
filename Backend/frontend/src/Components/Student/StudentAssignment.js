import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StudentClassAssignments from './StudentClassAssignments';

const StudentAssignment = () => {
    const location = useLocation();
    const [Assigndata, setAssingdata ] = useState()
    const [msg, setmsg] = useState('');
    const navigate = useNavigate();
    const c_id = location.state.class;
    const student = location.state.student;
    console.log("student: "+ student._id)

    React.useEffect(()=>{
    
        const sendGetRequest = async () => {
            try {
                const res = await axios.get("http://localhost:4000/student/dashboard/class/"+c_id);
                setAssingdata(res.data.Assignment);
                setmsg(res.data.msg)
                //alert(res.data.msg)
            } catch (err) {
                console.error(err);
            }
        };
        
        sendGetRequest();
    }, []);   

  return (
<>
    <div><h2>Class Assignments</h2> </div>
    <div>
        {msg!='done' ? <div>{msg}</div> : 
        <div>
             {Assigndata?.map((a)=>{
            return (
                <StudentClassAssignments
                key = {a._id}
                Assignid = {a._id}
                assignname = {a.AssignmentName}
                instruction = {a.Instructions}
                expect = {a.ExpectedOutput}
                classid = {a.ClassID}
                deadline = {a.Deadline}
                file = {a.AssignmentFile}
                Allowed = {a.AllowedCode}
                student = {student}
                />
            )
        })
        } 
            </div>
            }

    </div>

    </>  )
}

export default StudentAssignment