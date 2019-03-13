import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../../models/product';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from '../../models/shopping-cart';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  private create() {
    return this.db.list('shopping-carts').push({dateCreated: new Date().getTime()}); // this return a promise
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(map(x => new ShoppingCart(x.payload.val().items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cardId = localStorage.getItem('cartId');
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async manipulateCart(product: Product, action: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1), map(a => {
      const data = a.payload.val();
      const key = a.payload.key;
      return {key, ...data};
    })).subscribe(item => {
      item$.update({product, quantity: (item.quantity || 0) + action});
    });
  }

  addToCart(product: Product) {
    this.manipulateCart(product, 1);
  }

  removeFromCart(product: Product) {
    this.manipulateCart(product, -1);
  }
}
