// 参考文献: https://ng.ant.design/docs/global-config/zh

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
    // 注意组件名称没有 nz 前缀
    message: { nzTop: 120, nzDuration: 3000 },
    notification: { nzTop: 240 },
    spin: { }
};


export const ngZorroConfigProvider = { provide: NZ_CONFIG, useValue: ngZorroConfig }
