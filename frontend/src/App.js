import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage.jsx';
import Login from './pages/Login.jsx';
import "./index.js";
import Dashboardadmin from './pages/Dashboardadmin.jsx';
import Listrumah from './pages/Listrumah.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Forgotpassword from './pages/Forgotpassword.jsx';
import Dashboarduser from './pages/DashboardUser.jsx';
import Homepage from './pages/Homepage.jsx';
import DashboardTransaction from './pages/DashboardTransaction.jsx';
import DashboardUlasan from './pages/DashboardUlasan.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/listrumah" element={<Listrumah />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboardadmin />} />
        <Route path="/user" element={<Dashboarduser />} />
        <Route path="/transaction" element={<DashboardTransaction />} />
        <Route path="/ulasan" element={<DashboardUlasan />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
      </Routes>
    </Router>
  );
}

export default App;
