import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [],
  templateUrl: './payments.html',
  styleUrl: './payments.scss'
})
export class Payments {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }
}
