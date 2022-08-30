import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import FileViewer from 'react-file-viewer';
import DocViewer from "react-doc-viewer";





const AssignmentDescription = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //p is used for the props coming from classAssinment.js
    var A_id = location.state.p.Assignid;
    console.log(A_id)
    //var file = ('../../../../AssignmentsUpload/1661678370921-CV data.docx')

    // const docs = [
    //     //{ uri: "https://url-to-my-pdf.pdf" },
    //     { uri: require('../../../../AssignmentsUpload/1661678370921-CV data.docx') }, // Local File
    //   ];
  return (
    <>
    <div>Assignment Description</div>
    {/* <FileViewer
    fileType={'docx'}
    filePath = {file}
    ></FileViewer> */}
    {/* <DocViewer documents={docs} /> */}
    <div>Assignment Name : {location.state.p.assignname}</div>
    <br/>
    <div>Assignment Instructions : {location.state.p.instruction}</div>
    <br/>
    <div>Assignment Deadline : {location.state.p.deadline}</div>
    <br/>
    <div>Assignment Expected Output : {location.state.p.expect}</div>
    <br/>
    <div>Assignment Allowed Code File : {location.state.p.Allowed}</div>
    <br/>
    <div>Assignment File : {location.state.p.file}</div>
    <br/>
    <button>Edit Assignment</button>
    <br/>
    <button onClick={()=>alert(A_id )}>Delete Assignment</button>
    <br/>
    <button onClick={()=>alert('Submitted Assignment')}>View Submitted Assignment</button>
    </>

  )
}

export default AssignmentDescription