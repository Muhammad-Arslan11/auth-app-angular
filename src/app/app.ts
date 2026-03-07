import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Footer/footer.component';
import { HeaderComponent } from './header/header';
import { AuthService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  authService: AuthService = inject(AuthService);
  ngOnInit(){
    this.authService.autoLogin();
  }
}
