import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  navbarOpen: Boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login-page']);
    localStorage.removeItem('user');
    localStorage.removeItem('JWT');
    this.loginService.setIsLoggedIn(false);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
