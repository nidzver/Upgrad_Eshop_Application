import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Snackbar } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';

const ProductDetailsPage = ({ isLoggedIn, isAdmin }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const handleProductClick = (productId, isPlaceOrder) => {
    if (isPlaceOrder) {
      // Redirect to the Create Orders page
      navigate('/create-order');
    } else {
      // Navigate to the product details page with the specific product ID
      navigate(`/product/${productId}`);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setDeleteProductId(productId);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/products/${deleteProductId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted product from the list
        setProducts(products.filter(product => product.id !== deleteProductId));
        setSnackbarOpen(true);
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      // Close the confirmation dialog
      setDeleteProductId(null);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        <Card key={product.id} style={{ marginBottom: 20 }}>
          <CardContent onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h5">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>Price: ${product.price}</Typography>
          </CardContent>
          <CardActions>
            {isAdmin && (
              <>
                <Button startIcon={<Edit />} color="primary">Edit</Button>
                <Button startIcon={<Delete />} color="secondary" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}

      {/* Confirmation Dialog for Delete */}
      {deleteProductId && (
        <Snackbar
          open={true}
          onClose={handleSnackbarClose}
          message="Confirm deletion of a product!"
          action={
            <>
              <Button color="primary" size="small" onClick={handleConfirmDelete}>
                Ok
              </Button>
              <Button color="secondary" size="small" onClick={() => setDeleteProductId(null)}>
                Cancel
              </Button>
            </>
          }
        />
      )}

      {/* Snackbar for Product Deletion Success */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Product deletion successful"
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </div>
  );
};

export default ProductDetailsPage;
