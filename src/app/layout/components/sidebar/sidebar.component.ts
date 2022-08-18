import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // 打开菜单项
  openMenu: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  /**
   * 路由方式添加tab
   * @param routeUrl
   */
  tabs(routeUrl: string) {
    this.router.navigate([routeUrl]);
  }

}
