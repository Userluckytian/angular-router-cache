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


  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let ret = future.routeConfig === curr.routeConfig;
    if (ret) {
      this.addRedirectsRecursively(future); // update redirects
    }
    return ret;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const data = this.getRouteData(route);
    return data && data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const url = this.getFullRouteUrl(route);
    const data = this.getRouteData(route);
    MaltsevRouteReuseStrategy.routeCache.set(url, { handle, data });
    this.addRedirectsRecursively(route);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = this.getFullRouteUrl(route);
    return MaltsevRouteReuseStrategy.routeCache.has(url);
  }

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