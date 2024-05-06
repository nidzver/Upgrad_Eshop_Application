import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, FormControl, Select, MenuItem, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    zipCode: ''
  });

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleAddressSelectChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleSaveAddress = () => {
    // Logic to save new address
  };

  const handleConfirmOrder = () => {
    // Logic to confirm order and redirect
    navigate('/products', { state: { message: 'Order placed successfully!' } });
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step><StepLabel>Select Address</StepLabel></Step>
        <Step><StepLabel>Confirm Order</StepLabel></Step>
      </Stepper>
      {activeStep === 0 && (
        <div>
          <FormControl>
            <Select value={selectedAddress} onChange={handleAddressSelectChange}>
              {/* Dropdown options for saved addresses */}
            </Select>
          </FormControl>
          <Typography variant="caption">- OR -</Typography>
          {/* Address form */}
          <Button onClick={handleSaveAddress}>Save Address</Button>
        </div>
      )}
      {activeStep === 1 && (
        <div>
          {/* Order details */}
          <Button onClick={handleConfirmOrder}>Confirm Order</Button>
        </div>
      )}
      <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
      <Button disabled={activeStep === 1} onClick={handleNext}>Next</Button>
    </div>
  );
};

export default CreateOrderPage;
