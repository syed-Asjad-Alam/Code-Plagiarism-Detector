import React from 'react';
import {BrowserRouter as Router, Routes, Route, Redirect,} from "react-router-dom";
//home page cpc
import Home from './Home';
//teacher file imports
import TeacherLogin from './Components/Teacher/TeacherLogin';
import TeacherSignup from './Components/Teacher/TeacherSignup';
import TeacherForgetPass from './Components/Teacher/TeacherForgetPass';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import TeacherCreateClass from './Components/Teacher/TeacherCreateClass';
import TeacherAssignment from './Components/Teacher/TeacherAssignment';
import TeacherCreateAssign from './Components/Teacher/TeacherCreateAssign';
import TeacherProfile from './Components/Teacher/TeacherProfile';
import TeacherUpdateProfile from './Components/Teacher/TeacherUpdateProfile';
import AssignmentDescription from './Components/Teacher/AssignmentDescription';
//student file imports
import StudentLogin from './Components/Student/StudentLogin';
import StudentSignup from './Components/Student/StudentSignup'
import StudentForgetPass from './Components/Student/StudentForgetPass'
import StudentDashboard from './Components/Student/StudentDashboard';
import StudentAssignment from './Components/Student/StudentAssignment';
import StudentProfile from './Components/Student/StudentProfile';
import StudentUpdateProfile from './Components/Student/StudentUpdateProfile';
import StudentAssignDescription from './Components/Student/StudentAssignDescription';



const App = ()=> {
  return (
    <>
    <Router>
      <Routes>
      {/* Home route  */}
      <Route exact path="/" element={<Home/>} /> 
      {/* Teacher routes  */}
      <Route exact path="/login" element={<TeacherLogin/>} />
      <Route exact path="/signup" element={<TeacherSignup/>} />
      <Route exact path="/forgetpass" element={<TeacherForgetPass/>} />
      <Route exact path="/dashboard" element={<TeacherDashboard/>} />
      <Route exact path="/createclass" element={<TeacherCreateClass/>} />
      <Route exact path="/assignments" element={<TeacherAssignment/>} />
      <Route exact path="/createassign" element={<TeacherCreateAssign/>} />
      <Route exact path="/viewassign" element={<AssignmentDescription/>} />      
      <Route exact path="/profile" element={<TeacherProfile/>} />
      <Route exact path="/update" element={<TeacherUpdateProfile/>} />
      
      {/* Student routes with capital S and _ at start */}
      <Route exact path="/S_login" element={<StudentLogin/>} />
      <Route exact path="/S_signup" element={<StudentSignup/>} />
      <Route exact path="/S_forgetpass" element={<StudentForgetPass/>} />
      <Route exact path="/S_dashboard" element={<StudentDashboard/>} />
      <Route exact path="/S_assignments" element={<StudentAssignment/>} />
      <Route exact path="/S_viewassign" element={<StudentAssignDescription/>} />      
      <Route exact path="/S_profile" element={<StudentProfile/>} />
      <Route exact path="/S_update" element={<StudentUpdateProfile/>} />



      










      </Routes>
    </Router>
    </>
  );
}

export default App;
