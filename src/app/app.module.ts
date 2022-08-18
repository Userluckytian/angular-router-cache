import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteStrategyService } from './services/route-strategy.service';

// 语言服务
import { I18NConfigProvider } from './I18NConfig(✔)/I18N.config';
// zorro的全局配置服务
// import { ngZorroConfigProvider } from './GlobalConfig(unFinish)/global.config';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    I18NConfigProvider,
    // ngZorroConfigProvider,
    { provide: RouteReuseStrategy, useClass: RouteStrategyService }, // 参考：https://blog.csdn.net/qq_41243979/article/details/121524814
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
