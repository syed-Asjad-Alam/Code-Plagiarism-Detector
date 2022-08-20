import React from 'react';
import {BrowserRouter as Router, Routes, Route, Redirect,} from "react-router-dom";
import Home from './Home';
import TeacherLogin from './Components/Teacher/TeacherLogin';
import TeacherSignup from './Components/Teacher/TeacherSignup';
import TeacherForgetPass from './Components/Teacher/TeacherForgetPass';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import TeacherClass from './Components/Teacher/TeacherClass';
import TeacherCreateClass from './Components/Teacher/TeacherCreateClass';
import TeacherAssignment from './Components/Teacher/TeacherAssignment';

const App = ()=> {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />  
      <Route exact path="/login" element={<TeacherLogin/>} />
      <Route exact path="/signup" element={<TeacherSignup/>} />
      <Route exact path="/forgetpass" element={<TeacherForgetPass/>} />
      <Route exact path="/dashboard" element={<TeacherDashboard/>} />
      <Route exact path="/createclass" element={<TeacherCreateClass/>} />
      <Route exact path="/assignments" element={<TeacherAssignment/>} />







      </Routes>
    </Router>
    </>
  );
}

export default App;
