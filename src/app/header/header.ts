import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [RouterLink, CommonModule]
})
export class HeaderComponent {
  constructor(private authService: AuthService){}
  isLoggedIn!:boolean;
  userSubject!:Subscription;

  ngOInit(){
    this.userSubject = this.authService.user.subscribe((res)=>{
      console.log(res)
      this.isLoggedIn = res ? true : false;
    })
  }
  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }

}