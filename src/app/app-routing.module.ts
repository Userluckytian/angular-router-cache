import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'overview',
    data: { title: '总览页面', reuse: true, key: 'overview' },
    loadChildren: () => import('./business/overview/overview.module').then(m => m.OverviewModule),
  },
  {
    path: 'suzhou',
    data: { title: '测试-苏', reuse: true, key: 'suzhou' },
    loadChildren: () => import('./business/suzhou-comp/suzhou-comp.module').then(m => m.SuzhouCompModule),
  },
  {
    path: 'zhengzhou',
    data: { title: '测试-郑', reuse: true, key: 'zhengzhou' },
    loadChildren: () => import('./business/zhengzhou-comp/zhengzhou-comp.module').then(m => m.ZhengzhouCompModule),
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
