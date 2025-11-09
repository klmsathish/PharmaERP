import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Inventory,
  LocalPharmacy,
  Category,
  Business,
  Receipt,
  Schedule,
  Science,
  Dashboard as DashboardIcon,
  Add,
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  Assessment,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { productAPI, manufacturerAPI, productTypeAPI, productCategoryAPI } from '../services/api';

interface DashboardStats {
  totalProducts: number;
  totalManufacturers: number;
  totalCategories: number;
  totalProductTypes: number;
  activeProducts: number;
  inactiveProducts: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalManufacturers: 0,
    totalCategories: 0,
    totalProductTypes: 0,
    activeProducts: 0,
    inactiveProducts: 0,
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [products, manufacturers, categories, types] = await Promise.all([
        productAPI.getAll(),
        manufacturerAPI.getAll(),
        productCategoryAPI.getAll(),
        productTypeAPI.getAll(),
      ]);

      const productData = products.data || [];
      const activeProds = productData.filter((p: any) => p.isActive);
      const inactiveProds = productData.filter((p: any) => !p.isActive);

      setStats({
        totalProducts: productData.length,
        totalManufacturers: manufacturers.data?.length || 0,
        totalCategories: categories.data?.length || 0,
        totalProductTypes: types.data?.length || 0,
        activeProducts: activeProds.length,
        inactiveProducts: inactiveProds.length,
      });

      setRecentProducts(productData.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Inventory fontSize="large" />,
      color: '#1976d2',
      trend: '+12%',
      link: '/products',
    },
    {
      title: 'Active Products',
      value: stats.activeProducts,
      icon: <LocalPharmacy fontSize="large" />,
      color: '#388e3c',
      trend: '+5%',
      link: '/products',
    },
    {
      title: 'Manufacturers',
      value: stats.totalManufacturers,
      icon: <Business fontSize="large" />,
      color: '#f57c00',
      trend: '+8%',
      link: '/manufacturers',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: <Category fontSize="large" />,
      color: '#7b1fa2',
      trend: '+3%',
      link: '/categories',
    },
  ];

  const quickActions = [
    {
      title: 'Add Product',
      icon: <Inventory />,
      color: '#1976d2',
      link: '/product',
      description: 'Add new medicine to inventory',
    },
    {
      title: 'Add Manufacturer',
      icon: <Business />,
      color: '#388e3c',
      link: '/manufacturer',
      description: 'Register new manufacturer',
    },
    {
      title: 'Product Types',
      icon: <Category />,
      color: '#f57c00',
      link: '/product-types',
      description: 'Manage product types',
    },
    {
      title: 'Tax Configuration',
      icon: <Receipt />,
      color: '#d32f2f',
      link: '/taxes',
      description: 'Configure GST rates',
    },
    {
      title: 'Schedule Types',
      icon: <Schedule />,
      color: '#7b1fa2',
      link: '/schedule-types',
      description: 'Manage drug schedules',
    },
    {
      title: 'Generic Medicines',
      icon: <Science />,
      color: '#00796b',
      link: '/generics',
      description: 'Manage generic drugs',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
          <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Pharmacy Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Welcome back! Here's what's happening in your pharmacy today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {statsCards.map((card, index) => (
          <Box key={index}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}05 100%)`,
                border: `1px solid ${card.color}20`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: card.color }}>
                      {card.value}
                    </Typography>
                    <Chip
                      label={card.trend}
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: `${card.color}20`,
                        color: card.color,
                        fontWeight: 600,
                      }}
                      icon={<TrendingUp style={{ color: card.color }} />}
                    />
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: `${card.color}20`,
                      color: card.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Quick Actions and Recent Products */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Quick Actions */}
        <Box>
          <Paper sx={{ p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {quickActions.map((action, index) => (
                <Box key={index}>
                  <Card
                    component={Link}
                    to={action.link}
                    sx={{
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                        background: `linear-gradient(135deg, ${action.color}05 0%, #fff 100%)`,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${action.color}15`,
                            color: action.color,
                            width: 40,
                            height: 40,
                            mr: 2,
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {action.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Recent Products */}
        <Box>
          <Paper sx={{ p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Products
              </Typography>
              <Tooltip title="Add Product">
                <IconButton component={Link} to="/product" color="primary">
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
            <List sx={{ maxHeight: 400, overflow: 'auto' }}>
              {recentProducts.length > 0 ? (
                recentProducts.map((product, index) => (
                  <React.Fragment key={product.prodCode}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#1976d2' }}>
                          <LocalPharmacy />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.prodName}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              MRP: ₹{product.mrp}
                            </Typography>
                            <Chip
                              label={product.isActive ? 'Active' : 'Inactive'}
                              size="small"
                              color={product.isActive ? 'success' : 'default'}
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentProducts.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText 
                    primary="No products found"
                    secondary="Add your first product to get started"
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Box>
      </Box>

      {/* Additional Features */}
      <Box sx={{ mt: 2 }}>
        <Box>
          <Paper sx={{ p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Advanced Features
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
              <Box>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <ShoppingCart fontSize="large" color="primary" />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Purchase Management
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Coming Soon
                  </Typography>
                </Card>
              </Box>
              <Box>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <AttachMoney fontSize="large" color="success" />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Sales & Billing
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Coming Soon
                  </Typography>
                </Card>
              </Box>
              <Box>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Assessment fontSize="large" color="warning" />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Reports & Analytics
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Coming Soon
                  </Typography>
                </Card>
              </Box>
              <Box>
                <Card sx={{ textAlign: 'center', p: 2 }}>
                  <Inventory fontSize="large" color="error" />
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Inventory Tracking
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Coming Soon
                  </Typography>
                </Card>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
