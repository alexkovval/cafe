import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/Category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

    categories$: Observable<Category[]>

    constructor(private categoriesService: CategoriesService) {
    }
  
    ngOnInit() {
      this.categories$ = this.categoriesService.fetch()
      .pipe(
        map(
          (categories: Category[]) => {
            return categories.map(category => {
                return category
            })
          }
        )
      )      
    }
}