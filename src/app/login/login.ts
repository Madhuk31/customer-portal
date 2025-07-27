import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginData = {
    username: '',
    password: ''
  };
  
  errorMessage = '';
  isLoading = false;

  constructor(private router: Router, private apiService: ApiService) {}

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      this.errorMessage = 'Please enter both User ID and Password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.login(this.loginData.username, this.loginData.password).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        
        // Check if login was successful based on SAP response
        if (response?.Envelope?.Body?.ZFM_CUSPOR_LOGIN_KMResponse?.EV_STATUS === 'S') {
          // Store user info in localStorage or session
          localStorage.setItem('currentUser', JSON.stringify({
            username: this.loginData.username,
            loginTime: new Date().toISOString()
          }));
          
          // Navigate to home page
          this.router.navigate(['/home']);
        } else {
          // Handle login failure
          const message = response?.Envelope?.Body?.ZFM_CUSPOR_LOGIN_KMResponse?.EV_MESSAGE || 'Login failed';
          this.errorMessage = message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage = 'Connection error. Please try again.';
      }
    });
  }
}
