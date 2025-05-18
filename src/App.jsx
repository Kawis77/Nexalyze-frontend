import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import OrganizationForm from './components/OrganizationForm';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const subdomain = window.location.hostname.split('.')[0];  

    return (

        <Router>
            <Routes>
                {subdomain !== 'lvh'? (
                    <Route path="/" element={<Login />} />  
                ) : (
                    <Route path="/" element={<OrganizationForm />} />  
                )}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
