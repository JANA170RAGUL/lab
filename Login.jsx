import React from 'react';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import { useNavigate } from 'react-router-dom';
import authService from '../auth/authService';
import ideaLabLogo from '../assets/logos/idealab.jpeg';
import veltechLogo from '../assets/logos/veltech.png';
import aicteLogo from '../assets/logos/aicte.jpeg';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSelect = (role) => {
        authService.setRole(role);
        navigate(`/${role}`);
    };

    return (
        <div className="login-container">
            <AnimatedBackground />

            <div className="header-container">
                <img src={veltechLogo} alt="Vel Tech" className="header-logo-left" />
                <h2 className="college-name">
                    Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College
                </h2>
                <div className="header-logos-right">
                    <img src={aicteLogo} alt="AICTE" className="header-logo-right" />
                    <img src={ideaLabLogo} alt="AICTE IDEA Lab" className="header-logo-right" />
                </div>
            </div>


            <div className="login-card">
                <div className="login-content">
                    <div className="login-header">
                        <h1 className="login-title">AICTE IDEA Lab</h1>
                        <p className="login-subtitle">
                            Welcome back. Please select your portal to continue.
                        </p>
                    </div>

                    <div className="login-actions">
                        <button
                            onClick={() => handleSelect('admin')}
                            className="login-button login-button-primary"
                        >
                            Admin Portal
                        </button>

                        <button
                            onClick={() => handleSelect('student')}
                            className="login-button login-button-secondary"
                        >
                            Student Portal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
