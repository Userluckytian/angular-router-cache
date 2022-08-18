import { Injectable } from '@angular/core';
import { en_US, zh_CN, NzI18nService, NzI18nInterface } from 'ng-zorro-antd/i18n';

@Injectable({
  providedIn: 'root'
})
export class I18NService {

  constructor(
    private i18n: NzI18nService
  ) { }

  /**
   * 更换语言
   * 参考文献: https://ng.ant.design/docs/i18n/zh#%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80
   * 示例：switchLanguage(zh_CN) // 注意不是传的字符串！
   * @memberof I18NService
   */
  switchLanguage(language: NzI18nInterface) {
    this.i18n.setLocale(language);
  }

}
