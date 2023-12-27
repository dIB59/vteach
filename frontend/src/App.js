import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import StudentHomePage from './components/StudentHomePage';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';


const App = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<RequireAuth allowedRoles={['student']}/>}>
          <Route path="/studenthomepage" element={<StudentHomePage />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    
  );
};

export default App;