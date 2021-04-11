import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
    
    categories$: Observable<Category[]>

    constructor(private categoriesService: CategoriesService) {
    }
  
    ngOnInit() {
      this.categories$ = this.categoriesService.fetch()
    }
  

}
