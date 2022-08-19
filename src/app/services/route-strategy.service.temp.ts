import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/**
 * 路由复用策略
 */
export class RouteStrategyTempService implements RouteReuseStrategy {

  handlers: { [key: string]: DetachedRouteHandle } = {};


  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[this.getKey(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers[this.getKey(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) {
      return null;
    }
    return this.handlers[this.getKey(route)];
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return curr.routeConfig === future.routeConfig;
  }

  private getKey(route: ActivatedRouteSnapshot) {
    let key: string;
    if (route.component) {
      key = route.component['name'];
    } else {
      key = (route as any).firstChild.component['name'];
    }
    return key;
  }
}
