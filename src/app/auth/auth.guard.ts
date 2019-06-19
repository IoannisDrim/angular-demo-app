import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.checkLogin();
  }

  checkLogin(): boolean {
    if ( this.loginService.isLoggedIn ) {
      return true;
    }

    this.router.navigate(['/loginPage']);
    return false;
  }

}
