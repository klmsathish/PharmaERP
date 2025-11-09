import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Fade,
} from '@mui/material';
import {
  Save,
  Cancel,
  ArrowBack,
  LocalPharmacy,
  AttachMoney,
  Category,
  Business,
  CheckCircle,
  Warning,
  MedicalServices,
  Label,
  CurrencyRupee,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  productAPI,
  manufacturerAPI,
  productTypeAPI,
  taxAPI,
  scheduleTypeAPI,
} from '../services/api';

interface ProductFormData {
  prodName: string;
  hsnCode: string;
  packing: string;
  purUnit: string;
  salUnit: string;
  prodTypeCode: number;
  mfrCode: number;
  mrp: number;
  purTaxCode: number;
  salTaxCode: number;
  schTypeCode: number;
  isActive: boolean;
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [taxes, setTaxes] = useState<any[]>([]);
  const [scheduleTypes, setScheduleTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProductFormData>({
    defaultValues: {
      prodName: '',
      hsnCode: '',
      packing: '',
      purUnit: '',
      salUnit: '',
      prodTypeCode: 0,
      mfrCode: 0,
      mrp: 0,
      purTaxCode: 0,
      salTaxCode: 0,
      schTypeCode: 0,
      isActive: true,
    },
  });

  const formValues = watch();

  useEffect(() => {
    loadFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadFormData = async () => {
    try {
      const [mfr, types, tax, schedule] = await Promise.all([
        manufacturerAPI.getAll(),
        productTypeAPI.getAll(),
        taxAPI.getAll(),
        scheduleTypeAPI.getAll(),
      ]);
      setManufacturers(mfr.data || []);
      setProductTypes(types.data || []);
      setTaxes(tax.data || []);
      setScheduleTypes(schedule.data || []);
    } catch (error) {
      console.error('Failed to load form data:', error);
      setError('Failed to load form data');
    }
  };

  const loadProduct = async () => {
    try {
      const response = await productAPI.getById(Number(id));
      const product = response.data;
      reset({
        ...product,
        isActive: product.isActive ?? true,
      });
    } catch (error) {
      console.error('Failed to load product:', error);
      setError('Failed to load product');
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        createdBy: 'admin',
        mrp: parseFloat(data.mrp.toString()),
      };
      
      if (isEditMode) {
        await productAPI.update(Number(id), payload);
      } else {
        await productAPI.create(payload);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (error: any) {
      console.error('Failed to save product:', error);
      setError(error.response?.data?.detail || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    'Basic Information',
    'Classification & Pricing',
    'Tax Configuration',
    'Review & Submit',
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MedicalServices sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Product Details</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Controller
                  name="prodName"
                  control={control}
                  rules={{ required: 'Product name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Product Name"
                      fullWidth
                      required
                      error={!!errors.prodName}
                      helperText={errors.prodName?.message}
                      placeholder="e.g., Paracetamol 500mg"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPharmacy color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="hsnCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="HSN Code"
                      fullWidth
                      placeholder="e.g., 3004"
                      helperText="Harmonized System Nomenclature code for tax purposes"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Label color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mt: 2 }}>
                <Controller
                  name="packing"
                  control={control}
                  rules={{ required: 'Packing is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Packing Information"
                      fullWidth
                      required
                      error={!!errors.packing}
                      helperText={errors.packing?.message || "e.g., Strip of 10 tablets"}
                      placeholder="Strip of 10 tablets"
                    />
                  )}
                />
                <Controller
                  name="purUnit"
                  control={control}
                  rules={{ required: 'Purchase unit is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Purchase Unit"
                      fullWidth
                      required
                      error={!!errors.purUnit}
                      helperText={errors.purUnit?.message || "Unit for purchasing from supplier"}
                      placeholder="e.g., Box, Carton"
                    />
                  )}
                />
                <Controller
                  name="salUnit"
                  control={control}
                  rules={{ required: 'Sale unit is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Sale Unit"
                      fullWidth
                      required
                      error={!!errors.salUnit}
                      helperText={errors.salUnit?.message || "Unit for selling to customer"}
                      placeholder="e.g., Strip, Piece"
                    />
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Category sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">Classification & Pricing</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Controller
                  name="prodTypeCode"
                  control={control}
                  rules={{ 
                    required: 'Product type is required', 
                    min: { value: 1, message: 'Please select a product type' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Product Type"
                      fullWidth
                      required
                      error={!!errors.prodTypeCode}
                      helperText={errors.prodTypeCode?.message || "Select the type of product"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Category color="action" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value={0}>-- Select Product Type --</MenuItem>
                      {productTypes.map((type) => (
                        <MenuItem key={type.prodTypeCode} value={type.prodTypeCode}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <span>{type.prodTypeName}</span>
                            {type.prodTypeName === 'Tablet' && <Chip size="small" label="Most Common" color="info" />}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="mfrCode"
                  control={control}
                  rules={{ 
                    required: 'Manufacturer is required', 
                    min: { value: 1, message: 'Please select a manufacturer' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Manufacturer"
                      fullWidth
                      required
                      error={!!errors.mfrCode}
                      helperText={errors.mfrCode?.message || "Select the manufacturer"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business color="action" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      <MenuItem value={0}>-- Select Manufacturer --</MenuItem>
                      {manufacturers.map((mfr) => (
                        <MenuItem key={mfr.mfrCode} value={mfr.mfrCode}>
                          {mfr.mfrName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="schTypeCode"
                  control={control}
                  rules={{ 
                    required: 'Schedule type is required', 
                    min: { value: 1, message: 'Please select a schedule type' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Schedule Type"
                      fullWidth
                      required
                      error={!!errors.schTypeCode}
                      helperText={errors.schTypeCode?.message || "Drug schedule classification"}
                    >
                      <MenuItem value={0}>-- Select Schedule Type --</MenuItem>
                      {scheduleTypes.map((sch) => (
                        <MenuItem key={sch.schTypeCode} value={sch.schTypeCode}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <span>{sch.schTypeName}</span>
                            {sch.schTypeName === 'OTC' && <Chip size="small" label="Over The Counter" color="success" />}
                            {sch.schTypeName === 'H' && <Chip size="small" label="Prescription" color="warning" />}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="mrp"
                  control={control}
                  rules={{ required: 'MRP is required', min: { value: 0.01, message: 'MRP must be greater than 0' } }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="MRP (Maximum Retail Price)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.mrp}
                      helperText={errors.mrp?.message || "Maximum retail price in ₹"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyRupee color="action" />
                          </InputAdornment>
                        ),
                        inputProps: { step: 0.01, min: 0 }
                      }}
                      placeholder="0.00"
                    />
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Tax Configuration</Typography>
              </Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Select appropriate GST rates for purchase and sale. The system will automatically calculate CGST and SGST components.
                </Typography>
              </Alert>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Controller
                  name="purTaxCode"
                  control={control}
                  rules={{ 
                    required: 'Purchase tax is required', 
                    min: { value: 1, message: 'Please select a purchase tax' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Purchase Tax"
                      fullWidth
                      required
                      error={!!errors.purTaxCode}
                      helperText={errors.purTaxCode?.message || "Tax rate applicable on purchase"}
                    >
                      <MenuItem value={0}>-- Select Purchase Tax --</MenuItem>
                      {taxes.map((tax) => (
                        <MenuItem key={tax.taxCode} value={tax.taxCode}>
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body1">{tax.taxDesc}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Total GST: {tax.cgst + tax.sgst}% (CGST: {tax.cgst}% + SGST: {tax.sgst}%)
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="salTaxCode"
                  control={control}
                  rules={{ 
                    required: 'Sale tax is required', 
                    min: { value: 1, message: 'Please select a sale tax' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Sale Tax"
                      fullWidth
                      required
                      error={!!errors.salTaxCode}
                      helperText={errors.salTaxCode?.message || "Tax rate applicable on sale"}
                    >
                      <MenuItem value={0}>-- Select Sale Tax --</MenuItem>
                      {taxes.map((tax) => (
                        <MenuItem key={tax.taxCode} value={tax.taxCode}>
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body1">{tax.taxDesc}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Total GST: {tax.cgst + tax.sgst}% (CGST: {tax.cgst}% + SGST: {tax.sgst}%)
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography>Product is Active</Typography>
                          {field.value ? (
                            <CheckCircle sx={{ ml: 1, color: 'success.main', fontSize: 20 }} />
                          ) : (
                            <Warning sx={{ ml: 1, color: 'warning.main', fontSize: 20 }} />
                          )}
                        </Box>
                      }
                    />
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        );

      case 3:
        const getSelectedName = (code: number, list: any[], key: string) => {
          const item = list.find(item => item[key] === code);
          return item ? item[key.replace('Code', 'Name')] : 'Not selected';
        };

        return (
          <Card sx={{ backgroundColor: '#f0f7ff', border: '1px solid #1976d2' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main', fontSize: 32 }} />
                <Typography variant="h6">Review Product Information</Typography>
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Product Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{formValues.prodName || 'Not provided'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">HSN Code</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{formValues.hsnCode || 'Not provided'}</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Packing</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{formValues.packing || 'Not provided'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Purchase Unit</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{formValues.purUnit || 'Not provided'}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Sale Unit</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{formValues.salUnit || 'Not provided'}</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Product Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {getSelectedName(formValues.prodTypeCode, productTypes, 'prodTypeCode')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Manufacturer</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {getSelectedName(formValues.mfrCode, manufacturers, 'mfrCode')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Schedule Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {getSelectedName(formValues.schTypeCode, scheduleTypes, 'schTypeCode')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">MRP</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    ₹{formValues.mrp || '0.00'}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Purchase Tax</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {taxes.find(t => t.taxCode === formValues.purTaxCode)?.taxDesc || 'Not selected'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Sale Tax</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {taxes.find(t => t.taxCode === formValues.salTaxCode)?.taxDesc || 'Not selected'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">Status</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip 
                    label={formValues.isActive ? 'Active' : 'Inactive'} 
                    color={formValues.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        );

      default:
        return 'Unknown step';
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate('/products')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <LocalPharmacy sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isEditMode ? 'Update product information' : 'Fill in the details to create a new product'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fade in key={activeStep}>
            <Box sx={{ mb: 3 }}>
              {getStepContent(activeStep)}
            </Box>
          </Fade>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => navigate('/products')}
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    minWidth: 120,
                  }}
                >
                  {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next Step
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant="filled">
          Product {isEditMode ? 'updated' : 'created'} successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductForm;
