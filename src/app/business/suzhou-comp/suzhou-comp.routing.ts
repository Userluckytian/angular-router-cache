import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuzhouDetailComponent } from './components/suzhou-detail/suzhou-detail.component';
import { SuzhouListComponent } from './components/suzhou-list/suzhou-list.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '苏-列表', cache: true },
    component: SuzhouListComponent
  },
  {
    path: 'detail',
    data: { title: '苏-详情', cache: true },
    component: SuzhouDetailComponent
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
export class SuzhouCompRoutes { }
