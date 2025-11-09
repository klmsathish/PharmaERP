import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  Stack,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalPharmacy,
  Business,
  Menu as MenuIcon,
  Add,
  Category,
  Receipt,
  Assessment,
  ChevronLeft,
} from '@mui/icons-material';
import Dashboard from './components/Dashboard';
import ManufacturerForm from './components/ManufacturerForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { isElectron, isTauri } from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff6f00',
      light: '#ffa040',
      dark: '#c43e00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

const drawerWidth = 280;

function AppContent() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/',
      color: '#2196f3'
    },
    { 
      title: 'Products', 
      icon: <LocalPharmacy />, 
      path: '/products',
      color: '#4caf50',
      subItems: [
        { title: 'View All Products', path: '/products' },
        { title: 'Add New Product', path: '/product/new' },
      ]
    },
    { 
      title: 'Manufacturers', 
      icon: <Business />, 
      path: '/manufacturer',
      color: '#ff9800',
      subItems: [
        { title: 'Add Manufacturer', path: '/manufacturer' },
      ]
    },
    { 
      title: 'Categories', 
      icon: <Category />, 
      path: '#',
      color: '#9c27b0',
      disabled: true
    },
    { 
      title: 'Invoices', 
      icon: <Receipt />, 
      path: '#',
      color: '#f44336',
      disabled: true
    },
    { 
      title: 'Reports', 
      icon: <Assessment />, 
      path: '#',
      color: '#00bcd4',
      disabled: true
    },
  ];

  const drawer = (
    <Box>
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalPharmacy sx={{ mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Pharma ERP
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Management System
            </Typography>
          </Box>
        </Box>
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <ChevronLeft />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.title}>
            <ListItem 
              disablePadding 
              sx={{ mb: 1 }}
            >
              <ListItemButton
                onClick={() => !item.disabled && navigate(item.path)}
                disabled={item.disabled}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: item.disabled ? 'transparent' : `${item.color}15`,
                  },
                  '&.Mui-selected': {
                    backgroundColor: `${item.color}20`,
                  },
                }}
              >
                <ListItemIcon sx={{ color: item.disabled ? 'grey.400' : item.color, minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: item.disabled ? 'text.disabled' : 'text.primary'
                  }}
                />
                {item.disabled && (
                  <Chip 
                    label="Soon" 
                    size="small" 
                    sx={{ 
                      height: 20, 
                      fontSize: '0.7rem',
                      backgroundColor: 'grey.300'
                    }} 
                  />
                )}
              </ListItemButton>
            </ListItem>
            {item.subItems && !item.disabled && (
              <Box sx={{ ml: 4, mb: 1 }}>
                {item.subItems.map((subItem) => (
                  <ListItemButton
                    key={subItem.title}
                    onClick={() => navigate(subItem.path)}
                    sx={{
                      borderRadius: 1,
                      py: 0.5,
                      '&:hover': {
                        backgroundColor: `${item.color}10`,
                      },
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {subItem.title}
                    </Typography>
                  </ListItemButton>
                ))}
              </Box>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Stack spacing={1}>
          <Chip 
            label={`Platform: ${isElectron() ? 'Electron' : isTauri() ? 'Tauri' : 'Web'}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ justifyContent: 'center' }}
          />
          <Typography variant="caption" color="text.secondary" align="center">
            Version 1.0.0
          </Typography>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Pharmacy ERP System
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => navigate('/product/new')}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Quick Add Product
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manufacturer" element={<ManufacturerForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/new" element={<ProductForm />} />
            <Route path="/product/edit/:id" element={<ProductForm />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
