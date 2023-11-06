import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('access_token');
    if (email || token) {
      this.authenticationService.loggedIn.next(true);
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}