import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin_login: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.admin_login = JSON.parse(localStorage.getItem('admin_login'));
  }
  logout(){
    localStorage.removeItem('admin_login'),
    window.location.assign('https://friendswebsolutions.com/estate/admin/')
  }
}
