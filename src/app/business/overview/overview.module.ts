import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutes } from './overview.routing';
import { CustomValueConfigProvider } from 'src/app/GlobalConfig(unFinish)/use-value/config';
@NgModule({
  imports: [
    CommonModule,
    OverviewRoutes,
  ],
  declarations: [OverviewComponent],
  providers: [
    CustomValueConfigProvider,
  ]
})

export class OverviewModule { }