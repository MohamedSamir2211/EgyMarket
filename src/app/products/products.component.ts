import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ShoppingCartService} from '../services/shopping-cart/shopping-cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[] = [];
  filterdProducts: any[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(private productService: ProductService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
    productService.getAll().pipe(switchMap(
      product => {
        this.products = product;
        return route.queryParamMap; // switch the first observable which the list of products to this second observable
      })).subscribe(params => {
      this.category = params.get('category');

      this.filterdProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

