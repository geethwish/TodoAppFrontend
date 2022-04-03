import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import './assets/scss/index.scss';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';




function App() {
    return (
        <>
            <Router>

                <div>

                    <Header />

                    <Routes>

                        <Route path="/" element={<Dashboard />} />

                        <Route path="/login" element={<Login />} />

                        <Route path="/register" element={<Register />} />

                    </Routes>

                </div>

            </Router>

            <ToastContainer />

        </>

    );
}

export default App;
