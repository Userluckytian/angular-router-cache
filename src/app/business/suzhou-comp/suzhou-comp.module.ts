import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuzhouCompComponent } from './suzhou-comp.component';
import { SuzhouDetailComponent } from './components/suzhou-detail/suzhou-detail.component';
import { SuzhouListComponent } from './components/suzhou-list/suzhou-list.component';
import { SuzhouCompRoutes } from './suzhou-comp.routing';

@NgModule({
  imports: [
    SuzhouCompRoutes,
    CommonModule,
  ],
  declarations: [
    SuzhouCompComponent,
    SuzhouDetailComponent,
    SuzhouListComponent,
  ]
})
export class SuzhouCompModule { }
