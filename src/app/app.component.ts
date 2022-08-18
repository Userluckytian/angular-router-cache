import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-router-cache';

  menuList = [
    {
      title: "One",
      url: "suzhou",
      closableTab: false
    },
    {
      title: "Two",
      url: "zhengzhou",
      closableTab: false
    },
  ]
  constructor(
    private router: Router
  ) {
    this.onNavigationEnd();
  }
  /**
   * 订阅路由事件 NavigationEnd，如果存在 menuList 就激活，不存在就添加
   *
   * @memberof AppComponent
   */
  onNavigationEnd() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const path = event.url;
        let perm = this.permissions.find((e: any) => e.url == path);
        if (!perm) {
          if (path === '/index') {
            perm = {
              url: path,
              display_name: '后台首页'
            };
          } else {
            return;
          }
        }
        this.titleService.setTitle(perm.display_name);
        this.menuList.forEach((p: any) => p.select = false);
        const exitMenu = this.menuList.find((e: { path: any; }) => e.path == perm.url);
        if (exitMenu) {// 如果存在不添加，当前表示选中
          this.menuList.forEach((p: any) => p.select = p.path == exitMenu.path);
          return;
        }
        this.menuList.push({
          title: perm.display_name,
          path: perm.url,
          select: true
        });
      }
    });
  }
  

  /**
   * 关闭 tab 标签
   *
   * @param {(string | number)} path
   * @param {boolean} select
   * @return {*} 
   * @memberof AppComponent
   */
  closeUrl(path: string | number, select: boolean) {
    // 当前关闭的是第几个路由
    let index = this.menuList.findIndex((p: any) => p.path == path);
    // 如果只有一个不可以关闭
    if (this.menuList.length == 1 || select == false) {
      return;
    }
    this.menuList = this.menuList.filter((p: any) => p.path != path);
    // 删除复用
    delete ReuseStrategy.handlers[path];
    if (!select) {
      return;
    }
    // 显示上一个选中
    index = index === 0 ? 0 : index - 1;
    let menu = this.menuList[index];
    this.menuList.forEach((p: any) => p.select = p.path == menu.module);
    // 显示当前路由信息
    this.router.navigate([menu.path]);
  }

  /**
   * 当刷新网页的时候把当前页面放入 tab
   *
   * @memberof AppComponent
   */
  pushCurrTab() {
    const currPerm = this.permissions.find(e => e.url == this.router.url);
    if (currPerm) {
      this.titleService.setTitle(currPerm.display_name);
      this.menuList.push({
        title: currPerm.display_name,
        path: currPerm.url,
        select: true
      });
    } else {
      this.menuList.push({
        title: '后台首页',
        path: '/index',
        select: true
      });
    }
  }

}
