import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      const { success, user } = response.data;

      if (success) {
        console.log('Login successful');
        console.log('User details:', user);
        
        // Store user info in cookie with secure flag
        Cookies.set('userInfo', JSON.stringify(user), { secure: true });
        
        if (user.role === 'admin') {
          // Redirect to the admin page
          navigate('/admin');
        } else {
          // Redirect to the normal user page or perform other actions
          navigate('/'); // Replace with your desired route
        }
      } else {
        console.error('Login failed');
        // Handle login failure, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle error, e.g., display a generic error message to the user
    }
  };

  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
