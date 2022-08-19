import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zhengzhou-list',
  templateUrl: './zhengzhou-list.component.html',
  styleUrls: ['./zhengzhou-list.component.scss']
})
export class ZhengzhouListComponent implements OnInit {

  zhengzhouListSerachKey: string = '';
  
  constructor() { }

  ngOnInit() {
  }

}
