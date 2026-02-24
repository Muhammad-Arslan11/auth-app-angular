import { HttpClient } from "@angular/common/http";
import { inject, Injectable} from "@angular/core";
import { AuthResponse } from "../Models/AuthResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
  http : HttpClient = inject(HttpClient);
     signup(email: string, password: string){
        const data = {email: email, password: password, returnSecureToken: true}
       return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC0jhS25-q1prEVkqJsU5JHDHQBbczz8Y', data);
     }
}