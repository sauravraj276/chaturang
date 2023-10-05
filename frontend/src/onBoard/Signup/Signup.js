// Signup.js
import React, { useState } from 'react';
import "../Login/Form.css";
import userApi from '../../connection/api/axiosInstance'; // Adjust the path based on your project structure
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setconfirmPassword] = useState('');

    const [validationErrorMessages, setValidationErrorMessages] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset error message
        setValidationErrorMessages('');
        if (formData.password != confirmPassword) {
            setValidationErrorMessages('Password don\'t match');
        } else {
            try {
                const response = await userApi.post('/signup', formData);
                if (response.data.data.token) {
                    localStorage.setItem('token', response.data.data.token);
                    // Redirect to the profile page or do other necessary actions
                } else {
                    setValidationErrorMessages('Server Error');
                }
            } catch (error) {
                // To do 
                // Handle all response and show appropriate error messages
                setValidationErrorMessages('User already exists');
            }
        }

    }
    return (
        <div className='form'>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        required
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        required
                        type="password"
                        name="password"
                        minLength="8"
                        maxLength="15" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        minLength="8"
                        maxLength="15" 
                        onChange={e => setconfirmPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Signup</button>
            </form>

            <p style={{ color: '#fc475f' }}>{validationErrorMessages}</p>
        </div>
    );
}
