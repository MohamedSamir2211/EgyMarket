import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AppUser} from '../../models/app-user';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  /* with this route instance of the ActivatedRoute class we can
       get the current route and extract the parameters of the url */
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login(providerInstance: firebase.auth.AuthProvider) {
    // get the parameter returnUrl or assign / to returnUrl if this parameter not exists
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(providerInstance);
  }

  logout() {
    localStorage.removeItem('returnUrl');
    this.afAuth.auth.signOut();
  }

  get getUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        }

        return of(null);
      }));
  }
}
