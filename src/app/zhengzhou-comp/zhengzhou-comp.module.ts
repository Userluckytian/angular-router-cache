import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhengzhouCompComponent } from './zhengzhou-comp.component';
import { ZhengzhouCompRoutes } from './zhengzhou-comp.routing';
import { ZhengzhouDetailComponent } from './components/zhengzhou-detail/zhengzhou-detail.component';
import { ZhengzhouListComponent } from './components/zhengzhou-list/zhengzhou-list.component';

@NgModule({
  imports: [
    ZhengzhouCompRoutes,
    CommonModule,
  ],
  declarations: [
    ZhengzhouCompComponent,
    ZhengzhouDetailComponent,
    ZhengzhouListComponent
  ]
})
export class ZhengzhouCompModule { }
