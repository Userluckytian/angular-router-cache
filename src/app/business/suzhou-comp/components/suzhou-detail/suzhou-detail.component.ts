import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suzhou-detail',
  templateUrl: './suzhou-detail.component.html',
  styleUrls: ['./suzhou-detail.component.scss']
})
export class SuzhouDetailComponent implements OnInit {

  suzhouDetailSearchKey: string = '';

  constructor() { }

  ngOnInit() {
  }

}
