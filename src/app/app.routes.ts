import { Routes } from '@angular/router';
import {Home} from './home/home'
import { Login } from './login/login';
import { DashboardComponent } from './Dashboard/dashboard.component';

export const routes: Routes = [ 
    { path: '', component: Home }, 
    { path: 'login', component: Login }, 
    { path: 'dashboard', component: DashboardComponent },  
  ]; 
