import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/SignUp/SignupPage';
import AddProductsPage from './components/Products/AddProductsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to false
  const [isAdmin, setIsAdmin] = useState(false ); // Default to false

  return (
    <Router>
      <NavigationBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />
        {isAdmin && (
          <Route path="/add-products" element={<AddProductsPage />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
