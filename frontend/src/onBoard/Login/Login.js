// Login.js
import React, { useState } from 'react';
import  "./Form.css";
import { userApi } from '../../connection/api/axiosInstance'; // Adjust the path based on your project structure

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      // Handle successful login response
      console.log('Login successful:', response);
    } catch (error) {
      // Handle login error
      alert('Login failed:', error);
    }
  };

  const login = async (formData)=>{
    // 

  }

  return (
    <div className='form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
