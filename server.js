const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for demonstration
const mockCustomers = {
  'demo': {
    username: 'demo',
    password: 'demo123',
    profile: {
      customerNumber: 'CUST001',
      companyName: 'Demo Company Ltd',
      contactPerson: 'John Doe',
      email: 'john.doe@democompany.com',
      phone: '+1-555-0123',
      address: '123 Business Street, City, State 12345'
    }
  },
  'customer1': {
    username: 'customer1',
    password: 'pass123',
    profile: {
      customerNumber: 'CUST002',
      companyName: 'ABC Corporation',
      contactPerson: 'Jane Smith',
      email: 'jane.smith@abccorp.com',
      phone: '+1-555-0456',
      address: '456 Corporate Ave, Business City, BC 67890'
    }
  }
};

// Login endpoint
app.post('/custlogin', (req, res) => {
  const { username, password } = req.body;
  
  console.log(`Login attempt for username: ${username}`);
  
  const customer = mockCustomers[username];
  
  if (customer && customer.password === password) {
    res.json({
      Envelope: {
        Body: {
          ZFM_CUSPOR_LOGIN_KMResponse: {
            EV_STATUS: 'S',
            EV_MESSAGE: 'Login successful'
          }
        }
      }
    });
  } else {
    res.json({
      Envelope: {
        Body: {
          ZFM_CUSPOR_LOGIN_KMResponse: {
            EV_STATUS: 'E',
            EV_MESSAGE: 'Invalid username or password'
          }
        }
      }
    });
  }
});

// Customer profile endpoint
app.post('/custprofile', (req, res) => {
  const { username } = req.body;
  const customer = mockCustomers[username];
  
  if (customer) {
    res.json({
      status: 'success',
      data: customer.profile
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Customer not found'
    });
  }
});

// Customer inquiry endpoint
app.post('/custinquiry', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: [
      {
        inquiryNumber: 'INQ001',
        date: '2024-01-15',
        product: 'Product A',
        quantity: 100,
        status: 'Open',
        expectedDate: '2024-02-15'
      },
      {
        inquiryNumber: 'INQ002',
        date: '2024-01-20',
        product: 'Product B',
        quantity: 50,
        status: 'In Progress',
        expectedDate: '2024-02-20'
      }
    ]
  });
});

// Customer sales order endpoint
app.post('/custsales', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: [
      {
        orderNumber: 'SO001',
        date: '2024-01-10',
        product: 'Product A',
        quantity: 75,
        unitPrice: 25.00,
        totalAmount: 1875.00,
        status: 'Confirmed'
      },
      {
        orderNumber: 'SO002',
        date: '2024-01-25',
        product: 'Product C',
        quantity: 30,
        unitPrice: 45.00,
        totalAmount: 1350.00,
        status: 'Processing'
      }
    ]
  });
});

// Customer delivery endpoint
app.post('/custdelivery', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: [
      {
        deliveryNumber: 'DEL001',
        orderNumber: 'SO001',
        date: '2024-01-18',
        product: 'Product A',
        quantity: 75,
        status: 'Delivered',
        trackingNumber: 'TRK123456'
      },
      {
        deliveryNumber: 'DEL002',
        orderNumber: 'SO002',
        date: '2024-02-01',
        product: 'Product C',
        quantity: 30,
        status: 'In Transit',
        trackingNumber: 'TRK789012'
      }
    ]
  });
});

// Customer invoice endpoint
app.post('/custinvoicedisp', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: [
      {
        invoiceNumber: 'INV001',
        date: '2024-01-20',
        orderNumber: 'SO001',
        amount: 1875.00,
        tax: 187.50,
        totalAmount: 2062.50,
        dueDate: '2024-02-20',
        status: 'Paid'
      },
      {
        invoiceNumber: 'INV002',
        date: '2024-02-05',
        orderNumber: 'SO002',
        amount: 1350.00,
        tax: 135.00,
        totalAmount: 1485.00,
        dueDate: '2024-03-05',
        status: 'Outstanding'
      }
    ]
  });
});

// Customer aging endpoint
app.post('/custaging', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: {
      current: 1485.00,
      days30: 0.00,
      days60: 0.00,
      days90: 0.00,
      over90: 0.00,
      totalOutstanding: 1485.00
    }
  });
});

// Customer credit/debit endpoint
app.post('/custcred_deb', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: [
      {
        documentNumber: 'CM001',
        type: 'Credit',
        date: '2024-01-25',
        amount: 125.00,
        reason: 'Product return',
        status: 'Applied'
      },
      {
        documentNumber: 'DM001',
        type: 'Debit',
        date: '2024-02-01',
        amount: 50.00,
        reason: 'Late payment fee',
        status: 'Outstanding'
      }
    ]
  });
});

// Customer overall sales endpoint
app.post('/custoverall_sales', (req, res) => {
  const { username } = req.body;
  
  res.json({
    status: 'success',
    data: {
      currentYear: {
        year: 2024,
        totalSales: 3225.00,
        orderCount: 2,
        averageOrderValue: 1612.50
      },
      lastYear: {
        year: 2023,
        totalSales: 28500.00,
        orderCount: 18,
        averageOrderValue: 1583.33
      },
      monthlyData: [
        { month: 'Jan', sales: 1875.00 },
        { month: 'Feb', sales: 1350.00 },
        { month: 'Mar', sales: 0.00 },
        { month: 'Apr', sales: 0.00 },
        { month: 'May', sales: 0.00 },
        { month: 'Jun', sales: 0.00 }
      ]
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Customer Portal Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Customer Portal Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log('\nAvailable test credentials:');
  console.log('Username: demo, Password: demo123');
  console.log('Username: customer1, Password: pass123');
});

module.exports = app;