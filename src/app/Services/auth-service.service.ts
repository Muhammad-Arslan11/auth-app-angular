import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Models/AuthResponse";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorMsg: string | undefined;

  http: HttpClient = inject(HttpClient);
  signup(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC0jhS25-q1prEVkqJsU5JHDHQBbczz8Y', data)
      .pipe(catchError((err) => {
        let errorMsg = ''
        if (!err || !err.error.error) {
          return throwError(()=> errorMsg);
        }
        switch (err.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMsg = 'email already exists';
            this.errorMsg = errorMsg;
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMsg = 'operation not allowed';
            this.errorMsg = errorMsg;
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMsg = 'too many attempts. Please try again later';
            this.errorMsg = errorMsg;
            break;
        }
        return throwError(()=> errorMsg)
      }))
  }
}