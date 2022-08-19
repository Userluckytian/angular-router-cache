import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuzhouDetailComponent } from './components/suzhou-detail/suzhou-detail.component';
import { SuzhouListComponent } from './components/suzhou-list/suzhou-list.component';

const routes: Routes = [
  {
    path: 'szlist',
    data: { title: '苏-列表', reuse: true, key: 'szlist' },
    component: SuzhouListComponent
  },
  {
    path: 'szdetail',
    data: { title: '苏-详情', reuse: true, key: 'szdetail' },
    component: SuzhouDetailComponent
  },
  {
    path: '',
    redirectTo: 'szlist',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuzhouCompRoutes { }
