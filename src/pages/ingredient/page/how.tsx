import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { makeStyles, createStyles } from '@mui/styles';



const steps = [
    'Select Animal Type', 
    'Select Class', 
    'Type of Diet', 
    'Number of Ingredient to Use', 
    'Select Ingredient and Available Quantity', 
    'Input Target Quantity'
];



const StepperFn = () => {

  return (
    <Box sx={{ width: '100%', marginTop:15 }}>
      <Stepper activeStep={6} alternativeLabel>
        {steps.map((label) => (
          <Step key={label} sx={{ fontSize: 30 }} style={{ color: '#228B22' }}>
            <StepLabel >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StepperFn;
