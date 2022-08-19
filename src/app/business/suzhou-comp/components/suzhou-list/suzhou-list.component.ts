import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suzhou-list',
  templateUrl: './suzhou-list.component.html',
  styleUrls: ['./suzhou-list.component.scss']
})
export class SuzhouListComponent implements OnInit {

  suzhouSearchKey: string = '';
  
  constructor() { }

  ngOnInit() {
  }

}
