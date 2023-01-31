import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { zorroModule } from './third_lib/Zorro/zorro_Modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
// 语言服务
import { I18NConfigProvider } from './I18NConfig(✔)/I18N.config';
import { HeaderComponent } from './layout/components/header/header.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { RouterTabComponent } from './layout/components/router-tab/router-tab.component';
import { HttpClientModule } from '@angular/common/http';
// zorro的全局配置服务
import { ngZorroConfigProvider } from './GlobalConfig(unFinish)/global.config';
// 缓存策略
import { MaltsevRouteReuseStrategy } from './services/route-strategy.service.(✔)';
import { CustomReuseTestStrategy } from './services/route-strategy.service.two(✔)';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RouterTabComponent
  ],
  imports: [
    zorroModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    I18NConfigProvider,
    ngZorroConfigProvider,
    { provide: RouteReuseStrategy, useClass: MaltsevRouteReuseStrategy }, // 参考：https://stackblitz.com/edit/angular-routereusestrategy-demo?file=src%2Fapp%2Fapp.module.ts,src%2Fapp%2Fmaltsev-reuse.ts
    // { provide: RouteReuseStrategy, useClass: RouteStrategyService }, // 参考：https://blog.csdn.net/qq_41243979/article/details/121524814
    // { provide: RouteReuseStrategy, useClass: RouteStrategyTempService }, // 参考：https://blog.csdn.net/qq_41243979/article/details/121524814
    // { provide: RouteReuseStrategy, useClass: CustomReuseTestStrategy }, // 参考：https://stackblitz.com/edit/angular-ivy-zvzxuq?file=src%2Fapp%2Fapp.component.ts
    // { provide: RouteReuseStrategy, useClass: ReuseStrategy }, // 参考：https://blog.csdn.net/weixin_45917491/article/details/120216253
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
