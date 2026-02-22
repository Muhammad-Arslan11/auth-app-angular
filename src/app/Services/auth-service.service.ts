import { HttpClient } from "@angular/common/http";
import { Inject, Injectable} from "@angular/core";
import { AuthResponse } from "../Models/AuthResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
  http : HttpClient = Inject(HttpClient);
     signup(email: string, password: string){
        const data = {email: email, password: password, returnSecureToken: true}
       return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=angular-httpclient-6c7b0', data);
     }
}