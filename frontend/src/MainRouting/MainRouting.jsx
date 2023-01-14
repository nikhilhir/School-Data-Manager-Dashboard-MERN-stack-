import React from 'react'
import {Routes,Route} from "react-router-dom"
import Signup from '../Pages/Signup'
import Login from '../Pages/Login';
import Teacherdashboard from '../Pages/Teacherdashboard';
import Studentdashboard from '../Pages/Studentdashboard';

const MainRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Teacherdashboard />} />
      <Route path="/" element={<Studentdashboard />} />
    </Routes>
  );
}

export default MainRouting