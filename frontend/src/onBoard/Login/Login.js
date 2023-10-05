// Login.js
import React, { useState } from 'react';
import "./Form.css";
import  userApi  from '../../connection/api/axiosInstance'; // Adjust the path based on your project structure
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrorMessages,setValidationErrorMessages]=useState()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Reset error message 
    setValidationErrorMessages('');
  
    try {
      const response = await userApi.post('/login', formData);
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        
      } else {
        setValidationErrorMessages('Server Error');
      }
    } catch (error) {
      // To do 
      // Handle all response and show appropriate error messages
      setValidationErrorMessages('Wrong Credentials');
    }
  };
  

  return (
    <div className='form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      
      <p style={{ color: '#fc475f' }}>{validationErrorMessages}</p>
    </div>
  );
}
