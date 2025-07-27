import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  activeTab = 'home';
  expandedDropdowns = {
    dashboard: false,
    financial: false
  };

  // Data properties
  customerProfile: any = null;
  inquiryData: any = null;
  salesData: any = null;
  deliveryData: any = null;
  invoiceData: any = null;
  agingData: any = null;
  creditDebitData: any = null;
  overallSalesData: any = null;

  // Loading states
  isLoading = {
    profile: false,
    inquiry: false,
    sales: false,
    delivery: false,
    invoice: false,
    aging: false,
    creditDebit: false,
    overallSales: false
  };

  currentUser: any = null;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    // Get current user from localStorage
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    } else {
      // Redirect to login if no user found
      this.router.navigate(['/login']);
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    // Close all dropdowns when selecting a main tab
    this.expandedDropdowns.dashboard = false;
    this.expandedDropdowns.financial = false;

    // Load data based on tab
    this.loadTabData(tab);
  }

  toggleDropdown(dropdownName: 'dashboard' | 'financial') {
    this.expandedDropdowns[dropdownName] = !this.expandedDropdowns[dropdownName];
    // Close other dropdown when opening one
    if (dropdownName === 'dashboard') {
      this.expandedDropdowns.financial = false;
    } else {
      this.expandedDropdowns.dashboard = false;
    }
  }

  navigateToSubTab(subTab: string) {
    this.activeTab = subTab;
    // Close all dropdowns after navigation
    this.expandedDropdowns.dashboard = false;
    this.expandedDropdowns.financial = false;

    // Load data for the sub tab
    this.loadTabData(subTab);
  }

  loadTabData(tab: string) {
    if (!this.currentUser?.username) return;

    switch (tab) {
      case 'profile':
        this.loadCustomerProfile();
        break;
      case 'inquiry':
        this.loadInquiryData();
        break;
      case 'saleorder':
        this.loadSalesData();
        break;
      case 'delivery':
        this.loadDeliveryData();
        break;
      case 'invoice':
        this.loadInvoiceData();
        break;
      case 'payments':
        this.loadAgingData();
        break;
      case 'memo':
        this.loadCreditDebitData();
        break;
      case 'overallsales':
        this.loadOverallSalesData();
        break;
    }
  }

  loadCustomerProfile() {
    if (this.customerProfile || this.isLoading.profile) return;
    
    this.isLoading.profile = true;
    this.apiService.getCustomerProfile(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Profile response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUSTOMER_PROFILE_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUSTOMER_PROFILE_KMResponse;
          if (sapResponse.EV_STATUS === 'S') {
            this.customerProfile = sapResponse.ES_PROFILE;
          } else {
            console.error('SAP Error:', sapResponse.EV_MESSAGE);
          }
        } else {
          this.customerProfile = response;
        }
        
        this.isLoading.profile = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading.profile = false;
      }
    });
  }

  loadInquiryData() {
    if (this.inquiryData || this.isLoading.inquiry) return;
    
    this.isLoading.inquiry = true;
    this.apiService.getCustomerInquiry(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Inquiry response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_INQUIRY_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_INQUIRY_KMResponse;
          if (sapResponse.ET_INQUIRY?.item) {
            this.inquiryData = Array.isArray(sapResponse.ET_INQUIRY.item) 
              ? sapResponse.ET_INQUIRY.item 
              : [sapResponse.ET_INQUIRY.item];
          } else {
            this.inquiryData = [];
          }
        } else {
          this.inquiryData = response;
        }
        
        this.isLoading.inquiry = false;
      },
      error: (error) => {
        console.error('Error loading inquiry data:', error);
        this.isLoading.inquiry = false;
      }
    });
  }

  loadSalesData() {
    if (this.salesData || this.isLoading.sales) return;
    
    this.isLoading.sales = true;
    this.apiService.getCustomerSales(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Sales response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_SALESORDER_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_SALESORDER_KMResponse;
          if (sapResponse.ET_SALESORDER?.item) {
            this.salesData = Array.isArray(sapResponse.ET_SALESORDER.item) 
              ? sapResponse.ET_SALESORDER.item 
              : [sapResponse.ET_SALESORDER.item];
          } else {
            this.salesData = [];
          }
        } else {
          this.salesData = response;
        }
        
        this.isLoading.sales = false;
      },
      error: (error) => {
        console.error('Error loading sales data:', error);
        this.isLoading.sales = false;
      }
    });
  }

  loadDeliveryData() {
    if (this.deliveryData || this.isLoading.delivery) return;
    
    this.isLoading.delivery = true;
    this.apiService.getCustomerDelivery(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Delivery response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_DELIVERY_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_DELIVERY_KMResponse;
          if (sapResponse.ET_DELIVERY?.item) {
            this.deliveryData = Array.isArray(sapResponse.ET_DELIVERY.item) 
              ? sapResponse.ET_DELIVERY.item 
              : [sapResponse.ET_DELIVERY.item];
          } else {
            this.deliveryData = [];
          }
        } else {
          this.deliveryData = response;
        }
        
        this.isLoading.delivery = false;
      },
      error: (error) => {
        console.error('Error loading delivery data:', error);
        this.isLoading.delivery = false;
      }
    });
  }

  loadInvoiceData() {
    if (this.invoiceData || this.isLoading.invoice) return;
    
    this.isLoading.invoice = true;
    this.apiService.getCustomerInvoice(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Invoice response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_INVOICE_LIST_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_INVOICE_LIST_KMResponse;
          if (sapResponse.ET_INVOICE_LIST?.item) {
            this.invoiceData = Array.isArray(sapResponse.ET_INVOICE_LIST.item) 
              ? sapResponse.ET_INVOICE_LIST.item 
              : [sapResponse.ET_INVOICE_LIST.item];
          } else {
            this.invoiceData = [];
          }
        } else {
          this.invoiceData = response;
        }
        
        this.isLoading.invoice = false;
      },
      error: (error) => {
        console.error('Error loading invoice data:', error);
        this.isLoading.invoice = false;
      }
    });
  }

  loadAgingData() {
    if (this.agingData || this.isLoading.aging) return;
    
    this.isLoading.aging = true;
    this.apiService.getCustomerAging(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Aging response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_PAY_AGING_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_PAY_AGING_KMResponse;
          if (sapResponse.ET_CUSTOMER_AGING?.item) {
            this.agingData = Array.isArray(sapResponse.ET_CUSTOMER_AGING.item) 
              ? sapResponse.ET_CUSTOMER_AGING.item 
              : [sapResponse.ET_CUSTOMER_AGING.item];
          } else {
            this.agingData = [];
          }
        } else {
          this.agingData = response;
        }
        
        this.isLoading.aging = false;
      },
      error: (error) => {
        console.error('Error loading aging data:', error);
        this.isLoading.aging = false;
      }
    });
  }

  loadCreditDebitData() {
    if (this.creditDebitData || this.isLoading.creditDebit) return;
    
    this.isLoading.creditDebit = true;
    this.apiService.getCustomerCreditDebit(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Credit/Debit response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_CRE_DEB_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_CRE_DEB_KMResponse;
          if (sapResponse.ET_CRED_DEB?.item) {
            this.creditDebitData = Array.isArray(sapResponse.ET_CRED_DEB.item) 
              ? sapResponse.ET_CRED_DEB.item 
              : [sapResponse.ET_CRED_DEB.item];
          } else {
            this.creditDebitData = [];
          }
        } else {
          this.creditDebitData = response;
        }
        
        this.isLoading.creditDebit = false;
      },
      error: (error) => {
        console.error('Error loading credit/debit data:', error);
        this.isLoading.creditDebit = false;
      }
    });
  }

  loadOverallSalesData() {
    if (this.overallSalesData || this.isLoading.overallSales) return;
    
    this.isLoading.overallSales = true;
    this.apiService.getCustomerOverallSales(this.currentUser.username).subscribe({
      next: (response: any) => {
        console.log('Overall Sales response:', response);
        
        // Handle SAP response structure
        if (response?.Envelope?.Body?.ZFM_CUST_OVERALL_SALES_KMResponse) {
          const sapResponse = response.Envelope.Body.ZFM_CUST_OVERALL_SALES_KMResponse;
          if (sapResponse.ET_OVERALL_SALES?.item) {
            this.overallSalesData = Array.isArray(sapResponse.ET_OVERALL_SALES.item) 
              ? sapResponse.ET_OVERALL_SALES.item 
              : [sapResponse.ET_OVERALL_SALES.item];
          } else {
            this.overallSalesData = [];
          }
        } else {
          this.overallSalesData = response;
        }
        
        this.isLoading.overallSales = false;
      },
      error: (error) => {
        console.error('Error loading overall sales data:', error);
        this.isLoading.overallSales = false;
      }
    });
  }

  logout() {
    // Clear user data
    localStorage.removeItem('currentUser');
    // Navigate to login
    this.router.navigate(['/login']);
  }
}
