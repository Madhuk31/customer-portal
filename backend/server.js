const express = require('express');
const cors = require('cors');
const request = require('request');
const X2JS = require('x2js');
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

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUSTOMER_PROFILE_KM>
         <IV_CUST_ID>${username}</IV_CUST_ID>
      </urn:ZFM_CUSTOMER_PROFILE_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zprofile_cuspor_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer inquiry endpoint
app.post('/custinquiry', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_INQUIRY_KM>
         <IV_CUST_ID>${username}</IV_CUST_ID>
      </urn:ZFM_CUST_INQUIRY_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zinquiry_cust_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer sales order endpoint
app.post('/custsales', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_SALESORDER_KM>
         <IV_CUST_ID>${username}</IV_CUST_ID>
      </urn:ZFM_CUST_SALESORDER_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zsales_cust_portal_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer delivery endpoint
app.post('/custdelivery', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_DELIVERY_KM>
         <IV_CUST_ID>${username}</IV_CUST_ID>
      </urn:ZFM_CUST_DELIVERY_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zdelivery_cust_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer invoice endpoint
app.post('/custinvoicedisp', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_INVOICE_LIST_KM>
         <CUSTOMER_ID>${username}</CUSTOMER_ID>
      </urn:ZFM_CUST_INVOICE_LIST_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zinvoice_display_cust_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer aging endpoint
app.post('/custaging', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_PAY_AGING_KM>
         <CUSTOMER_ID>${username}</CUSTOMER_ID>
      </urn:ZFM_CUST_PAY_AGING_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zaging_cust_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer credit/debit endpoint
app.post('/custcred_deb', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_CRE_DEB_KM>
         <IV_KUNNR>${username}</IV_KUNNR>
      </urn:ZFM_CUST_CRE_DEB_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zdeb_cred_cust_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
    });
});

// Customer overall sales endpoint
app.post('/custoverall_sales', (req, res) => {
    const { username } = req.body;

    const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_CUST_OVERALL_SALES_KM>
         <IV_CUSTOMER_ID>${username}</IV_CUSTOMER_ID>
      </urn:ZFM_CUST_OVERALL_SALES_KM>
   </soapenv:Body>
</soapenv:Envelope>
    `;

    const options = {
        method: 'POST',
        url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zfisales_cust_km?sap-client=100',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'Authorization': 'Basic SzkwMTUwMzpQcmFkZWlzaDI5', // Replace with your Base64 auth
            'Cookie': 'sap-usercontext=sap-client=100'
        },
        body: soapBody
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("Request error:", error);
            return res.status(500).send({ error: "Request to SAP failed" });
        }

        const x2js = new X2JS();
        const jsonResponse = x2js.xml2js(body);

        res.send(jsonResponse);
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