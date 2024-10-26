import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenses: any[] = []; // Array to hold expenses

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadExpenses(); // Load expenses on component initialization
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data : any) => {
      this.expenses = data; // Update the expenses array with fetched data
    });
  }

  deleteExpense(id: string): void {
    this.expenseService
      .deleteExpense(id)
      .then(() => {
        console.log('Expense deleted successfully');
        this.loadExpenses(); // Refresh the expense list
      })
      .catch((error: any) => {
        console.error('Error deleting expense:', error);
      });
  }
}
