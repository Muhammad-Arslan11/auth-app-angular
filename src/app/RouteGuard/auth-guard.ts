import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../Services/auth-service.service";
import { inject } from "@angular/core";
import { map, Observable, take } from "rxjs";

export const canActivate = (router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |Promise<boolean | UrlTree> | Observable<boolean | UrlTree> =>{
   const authService: AuthService = inject(AuthService);
   const route = inject(Router);
   return authService.user.pipe(take(1), map((user)=>{
      const loggedInUser = user ? true : false;
      if(loggedInUser) return true;
      return route.createUrlTree(['/login']);
   }))
}