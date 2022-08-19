import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZhengzhouDetailComponent } from './components/zhengzhou-detail/zhengzhou-detail.component';
import { ZhengzhouListComponent } from './components/zhengzhou-list/zhengzhou-list.component';

const routes: Routes = [
  {
    path: 'zzlist',
    data: { title: '郑-列表', reuse: true, key: 'zzlist' },
    component: ZhengzhouListComponent
  },
  {
    path: 'zzdetail',
    data: { title: '郑-详情', reuse: true, key: 'zzdetail' },
    component: ZhengzhouDetailComponent
  },
  {
    path: '',
    redirectTo: 'zzlist',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZhengzhouCompRoutes { }