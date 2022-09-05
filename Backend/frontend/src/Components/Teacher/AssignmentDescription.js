import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import FileViewer from 'react-file-viewer';
import DocViewer from "react-doc-viewer";
import'../../App.css'




const AssignmentDescription = () => {
  const [show, setshow] = useState(false)
  const [submitdata, setsubmitdata ] = useState([])
  const [msg, setmsg] = useState('')
  const [datachk, setdatachk] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    //p is used for the props coming from classAssinment.js
    var A_id = location.state.p.Assignid;
    // console.log(A_id)
    //var file = ('../../../../AssignmentsUpload/1661678370921-CV data.docx')

    // const docs = [
    //     //{ uri: "https://url-to-my-pdf.pdf" },
    //     { uri: require('../../../../AssignmentsUpload/1661678370921-CV data.docx') }, // Local File
    //   ];
    

    //sendinf request to get submitted assignment data
    const viewsubmit = () =>{
      //console.log('in submit: '+ A_id)

      const sendGetRequest = async () => {
        try {
            const res = await axios.get("http://localhost:4000/teacher/dashboard/class/viewsubmit/"+A_id);
            setsubmitdata(res.data.submit);
             setmsg(res.data.msg)
             
             if(res.data.msg==='done'){
              setdatachk(true)
             }
             if(res.data.msg!=='done'){
              setdatachk(false)
             }
        } catch (err) {
            console.error(err);
        }
    };
    
    sendGetRequest();

    }
  return (
    <>
    <div><h2>Assignment Description</h2></div>
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
    <br></br>
    <button onClick={()=>{setshow(!show); viewsubmit();}}>{show ? 'Hide Submitted Assignment' : 'View Submitted Assignment'}</button>

{/* changing view on basis on show state, then data is chk, if data recieved 
then display assignments
if no assignments then show the message, ternary expression */}

    {show ? <> 
    {datachk ? 
    <div>
      <table>
        <tbody>
        <tr>
          <th>Student Name</th>
          <th>Submitted Time</th>
          <th>Submitted File</th>
          <th>Action</th>
        </tr>
        {submitdata?.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.StudentName}</td>
              <td>{val.SubmissionTime}</td>
              <td>{val.SubmittedFile}</td>
              <td><button  onClick={()=>alert('View')}>View Assignment</button>
              <button onClick={()=>alert(val._id)}>Check Assignment</button></td>
              
            </tr>
           
            
          )
          
        })}
        </tbody>
      </table>
    </div> 
    :
     <div><h3>{msg}</h3></div>}</> 
     : <> </>
     }

    </>

  )
}

export default AssignmentDescription