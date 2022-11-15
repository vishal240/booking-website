import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) { }
  isLoggedInAdmin(){
    return (localStorage.getItem('user_login'))
  }
}
