import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutes } from './overview.routing';

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutes,
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
