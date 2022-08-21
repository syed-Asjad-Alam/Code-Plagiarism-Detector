import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ClassAssingments = (props) => {
    const class_id = props.classid;
    const assign_id = props.Assignid
    console.log("c: "+ class_id + " a : "+ assign_id)
    const navigate = useNavigate();
  return (
    <>
    <div style={{border: "2px solid black", margin:'2%', cursor:"pointer"}}
     onClick={()=>(alert('new'))}>
      
    <div>Assignment Name : {props.assignname}</div>
    <div>Deadline : {props.deadline}</div>
    <div>
      <button>View Assignment</button>
    </div>
    </div>
  
    </>
  )
}

export default ClassAssingments