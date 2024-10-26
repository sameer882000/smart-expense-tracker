import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async signup(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      return true; // Login successful
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred during login.';
      this.showError(errorMessage); // Show error as toast
      console.error('Login error:', error);
      return false; // Login failed
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth); // Sign out the user from Firebase
      this.router.navigate(['/login']); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error); // Log any error
      // Optionally, you can show a snackbar or toast message for user feedback
    }
  }

  getUser(): Observable<any> {
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(user); // Emit the user state
        },
        (error) => {
          observer.error(error); // Emit any error if occurs
        }
      );
      return { unsubscribe }; // Return the unsubscribe function to clean up
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right', // Aligns the snackbar to the right
      verticalPosition: 'top', // Places the snackbar at the top
      panelClass: ['snackbar-error'], // Optional: apply custom styles
    });
  }
}
