import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';

const AddProductPage = ({ isLoggedIn, isAdmin }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [products, setProducts] = useState([]);
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
      const response = await fetch(`/products?category=${selectedCategory}`);
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
    // Fetch products when selected category changes
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    // Redirect to login page if not logged in and trying to access protected routes
    if (!isLoggedIn && isAdmin) {
      navigate('/login');
    }
  }, [isLoggedIn, isAdmin, navigate]);

  return (
    <div>
      {/* Product Category Tabs */}
      <ToggleButtonGroup value={selectedCategory} exclusive onChange={(event, newCategory) => setSelectedCategory(newCategory)}>
        {categories.map(category => (
          <ToggleButton key={category} value={category}>{category}</ToggleButton>
        ))}
      </ToggleButtonGroup>

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
