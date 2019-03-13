import {Component, Input} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  category$;
  @Input('category') category: string;

  constructor(categoryService: CategoryService) {
    this.category$ = categoryService.getAll();
  }

}
