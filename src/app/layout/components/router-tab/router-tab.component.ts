import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { NzTabComponent } from 'ng-zorro-antd/tabs';
import { filter, map, mergeMap, of } from 'rxjs';
import { RouteStrategyService } from 'src/app/services/route-strategy.service';

@Component({
  selector: 'app-router-tab',
  templateUrl: './router-tab.component.html',
  styleUrls: ['./router-tab.component.scss']
})
export class RouterTabComponent implements OnInit {

  // 路由列表
  menuList: any = [];
  // 当前选择的tab index
  currentIndex = -1;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.onNavigationEnd();
  }

  ngOnInit(): void {
  }

  /**
   * 订阅路由事件 NavigationEnd，如果存在 menuList 就激活，不存在就添加
   *
   * @memberof AppComponent
   */
  onNavigationEnd() {
    // 路由事件
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event: any) => {
      console.log('🚀 ~ event', event);
      // 路由data的标题
      const menu = { ...event };
      menu.url = this.router.url
      const url = menu.url;
      this.titleService.setTitle(menu.title); // 设置网页标题
      const exitMenu = this.menuList.find((info: any) => info.url === url);
      if (!exitMenu) {// 如果不存在那么不添加，
        this.menuList.push(menu);
      }
      this.currentIndex = this.menuList.findIndex((p: any) => p.url === url);
    });
  }

  // 关闭选项标签
  closeUrl(url: string) {
    // 当前关闭的是第几个路由
    const index = this.menuList.findIndex((p: { url: string; }) => p.url === url);
    // 如果只有一个不可以关闭
    if (this.menuList.length === 1) {
      return;
    }
    this.menuList.splice(index, 1);
    setTimeout(() => {
      // 删除复用
      RouteStrategyService.deleteRouteSnapshot(url)
    }, 0);
    // 如果当前删除的对象是当前选中的，那么需要跳转
    if (this.currentIndex === index) {
      // 显示上一个选中
      let menu = this.menuList[index - 1];
      if (!menu) {// 如果上一个没有下一个选中
        menu = this.menuList[index];
      }
      // 跳转路由
      this.router.navigate([menu.url]);
    }
  }
  /**
   * tab发生改变
   */
  nzSelectChange($event: any) {
    this.currentIndex = $event.index || -1;
    const menu = this.menuList[this.currentIndex];
    // 跳转路由
    if (menu) {
      this.router.navigate([menu.url]);
    }
  }

}
