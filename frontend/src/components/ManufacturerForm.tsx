import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { manufacturerAPI } from '../services/api';

interface ManufacturerFormData {
  mfrName: string;
  mfrShortName: string;
  address?: string;
  city?: string;
  state?: string;
  pin?: string;
  cpName?: string;
  cpPhone?: string;
  email?: string;
}

const ManufacturerForm: React.FC = () => {
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManufacturerFormData>();

  const onSubmit = async (data: ManufacturerFormData) => {
    try {
      const payload = { ...data, createdBy: 'admin' }; // Add createdBy field
      await manufacturerAPI.create(payload);
      setAlert({ type: 'success', message: 'Manufacturer added successfully!' });
      reset();
      setTimeout(() => setAlert(null), 3000);
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.response?.data?.detail || 'Failed to add manufacturer',
      });
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Manufacturer
        </Typography>

        {alert && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="Manufacturer Name"
              {...register('mfrName', { required: 'Manufacturer name is required' })}
              error={!!errors.mfrName}
              helperText={errors.mfrName?.message}
            />
            <TextField
              label="Short Name"
              {...register('mfrShortName', {
                required: 'Short name is required',
                maxLength: { value: 3, message: 'Max 3 characters' },
              })}
              error={!!errors.mfrShortName}
              helperText={errors.mfrShortName?.message}
              inputProps={{ maxLength: 3 }}
              sx={{ width: { xs: '100%', sm: '200px' } }}
            />
          </Box>

          <TextField
            fullWidth
            label="Address"
            {...register('address')}
            multiline
            rows={2}
          />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="City"
              {...register('city')}
            />
            <TextField
              fullWidth
              label="State"
              {...register('state')}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="PIN Code"
              {...register('pin', {
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Invalid PIN code',
                },
              })}
              error={!!errors.pin}
              helperText={errors.pin?.message}
            />
            <TextField
              fullWidth
              label="Contact Person Name"
              {...register('cpName')}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="Contact Phone"
              {...register('cpPhone', {
                pattern: {
                  value: /^[+]?[0-9-() ]+$/,
                  message: 'Invalid phone number',
                },
              })}
              error={!!errors.cpPhone}
              helperText={errors.cpPhone?.message}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Add Manufacturer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ManufacturerForm;
