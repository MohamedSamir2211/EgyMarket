import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products', ref => ref.orderByChild('title'))
      .snapshotChanges().pipe(map(product => {
        return product.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, ...data};
        });
      }));
  }

  get(pid) {
    return this.db.object('/products/' + pid);
  }

  update(pid, product) {
    return this.db.object('/products/' + pid).update(product);
  }

  delete(pid) {
    return this.db.object('/products/' + pid).remove();
  }
}
