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
    console.log("props : "+props.expect)
    // const p = props;
    // console.log('p: '+p.Assignid);
  return (
    <>
    <div style={{border: "2px solid blue", margin:'2%', cursor:"pointer"}}>
      
    <div>Assignment Name : {props.assignname}</div>
    <div>Deadline : {props.deadline}</div>
    <div>
      <button  onClick={()=>(navigate('/viewassign', {state:{p: props}}))}>View Assignment</button>
    </div>
    </div>
  
    </>
  )
}

export default ClassAssingments