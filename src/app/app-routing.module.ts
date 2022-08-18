import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'suzhou',
    data: { title: '测试-苏', cache: true },
    loadChildren: () => import('./business/suzhou-comp/suzhou-comp.module').then(m => m.SuzhouCompModule),
  },
  {
    path: 'zhengzhou',
    data: { title: '测试-郑', cache: true },
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
