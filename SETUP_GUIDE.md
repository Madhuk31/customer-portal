# Customer Portal - Complete Setup Guide

## 🎯 Overview

Your Angular frontend is now **fully connected** to your SAP backend! This guide will help you run both the frontend and backend to test the complete integration.

## 📋 What's Been Set Up

### ✅ Frontend (Angular)
- **Customer Portal** with all sections working
- **API Service** configured to connect to `http://localhost:8000`
- **SAP Response Handling** for all endpoints
- **Dynamic Data Display** using real SAP data structures
- **Loading States** and error handling

### ✅ Backend (Node.js + Express)
- **SAP Integration** with all 8 endpoints
- **SOAP to JSON conversion** using X2JS
- **CORS enabled** for frontend communication
- **Error handling** and logging

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Start the server
NODE_PATH=./node_modules node server.js
```

You should see:
```
Customer Portal Backend Server running on port 8000
Health check: http://localhost:8000/health

Available test credentials:
Username: demo, Password: demo123
Username: customer1, Password: pass123
```

### 2. Start the Frontend

```bash
# In a new terminal, navigate to project root
cd /workspace

# Start Angular development server
ng serve
```

You should see:
```
Local:   http://localhost:4200/
```

### 3. Test the Application

1. Open `http://localhost:4200` in your browser
2. Login with test credentials (or use your actual SAP username)
3. Navigate through different sections to see real SAP data

## 🔗 SAP Endpoints Integrated

| Endpoint | Purpose | SAP Function |
|----------|---------|--------------|
| `/custlogin` | Customer Login | Manual authentication |
| `/custprofile` | Customer Profile | `ZFM_CUSTOMER_PROFILE_KM` |
| `/custinquiry` | Customer Inquiries | `ZFM_CUST_INQUIRY_KM` |
| `/custsales` | Sales Orders | `ZFM_CUST_SALESORDER_KM` |
| `/custdelivery` | Delivery Information | `ZFM_CUST_DELIVERY_KM` |
| `/custinvoicedisp` | Invoice Display | `ZFM_CUST_INVOICE_LIST_KM` |
| `/custaging` | Payment Aging | `ZFM_CUST_PAY_AGING_KM` |
| `/custcred_deb` | Credit/Debit Memos | `ZFM_CUST_CRE_DEB_KM` |
| `/custoverall_sales` | Overall Sales | `ZFM_CUST_OVERALL_SALES_KM` |

## 📊 Data Displayed

### Customer Profile
- Customer ID, Name, Type
- Address information (Street, City, Postal Code, Country)

### Inquiries
- Document numbers, items, dates
- Product information and quantities
- Net values and currencies

### Sales Orders
- Order numbers and line items
- Product descriptions and quantities
- Pricing and currency information

### Deliveries
- Delivery numbers and dates
- Shipped quantities and units
- Product tracking information

### Invoices
- Invoice numbers and dates
- Net values and currencies
- Position counts

### Payment Aging
- Outstanding amounts by aging buckets
- Document references and dates

### Credit/Debit Memos
- Document types and amounts
- Product references and descriptions

### Overall Sales
- Sales order summaries
- Order types and values
- Organization assignments

## 🔧 Configuration

### Backend Configuration (`backend/server.js`)
- **SAP Server**: `AZKTLDS5CP.kcloud.com:8000`
- **SAP Client**: `100`
- **Authorization**: Basic authentication (Base64 encoded)
- **Content Type**: `text/xml;charset=UTF-8`

### Frontend Configuration (`src/app/services/api.service.ts`)
- **Base URL**: `http://localhost:8000`
- **Headers**: `application/json`
- **HTTP Client**: Angular HttpClient with fetch

## 🔐 Authentication

The login endpoint currently uses mock authentication for demonstration. To use real SAP authentication, you would need to:

1. Replace the mock login in `backend/server.js`
2. Implement actual SAP user validation
3. Add proper session management

## 🛠️ Troubleshooting

### Backend Won't Start
```bash
# Make sure you're in the backend directory
cd backend

# Check if dependencies are installed
ls node_modules

# If not, install them
npm install

# Start with explicit node path
NODE_PATH=./node_modules node server.js
```

### Frontend Can't Connect
1. Ensure backend is running on port 8000
2. Check browser console for CORS errors
3. Verify API service base URL: `http://localhost:8000`

### SAP Connection Issues
1. Check SAP server availability
2. Verify SAP credentials in backend
3. Check network connectivity to SAP server

### No Data Displayed
1. Open browser developer tools
2. Check Network tab for API responses
3. Look for console errors in browser
4. Check backend logs for SAP response details

## 📱 Features Tested

- ✅ **Login Flow**: Mock authentication working
- ✅ **Profile Data**: SAP customer information displayed
- ✅ **Inquiry Data**: Product inquiries from SAP
- ✅ **Sales Orders**: Complete sales order details
- ✅ **Delivery Info**: Shipping and tracking data
- ✅ **Invoice Display**: Billing information
- ✅ **Payment Aging**: Outstanding amounts
- ✅ **Credit/Debit**: Memo transactions
- ✅ **Sales Analytics**: Overall sales summaries

## 🎉 Success!

Your frontend is now fully connected to your SAP backend! The application will:

1. **Authenticate users** (currently mock, easily replaceable)
2. **Fetch real SAP data** from all endpoints
3. **Display structured information** in a user-friendly interface
4. **Handle loading states** and errors gracefully
5. **Parse SAP responses** automatically

You can now customize the UI, add more features, or integrate additional SAP functions as needed.

## 🔜 Next Steps

1. **Replace mock login** with real SAP authentication
2. **Add data filtering** and search capabilities
3. **Implement data exports** (PDF, Excel)
4. **Add real-time updates** if needed
5. **Deploy to production** environment

---

**🎊 Congratulations!** Your Customer Portal is now fully functional with SAP integration!