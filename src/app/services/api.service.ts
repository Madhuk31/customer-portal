import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Login API
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custlogin`, {
      username,
      password
    }, { headers: this.headers });
  }

  // Customer Profile API
  getCustomerProfile(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custprofile`, {
      username
    }, { headers: this.headers });
  }

  // Customer Inquiry API
  getCustomerInquiry(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custinquiry`, {
      username
    }, { headers: this.headers });
  }

  // Customer Sales Order API
  getCustomerSales(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custsales`, {
      username
    }, { headers: this.headers });
  }

  // Customer Delivery API
  getCustomerDelivery(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custdelivery`, {
      username
    }, { headers: this.headers });
  }

  // Customer Invoice API
  getCustomerInvoice(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custinvoicedisp`, {
      username
    }, { headers: this.headers });
  }

  // Customer Aging API
  getCustomerAging(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custaging`, {
      username
    }, { headers: this.headers });
  }

  // Customer Credit/Debit API
  getCustomerCreditDebit(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custcred_deb`, {
      username
    }, { headers: this.headers });
  }

  // Customer Overall Sales API
  getCustomerOverallSales(username: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/custoverall_sales`, {
      username
    }, { headers: this.headers });
  }
} 