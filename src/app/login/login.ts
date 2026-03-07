import { Component, inject } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from "../utility/snackbar/snackbar";
import { Observable } from 'rxjs';
import { AuthResponse } from '../Models/AuthResponse';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, SnackbarComponent, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  constructor(private authService: AuthService) { }
  isLoading: boolean = false;
  errorMessage: string = '';
  authObs!: Observable<AuthResponse>;
  router = inject(Router)
 

  onFormSubmitHandler(form: NgForm) {
    const { email, password } = form.value;
    if (form.invalid) return;

      this.authObs = this.authService.signin(email, password);
      this.authObs.subscribe({
      next: (res) => {
        if(res){
        // console.log(res);
        this.router.navigate(['/dashboard']);
        }
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
