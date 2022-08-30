import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const TeacherClass = (props) => {
    const class_id = props.classid;
    const t_id = props.teacher._id;
    const teacher = props.teacher
    //console.log("t: "+ t_id + "c : "+ class_id)
    const navigate = useNavigate();

  return (
    <>
    <div style={{border: "2px solid black", margin:'2%', cursor:"pointer"}}
     onClick={()=>(navigate('/assignments', {state:{class: class_id}}))}>
      
    <div>Class Name : {props.classname}</div>
    <div>Class Description : {props.description}</div>
    <div>Class Code: {props.code}</div>
    <div>
      <button>Delete Class</button>
    </div>
    </div>
  
    </>
  )
}

export default TeacherClass