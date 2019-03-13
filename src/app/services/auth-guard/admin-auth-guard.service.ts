import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import {Observable} from 'rxjs';
import {AppUser} from '../../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService,
              private userService: UserService) {
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid).valueChanges()),
      map((appUser: AppUser) => appUser.isAdmin)
    );
  }
}
