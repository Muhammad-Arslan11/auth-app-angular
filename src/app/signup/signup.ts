import { Component } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from "../utility/snackbar/snackbar";
import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/AuthResponse';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, SnackbarComponent, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true
})
export class Signup {
  constructor(private authService: AuthService) { }
  isLoading: boolean = false;
  errorMessage: string = '';
  authObs!: Observable<AuthResponse>;

  onFormSubmitHandler(form: NgForm) {
    const { email, password } = form.value;
    if (form.invalid) return;

      this.authObs = this.authService.signup(email, password);
      this.authObs.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (errMsg) => {
        // this.errorMessage = errMsg;
        console.log(errMsg);
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
