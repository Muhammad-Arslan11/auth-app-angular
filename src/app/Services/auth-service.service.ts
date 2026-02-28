import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Models/AuthResponse";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new Subject<User>();

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
   }
}