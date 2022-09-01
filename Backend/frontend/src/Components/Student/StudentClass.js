import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StudentClass = (props) => {
    const class_id = props.classid;
    const s_id = props.student._id;
    const student = props.student
    const navigate = useNavigate();

  return (
  <>
    <div style={{border: "2px solid black", margin:'2%', cursor:"pointer"}}
     onClick={()=>(navigate('/S_assignments', {state:{class: class_id, student: student}}))}> 
    <div>Class Name : {props.classname}</div>
    <div>Class Description : {props.description}</div>
    <div>Class Code: {props.code}</div>
    </div>
  
    </>  )
}

export default StudentClass