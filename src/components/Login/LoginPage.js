import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@material-ui/icons';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement login logic using API endpoint
    try {
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Simulate successful login
        setIsLoggedIn(true);
        // Redirect to home page on successful login
        history.push('/');
      } else {
        console.error('Error signing in:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div style={{ margin: 'auto', width: '50%', textAlign: 'center', paddingTop: '50px' }}>
      <LockOutlined style={{ color: 'red', fontSize: 50 }} />
      <Typography variant="h5">Sign in</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </div>
      </form>
      <div style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
