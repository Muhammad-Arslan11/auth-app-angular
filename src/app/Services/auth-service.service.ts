import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Models/AuthResponse";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../Models/User";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  user = new BehaviorSubject<User | null>(null);
  private timer:undefined | number = undefined;

  signup(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC0jhS25-q1prEVkqJsU5JHDHQBbczz8Y', data)
      .pipe(catchError(this.handleError), tap((res)=>{
        this.handleCreateUser(res);
      }))
  }

  signin(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC0jhS25-q1prEVkqJsU5JHDHQBbczz8Y', data)
      .pipe(catchError(this.handleError), tap((res)=>{
        this.handleCreateUser(res);
      }))
  }

  signout(){
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    if(this.timer){
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  autoLogin(){
    const user = localStorage.getItem('user');
    if(!user){
      return;
    }
    const parsedUser = JSON.parse(user);
    const loggedInUser = new User(parsedUser.email, parsedUser.id, parsedUser._token, parsedUser._expiresIn);
    if(loggedInUser.token){
      this.user.next(loggedInUser);
      const timerValue = parsedUser._expiresIn - new Date().getTime();
      this.autoLogout(timerValue);
      return;
    }
  }

  autoLogout(expireTimer: number){
   this.timer = setTimeout(() => {
      this.signout();
    }, expireTimer);
    localStorage.removeItem('user');
  }

  private handleError(err: { error: { error: { message: any; }; }; }) {
    {
      // console.log(err)
      let errorMsg = 'an unknown error occurred'
      if (!err || !err.error.error) {
        return throwError(() => errorMsg);
      }
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMsg = 'email already exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMsg = 'operation not allowed';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMsg = 'too many attempts. Please try again later';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg = 'email not found';
          break;
        case "INVALID_LOGIN_CREDENTIALS":
          errorMsg = 'incorrect login credentials';
          break;
        case 'USER_DISABLED':
          errorMsg = 'user disabled';
          break;
      }
      return throwError(() => errorMsg)
    }
  }
   private handleCreateUser(res: AuthResponse){
      const expiresInTimeStamps = new Date().getTime() + +res.expiresIn * 1000;
      const expiresIn = new Date(expiresInTimeStamps);
      const user = new User(res.idToken, expiresIn, res.email, res.localId);
      this.user.next(user);
      this.autoLogout(Number(res.expiresIn) * 1000);
      localStorage.setItem('user', JSON.stringify(user));
   }
}