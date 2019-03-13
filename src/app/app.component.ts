import {Component, OnDestroy} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from './services/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // get the returnUrl from localstorage to navigate the user to specific url when he/she login
  constructor(private auth: AuthService, private userService: UserService, router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user); // save the user in the firebase
        let returnUrl = localStorage.getItem('returnUrl'); // get the returnUrl from localstorage
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl); // navigate the user to specific page that he/she want to go
        }
      }
    });
  }
}
