import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { addDoc, DocumentReference } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private firestore: Firestore) {}

  addExpense(expense: any): Promise<any> {
    const expensesRef = collection(this.firestore, 'expenses');
    return addDoc(expensesRef, expense); // Automatically generates unique ID
  }

  getExpenses(): Observable<any[]> {
    const expensesRef = collection(this.firestore, 'expenses');
    return collectionData(expensesRef, { idField: 'id' });
  }

  deleteExpense(id: string): Promise<void> {
    const expenseDocRef = doc(this.firestore, `expenses/${id}`);
    return deleteDoc(expenseDocRef);
  }
}
