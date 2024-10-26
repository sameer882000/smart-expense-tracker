import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.value;
      console.log('Expense data:', expenseData);
      try {
        await this.expenseService.addExpense(expenseData);
        this.expenseForm.reset();
        console.log('Expense added successfully');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  }
}
