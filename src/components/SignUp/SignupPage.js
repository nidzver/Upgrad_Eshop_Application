import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@material-ui/icons';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password, contactNumber }),
      });
      if (response.ok) {
        // Redirect to home page on successful signup
        history.push('/');
      } else {
        console.error('Error signing up:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={{ margin: 'auto', width: '50%', textAlign: 'center', paddingTop: '50px' }}>
      <LockOutlined style={{ color: 'red', fontSize: 50 }} />
      <Typography variant="h5">Sign up</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">Signup</Button>
        </div>
      </form>
      <div style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default SignupPage;
