import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expenses$: Observable<any[]>;

  constructor(private expenseService: ExpenseService) {
    this.expenses$ = this.expenseService.getExpenses(); // Load expenses from the service
  }

  ngOnInit(): void {}
}
