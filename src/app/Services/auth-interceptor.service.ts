import { inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { AuthService } from './auth-service.service';
import { exhaustMap, take } from 'rxjs';


export class AuthInterceptorService implements HttpInterceptor{
    authService: AuthService = inject(AuthService);
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Auth Interceptor called!');
       return  this.authService.user.pipe(take(1), exhaustMap((user)=>{
        if(!user){
            return next.handle(req);
        }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
            })
            return next.handle(modifiedReq);
        }))
    }
}