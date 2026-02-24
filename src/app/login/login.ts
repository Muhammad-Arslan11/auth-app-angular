import { Component } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
    constructor(private authService:AuthService){}
  isLogInMode: boolean = false;
  isLoading:boolean = false;

  onSwitchHandler(){
    this.isLogInMode = !this.isLogInMode;
  }

  onFormSubmitHandler(form: NgForm){
     if(form.invalid) return;
    if(this.isLogInMode){
      // login

      return;
    }else{
      // signup
      const {email, password} = form.value;
      console.log(email, password)
      this.authService.signup(email, password).subscribe({
        next:(res)=> {
          console.log(res)
        },
        error: (error)=> {
          console.log(error)
        }
      });
    }
  }
}
