import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import OrganizationForm from './components/OrganizationForm';
import Dashboard from './pages/Dashboard';

function App() {
    const subdomain = window.location.hostname.split('.')[0];  
    console.log(window.location.hostname); 

    return (
        <Router>
            <Routes>
                {subdomain !== 'lvh'? (
                    <Route path="/" element={<Login />} />  
                ) : (
                    <Route path="/" element={<OrganizationForm />} />  
                )}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
