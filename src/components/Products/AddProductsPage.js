import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const AddProductPage = ({ isLoggedIn, isAdmin, productToModify }) => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to add or modify the product
    // Assuming successful addition/modification for demonstration
    // You should implement actual addition/modification logic here
    if (productToModify) {
      console.log('Product modified successfully:', { name, category, manufacturer, availableItems, price, imageUrl, description });
    } else {
      console.log('Product added successfully:', { name, category, manufacturer, availableItems, price, imageUrl, description });
    }
    // Redirect to product details page or any other desired page after addition/modification
    navigate('/products');
  };

  return (
    <div style={{ margin: 'auto', width: '50%', textAlign: 'center', paddingTop: '50px' }}>
      <Typography variant="h5">{productToModify ? 'Modify Product' : 'Add Product'}</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <Box display="flex" flexDirection="column">
          {/* Form fields */}
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required variant="outlined" margin="normal" />
          <div><TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required variant="outlined" margin="normal" /></div>
          <div><TextField label="Available Items" value={availableItems} onChange={(e) => setAvailableItems(e.target.value)} required variant="outlined" margin="normal" /></div>
          <div><TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} required variant="outlined" margin="normal" /></div>
         <div> <TextField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} variant="outlined" margin="normal" /></div>
          <div><TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)}  variant="outlined" margin="normal" /></div>
          {/* Submit button */}
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>{productToModify ? 'Modify Product' : 'Save Product'}</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddProductPage;
