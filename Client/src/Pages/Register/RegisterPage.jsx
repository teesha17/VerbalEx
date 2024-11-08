import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', { 
                username, 
                name, 
                email, 
                password 
            });
            setMessage("Registration successful!");
            navigate('/dashboard');
        } catch (error) {
            // Extract and set error messages correctly
            const errorMessage = error.response?.data?.errors?.[0]?.msg || "Registration failed, please try again.";
            setMessage(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleSignup}>
                <input 
                    className="input-field"
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    className="input-field"
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    className="input-field"
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    className="input-field"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button className="submit-btn" type="submit">Signup</button>
                <Link to='/login'>Already a user?</Link>
            </form>

            {message && <p className={message === "Registration successful!" ? "success-message" : "error-message"}>{message}</p>}
        </div>
    );
};

export default RegisterPage;
