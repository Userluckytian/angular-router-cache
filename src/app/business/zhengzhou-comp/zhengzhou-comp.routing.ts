import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZhengzhouDetailComponent } from './components/zhengzhou-detail/zhengzhou-detail.component';
import { ZhengzhouListComponent } from './components/zhengzhou-list/zhengzhou-list.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '郑-列表', cache: true },
    component: ZhengzhouListComponent
  },
  {
    path: 'detail',
    data: { title: '郑-详情', cache: true },
    component: ZhengzhouDetailComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZhengzhouCompRoutes { }