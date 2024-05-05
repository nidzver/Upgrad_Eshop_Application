import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, MenuItem, FormControl, Select } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';

const AddProductPage = ({ isLoggedIn, isAdmin }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default'); // Default sorting option
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product categories
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/products/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      } else {
        console.error('Failed to fetch categories:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = `/products?category=${selectedCategory}`;
      if (sortBy !== 'default') {
        url += `&sortBy=${sortBy}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    // Fetch products when selected category or sorting option changes
    fetchProducts();
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    // Redirect to login page if not logged in and trying to access protected routes
    if (!isLoggedIn && isAdmin) {
      navigate('/login');
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      {/* Product Category Tabs */}
      <ToggleButtonGroup value={selectedCategory} exclusive onChange={(event, newCategory) => setSelectedCategory(newCategory)}>
        {categories.map(category => (
          <ToggleButton key={category} value={category}>{category}</ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Sort By Dropdown */}
      <FormControl style={{ marginLeft: '20px' }}>
        <Select
          value={sortBy}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort By' }}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="price_high_to_low">Price High to Low</MenuItem>
          <MenuItem value="price_low_to_high">Price Low to High</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>

      {/* Product Cards */}
      {products.map(product => (
        <Card key={product.id}>
          <img src={product.image} alt={product.name} />
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>Price: ${product.price}</Typography>
          </CardContent>
          <CardActions>
            {isAdmin ? (
              <>
                <Button startIcon={<Edit />} color="primary">Edit</Button>
                <Button startIcon={<Delete />} color="secondary">Delete</Button>
              </>
            ) : (
              <Button color="primary">Buy</Button>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default AddProductPage;
