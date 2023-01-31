// credit for this workaround goes to dmitrimaltsev and ishor13. see https://github.com/angular/angular/issues/13869
// slightly modified to update redirects when a route is reused
// 参考文献见： https://javascript.plainenglish.io/routereusestrategy-simplified-in-angular-2e358db618d9


import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { ComponentRef, Injectable } from '@angular/core'

interface IRouteConfigData {
  reuse: boolean;
}

interface ICachedRoute {
  handle: DetachedRouteHandle;
  data: IRouteConfigData;
}

@Injectable(
)
export class MaltsevRouteReuseStrategy implements RouteReuseStrategy {

  private static routeCache = new Map<string, ICachedRoute>();

  constructor() { }

  /** 
   * 这个方法每次切换路由时都会被调用， 判断是否同一路由（返回false，则路由发生变化并且其余方法会被调用。否则，路由不会跳转，其余方法不会被调用）
   *
   * @param {ActivatedRouteSnapshot} future 将要离开的路由
   * @param {ActivatedRouteSnapshot} curr 将要加载的路由
   * @return {*}  {boolean} 返回true，路由将不会跳转（意味着路由没有发生变化）。返回false，则路由发生变化并且其余方法会被调用。
   * @memberof RouteStrategyService
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let ret = future.routeConfig === curr.routeConfig;
    if (ret) {
      this.addRedirectsRecursively(future); // update redirects
    }
    return ret;
  }

  /**
   * 若 path 在缓存中有的都认为允许还原路由
   *
   * @param {ActivatedRouteSnapshot} route
   * @return {*}  {boolean}
   * @memberof RouteStrategyService
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = this.getFullRouteUrl(route);
    return MaltsevRouteReuseStrategy.routeCache.has(url);
  }

  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const data = this.getRouteData(route);
    return data && data.reuse;
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const url = this.getFullRouteUrl(route);
    const data = this.getRouteData(route);
    MaltsevRouteReuseStrategy.routeCache.set(url, { handle, data });
    this.addRedirectsRecursively(route);
  }

  /**
   * 从缓存中获取快照，若无则返回nul
   *
   * @param {ActivatedRouteSnapshot} route
   * @return {*}  {(DetachedRouteHandle | null)}
   * @memberof RouteStrategyService
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const url = this.getFullRouteUrl(route);
    const data = this.getRouteData(route);
    const handle = (MaltsevRouteReuseStrategy.routeCache.get(url) as ICachedRoute).handle;
    return data && data.reuse && MaltsevRouteReuseStrategy.routeCache.has(url)
      ? handle
      : null;
  }

  private addRedirectsRecursively(route: ActivatedRouteSnapshot): void {
    const config = route.routeConfig;
    if (config) {
      if (!config.loadChildren) {
        const routeFirstChild = route.firstChild;
        const routeFirstChildUrl = routeFirstChild
          ? this.getRouteUrlPaths(routeFirstChild).join('/')
          : '';
        const childConfigs = config.children;
        if (childConfigs) {
          const childConfigWithRedirect = childConfigs.find(c => c.path === '' && !!c.redirectTo);
          if (childConfigWithRedirect) {
            childConfigWithRedirect.redirectTo = routeFirstChildUrl;
          }
        }
      }
      route.children.forEach(childRoute => this.addRedirectsRecursively(childRoute));
    }
  }

  private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
    const path = this.getFullRouteUrlPaths(route).filter(Boolean).join('/')
    return path;
  }

  private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
    const paths = this.getRouteUrlPaths(route);
    return route.parent
      ? [...this.getFullRouteUrlPaths(route.parent), ...paths]
      : paths;
  }

  private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
    return route.url.map(urlSegment => urlSegment.path);
  }

  private getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData {
    return (route.routeConfig && route.routeConfig.data) as IRouteConfigData;
  }

  // 参考：https://github.com/xccjh/scholar-angular-demo/blob/9edbc9e37dfe5da7458e62cd3356fa094eaa8591/core/routereuse/atr-reuse-strategy.ts

  /**
   * 辅助函数：删除快照
   *
   * @static
   * @param {string} url
   * @memberof RouteStrategyService
   */
  static deleteRouteSnapshot(key: string): void {
    if (MaltsevRouteReuseStrategy.routeCache.has(key)) {
      const handle: any = (MaltsevRouteReuseStrategy.routeCache.get(key) as ICachedRoute).handle;
      try {
        const tempComponentRef: ComponentRef<any> = handle.componentRef;
        tempComponentRef.destroy();
      } catch (e) { throw e }
      MaltsevRouteReuseStrategy.routeCache.delete(key);
    }
  }

  /**
   * 辅助函数：删除全部快照
   *
   * @static
   * @param {string} url
   * @memberof RouteStrategyService
   */
  static deleteAllRouteSnapshot(): void {
    const allRouteCache = MaltsevRouteReuseStrategy.routeCache;
    for (const ite of allRouteCache) {
      const key = ite[0];
      MaltsevRouteReuseStrategy.deleteRouteSnapshot(key)
    }
  }
}