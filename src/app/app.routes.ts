import { Routes } from '@angular/router';
import {Home} from './home/home'
import { Login } from './login/login';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { Signup } from './signup/signup';

export const routes: Routes = [ 
    { path: '', component: Home }, 
    { path: 'login', component: Login }, 
    { path: 'signup', component: Signup }, 
    { path: 'dashboard', component: DashboardComponent },  
  ]; 
