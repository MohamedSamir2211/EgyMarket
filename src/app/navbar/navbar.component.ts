import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {AppUser} from '../models/app-user';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.getUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
