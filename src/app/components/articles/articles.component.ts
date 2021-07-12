import { Component, Input, OnInit } from '@angular/core';
import article from 'src/app/models/article';

@Component({
  selector: 'case-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  @Input()
  articles: article[] = []
  constructor() { }

  ngOnInit(): void {
  }
}
