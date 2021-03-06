import { ElementRef, enableProdMode } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from 'src/app/services/material.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReadVarExpr } from '@angular/compiler';
import { Category } from 'src/app/models/Category.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

    @ViewChild('input') inputRef: ElementRef
    form: FormGroup
    isNew = true
    image: File
    imagePreview 
    category:Category
  
    constructor(private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private router: Router) {
}

    ngOnInit() {
        this.form = new FormGroup({
          name: new FormControl(null, Validators.required)
        })
    
        this.form.disable()
    
        this.route.params
          .pipe(
            switchMap(
              (params: Params) => {
                if (params['id']) {
                  this.isNew = false
                  return this.categoriesService.getById(params['id'])
                }
    
                return of(null)
              }
            )
          )
          .subscribe(
           (category: Category) => {
              if (category) {
                  this.category = category
                this.form.patchValue({
                  name: category.name
                })
                this.imagePreview = category.imageSrc
                MaterialService.updateTextInputs()
              }
    
              this.form.enable()
            },
            error => MaterialService.toast(error.error.message)
          )
      }
    
  deleteCategory() {
    const decision = window.confirm(`Are you sure that you'd like to delete "${this.category.name}?"`)

    if (decision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

      triggerClick(){
        this.inputRef.nativeElement.click()
      }
      onFileUpload(event: any){
        const file = event.target.files[0]
        this.image = file

        const reader = new FileReader()

        reader.onload = () => {
            this.imagePreview = reader.result
        }
        reader.readAsDataURL(file)
      }

      onSubmit() {
        let obs$

          this.form.disable()
          if(this.isNew){
              obs$ = this.categoriesService.create(this.form.value.name, this.image)
          } else{
            obs$ = this.categoriesService.update(this.category._id,this.form.value.name, this.image)
          }
          obs$.subscribe(
              category => {
                this.category = category
                MaterialService.toast('Changes are saved')
                this.form.enable()
              },
              error => {
                MaterialService.toast(error.error.message)
                this.form.enable()
              }
          )
      }
}
