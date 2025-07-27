import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-memo',
  standalone: true,
  imports: [],
  templateUrl: './credit-memo.html',
  styleUrl: './credit-memo.scss'
})
export class CreditMemo {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }
}
