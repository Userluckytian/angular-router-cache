// 参考文献: https://ng.ant.design/docs/i18n/zh

/** 导入需要使用的 Angular 语言包 **/
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';

/** 导入需要使用的语言包 **/
registerLocaleData(en);
registerLocaleData(zh);

/** 配置 ng-zorro-antd 国际化 **/
import { en_US, NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

export const I18NConfigProvider = {
    provide: NZ_I18N,
    useFactory: (localId: string) => {
        switch (localId) {
            case 'en':
                return en_US;
            case 'zh':
                return zh_CN;
            default:
                return zh_CN;
        }
    },
    deps: [LOCALE_ID]
};



