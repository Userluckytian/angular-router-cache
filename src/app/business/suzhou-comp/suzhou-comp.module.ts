import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuzhouCompComponent } from './suzhou-comp.component';
import { SuzhouDetailComponent } from './components/suzhou-detail/suzhou-detail.component';
import { SuzhouListComponent } from './components/suzhou-list/suzhou-list.component';
import { SuzhouCompRoutes } from './suzhou-comp.routing';
import { zorroModule } from 'src/app/third_lib/Zorro/zorro_Modules';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    FormsModule,
    zorroModule,
    SharedModule,
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
