import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Admin from './Components/Admin';
import PrivateRoute from './PrivateRoute';
import AddStudent from './Components/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-students" element={<PrivateRoute allowedRoles={['admin']}><AddStudent /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><Admin /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute allowedRoles={['admin', 'student']}><Home /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
