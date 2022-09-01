import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StudentClassAssignments = (props) => {
    const class_id = props.classid;
    const assign_id = props.Assignid
    const navigate = useNavigate();
  return (
<>
    <div style={{border: "2px solid black", margin:'2%', cursor:"pointer"}}>
      
    <div>Assignment Name : {props.assignname}</div>
    <div>Deadline : {props.deadline}</div>
    <div>
      <button  onClick={()=>(navigate('/S_viewassign', {state:{p: props}}))}>View Assignment</button>
    </div>
    </div>
  
    </>  )
}

export default StudentClassAssignments