import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhengzhouCompComponent } from './zhengzhou-comp.component';
import { ZhengzhouCompRoutes } from './zhengzhou-comp.routing';
import { ZhengzhouDetailComponent } from './components/zhengzhou-detail/zhengzhou-detail.component';
import { ZhengzhouListComponent } from './components/zhengzhou-list/zhengzhou-list.component';
import { zorroModule } from 'src/app/third_lib/Zorro/zorro_Modules';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    zorroModule,
    FormsModule,
    SharedModule,
    CommonModule,
    ZhengzhouCompRoutes,
  ],
  declarations: [
    ZhengzhouCompComponent,
    ZhengzhouDetailComponent,
    ZhengzhouListComponent
  ]
})
export class ZhengzhouCompModule { }
