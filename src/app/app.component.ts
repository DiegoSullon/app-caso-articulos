import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import article from './models/article';
import { ArticleService } from './services/article.service';
@Component({
  selector: 'case-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  radioGroupForm: FormGroup ;
  articles: article[] = [];
  sortOptions: string[] =[ 'nombre', 'precioVenta'];
  sortOption: string
  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {
    this.radioGroupForm = this.formBuilder.group({
      'asc': true
    });
    this.sortOption = this.sortOptions[0];
    this.radioGroupForm.get('asc')?.valueChanges.subscribe(x =>{
      this.getArticles(x);
    });
  }

  ngOnInit() {
    this.getArticles(this.radioGroupForm.value['asc']);
    
  }
  getArticles = (asc:boolean) => {
    this.articleService.getArticlesSort(asc,this.sortOption).subscribe(data => {
      this.articles = data;
      console.log(this.articles);
    })
  }
  changeSort = (index:number) => {
    this.sortOption = this.sortOptions[index]
    this.getArticles(this.radioGroupForm.value['asc']);
  }
}
