import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'suzhou',
    data: {reuse: true},
    loadChildren: () => import('./business/suzhou-comp/suzhou-comp.module').then(m => m.SuzhouCompModule),
  },
  {
    path: 'zhengzhou',
    data: {reuse: true},
    loadChildren: () => import('./business/zhengzhou-comp/zhengzhou-comp.module').then(m => m.ZhengzhouCompModule),
  },
  {
    path: '',
    redirectTo: 'suzhou',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
