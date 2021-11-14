import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({opacity: 0}), animate(1000, style({opacity: 1}))]),
      transition('* => void', [animate(1000, style({opacity: 0}))]),
    ]),
  ],
})
export class PageHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
