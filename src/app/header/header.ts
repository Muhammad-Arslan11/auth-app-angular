import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService){}
  isLoggedIn:boolean = false;
  userSubject!:Subscription;

  ngOnInit(){
    this.userSubject = this.authService.user.subscribe((res)=>{
      // console.log(res)
      this.isLoggedIn = res ? true : false;
    })
  }

  public onLogout(){
    this.authService.signout();
  }
  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }

}