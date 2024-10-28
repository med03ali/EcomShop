import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
     private router: Router,
    private userService : UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isSignedIn$.pipe(
      map(isAuth => {
        if (isAuth) {
          return true; // Allow access
        } else {
          this.router.navigate(['signin']); // Navigate to home if not authenticated
          return false; // Block access
        }
      })
    );
  }
}
