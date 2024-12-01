import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './login';
import Home from './Home';
import Register from './register';

function App() {
  const isLogin = !!localStorage.getItem("token")
  return (
    <Router>
      <Routes>
        <Route path="/home" element={isLogin ? <Home /> : <Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to={isLogin ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
