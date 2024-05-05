import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';

const NavigationBar = ({ isLoggedIn }) => {
  const handleLogout = () => {
    // Implement logout functionality and redirect to home page
    // You can handle logout logic here
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}> 
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCart />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad Eshop
        </Typography>
        {isLoggedIn ? (
          <>
            <InputBase placeholder="Search…" style={{ color: 'white' }} />
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/add-products">Add Products</Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
