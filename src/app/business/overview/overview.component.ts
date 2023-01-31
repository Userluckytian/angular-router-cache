import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Custom_VALUE_CONFIG } from 'src/app/GlobalConfig(unFinish)/use-value/custom.value.config';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(
    @Inject(Custom_VALUE_CONFIG) private config: any,
  ) {
    // const list = injector.get(Custom_VALUE_CONFIG);
    console.log('🚀 ~ list', this.config);
  }

  ngOnInit() {
  }

}
