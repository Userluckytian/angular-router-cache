import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle, RouterStateSnapshot } from '@angular/router';

/**
 * 路由复用策略
 */
export class RouteStrategyService implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};
  private static waitDelete: string | null;

  /** （方法1）
   * 这个方法每次切换路由时都会被调用， 判断是否同一路由（返回false，则路由发生变化并且其余方法会被调用。否则，路由不会跳转，其余方法不会被调用）
   *
   * @param {ActivatedRouteSnapshot} future 将要离开的路由
   * @param {ActivatedRouteSnapshot} curr 将要加载的路由
   * @return {*}  {boolean} 返回true，路由将不会跳转（意味着路由没有发生变化）。返回false，则路由发生变化并且其余方法会被调用。
   * @memberof RouteStrategyService
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.debug('CustomReuseStrategy:shouldReuseRoute', future, curr);
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  /**
   * 若 path 在缓存中有的都认为允许还原路由
   *
   * @param {ActivatedRouteSnapshot} route
   * @return {*}  {boolean}
   * @memberof RouteStrategyService
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.debug('CustomReuseStrategy:shouldAttach', route);
    return !!RouteStrategyService.handlers[this.getRouteUrl(route)];
  }

  /**
   * 从缓存中获取快照，若无则返回nul
   *
   * @param {ActivatedRouteSnapshot} route
   * @return {*}  {(DetachedRouteHandle | null)}
   * @memberof RouteStrategyService
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    console.debug('CustomReuseStrategy:retrieve', route);
    if (!route.routeConfig) {
      return null;
    }
    return RouteStrategyService.handlers[this.getRouteUrl(route)];
  }


  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.debug('CustomReuseStrategy:shouldDetach', route);
    return  !!route.data && !!(route.data as any).reuse;
  }

  /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.debug('CustomReuseStrategy:store', route, handle);
    // if (RouteStrategyService.waitDelete && RouteStrategyService.waitDelete === this.getRouteUrl(route)) {
    //   // 如果待删除是当前路由则不存储快照
    //   RouteStrategyService.waitDelete = null;
    //   return;
    // }

    // console.log('这次我存储了', this.getRouteUrl(route), RouteStrategyService.handlers);
    if(RouteStrategyService.handlers[this.getRouteUrl(route)]){
      return;
    }
    RouteStrategyService.handlers[this.getRouteUrl(route)] = handle;
  }





  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return ((route as any)._routerState.url).replace(/\//g, '_');
  }

  /**
   * 删除快照
   *
   * @static
   * @param {string} url
   * @memberof RouteStrategyService
   */
  public static deleteRouteSnapshot(url: string): void {
    const key = url.replace(/\//g, '_');
    if (RouteStrategyService.handlers[key]) {
      delete RouteStrategyService.handlers[key];
    } else {
      RouteStrategyService.waitDelete = key;
    }
  }
}
