---

   Author: zhuzhu
   Date: 2022-08-18 10:10:45

---


# 语言服务包配置和使用说明：
## `I18N.config.ts`文件配置说明:
1. 项目的语言配置服务均应该写在`I18N.config.ts`文件中，并默认导出`I18NConfig`配置项，最后在`App.Module.ts`文件中注入`I18NConfig`  
  <font size=2 color="gray">⭐tip1：目前只引入了中、英文两种语言服务！，如需修改，参见[支持语言](https://ng.ant.design/docs/i18n/zh#%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)  
  </font>  
2. 引入新的语言方式：比如引入日语：

   - 找到`import { en_US, NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';` 

   - 从[支持语言](https://ng.ant.design/docs/i18n/zh#%E6%94%AF%E6%8C%81%E8%AF%AD%E8%A8%80)中找到日语对应的值：`ja_JP`  
  
   - 修改1为：`import { en_US, NZ_I18N, zh_CN, ja_JP } from 'ng-zorro-antd/i18n';`

   - 增加如下代码:

         ```javascript
         ...
         import ja from '@angular/common/locales/ja';
         registerLocaleData(ja); // 日语
         ...
         export const I18NConfig = {
             provide: NZ_I18N,
             useFactory: (localId: string) => {
                 switch (localId) {
                     ...
                     case 'ja':
                         return ja_JP;
                     default:
                     ...
                 }
             },
             deps: [LOCALE_ID]
         };
         ```

        <font size=2 color="gray">⭐tip1：如果不知道自己要修改的语言的`case`项是什么，直接取前两位即可，比如：`en_US` -> `en`; `zh_CN` -> `zh`; `ja_JP` -> `ja`</font>  
        <font size=2 color="gray">⭐tip2：其实所有的I18N支持的语言都已经在`node_modules`包中了,所以正确的查找`case`值的方式是：鼠标悬浮到`import zh from '@angular/common/locales/zh'`中的`'@angular/common/locales/zh'`上;按住 <kbd>Ctrl</kbd>+<kbd>鼠标左键</kbd>会跳转到`node_modules`中对应的位置，可以看到全部的I18N的语言包名称，找到对应的即可！再往里的内容就需要自己深入了解了</font>  

## `I18N.service.ts`文件使用说明：
  1. 场景复现：语言切换功能，往往出现在网站的某个位置，通过点击操作来改变语言，所以我们需要写好对应的按钮，并触发点击事件。
  2. 功能实现简介：在对应的组件中引入`I18N.service.ts`文件，调用该文件的`switchLanguage`方法即可
  3. 详细举例：
      ```javascript
      import { Component } from '@angular/core';
      import { I18NService } from './I18N.service.ts';
      ...
      @Component({
      selector: 'your-component',
      templateUrl: './your.component.html',
      styleUrls: ['./your.component.scss']
      })
      export class YourComponent {
            constructor(private _i18NService: I18NService) 
            {
              ...
            }
            
              /**
              * 切换语言
              * @param {('en'| 'zh')} flag
              * @memberof YourComponent
              */
            changeLanguage(flag: 'en'| 'zh'){
                switch (flag) {
                  case 'en':
                      this._i18NService.switchLanguage(en_US); // 注意不是传的字符串！
                      break;
                  case 'zh':
                      this._i18NService.switchLanguage(zh_CN); // 注意不是传的字符串！
                      break;
                  default:
                      this._i18NService.switchLanguage(zh_CN); // 注意不是传的字符串！
                }
            }
      }
      ```
   

