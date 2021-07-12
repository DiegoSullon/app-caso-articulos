import { Component, Input, OnInit } from '@angular/core';
import article from 'src/app/models/article';
import { getUrl } from 'src/app/utils/utils';

@Component({
  selector: 'case-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  article?: article
  getUrl = getUrl;
  imagen: string = ''
  constructor() { }

  ngOnInit(): void {
    
  }

}
