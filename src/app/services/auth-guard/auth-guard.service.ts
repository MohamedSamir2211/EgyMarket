import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route, state: RouterStateSnapshot) {
    /* state get the parameter of the url the user try to access when
       he/she is not allowed to, we use this to make a redirect to the
       page he/she try to access when he/she not allowed to. */

    return this.auth.user$.pipe(map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}); // we use queryParams to send any optional parameters
        return false;
      }
    }));
  }
}
