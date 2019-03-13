import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    // return list of categories and sort them in alphabetically order
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(map(category => {
        return category.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, ...data};
        });
      }));
  }
}
