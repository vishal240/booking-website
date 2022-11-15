import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthguardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate() {
    if (!localStorage.getItem('user_login')) {
        return true;
    }
    if(localStorage.getItem('user_login')){
        this.router.navigate(['/']);
    }
    return false;
  }
}
