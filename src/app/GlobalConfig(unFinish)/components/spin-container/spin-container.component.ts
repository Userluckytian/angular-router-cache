import { AfterViewInit, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  standalone: true,
  selector: 'app-spin-container',
  imports: [NzSpinModule],
  template: `
    <nz-spin [nzTip]="tipText" [nzSpinning]="isLoading">
    <ng-container #viewComponentRef></ng-container>
    <!--  等下就插入到这里！ -->
    </nz-spin>
  `
})
export class SpinContainerComponent implements AfterViewInit {
  @ViewChild("viewComponentRef", { read: ViewContainerRef }) vc!: ViewContainerRef;
  tipText: string = '加载中';
  isLoading: boolean = false;
  constructor(
    private ref: ViewContainerRef,
  ) {

  }
  ngAfterViewInit() {
    const componentRef = this.ref.createComponent(SpinContainerComponent);
    this.vc.insert(componentRef.hostView);
  }
}

