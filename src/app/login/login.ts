import { Component, Inject } from '@angular/core';
import { AuthService } from '../Services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  authService: AuthService = Inject(AuthService);
  isLogInMode: boolean = false;


  onSwitchHandler(){
    this.isLogInMode = !this.isLogInMode;
  }

  onFormSubmitHandler(form: NgForm){
    console.log(form.value)
    if(this.isLogInMode){
      // login 
      return;
    }else{
      // signup
      // const {email, password} = form;
      // this.authService.signup(email, password);
    }
  }
}
