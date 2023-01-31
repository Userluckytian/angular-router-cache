
/**  
 * 下述所说参考的参考步骤：
 * （1）将import语句放开，即写在正确的代码行中，而不是注释中
 * （2）按住ctrl键 并 移动鼠标到对应的变量上， 按下鼠标左键查看其内容
 * -----------------------------------------------------------------------
 * 💡：（1）关于 CustomValueConfig，Custom_VALUE_CONFIG 的定义 可以看下这个是怎么写的!
 * 参考 import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config'; 
 * 
 * 💡：(2) 关于给any更换名称: 
 * 参考 import { NzSafeAny } from 'ng-zorro-antd/core/types';
 */
declare type CustomSafeAny = any; // 给any换个名字 

import { InjectionToken, TemplateRef, Type } from '@angular/core'; // 关于Type描述（可以鼠标悬浮到上面查看）： Type类型即指：可能是Component类型(组件类型) 或者 Object instance(实例对象类型) 

export interface CustomValueConfig {
    student: Student;
    introduce?: string | TemplateRef<CustomSafeAny> | Type<CustomSafeAny>;
}

export const Custom_VALUE_CONFIG = new InjectionToken<CustomValueConfig>('CUSTOM_VALUE');

export interface Student {
    name: string;
    age: number;
}