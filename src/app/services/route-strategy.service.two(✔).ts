/**
 * 参考文献（1）：https://github.com/angular/angular/issues/26681 
 * 参考文献（2）：https://stackblitz.com/edit/angular-ivy-zvzxuq?file=src%2Fapp%2Fapp.module.ts
 * 和第一个相比，不足之处是：删除快照的功能没写
 */ 


import {
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot,
  Route,
} from '@angular/router';

export class CustomReuseTestStrategy implements RouteReuseStrategy {
  private handlers = new Map<Route, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true; // 全部复用
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers.set(this.calcPath(route), handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers.get(this.calcPath(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.handlers.get(this.calcPath(route)) || null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  private calcPath(route: ActivatedRouteSnapshot) {
    return route.routeConfig as Route;
  }
}