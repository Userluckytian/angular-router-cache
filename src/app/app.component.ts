import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzConfig, NzConfigService, NZ_CONFIG } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    @Inject(NZ_CONFIG) private globalconfig: NzConfig,
    private nzConfigService: NzConfigService
  ){
    console.log('🚀 ~ list', this.globalconfig);
  }

  ngOnInit(): void {}

  
}
