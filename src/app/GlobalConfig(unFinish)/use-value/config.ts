import { Provider } from "@angular/core";
import { CustomValueConfig, Custom_VALUE_CONFIG } from "./custom.value.config";
export const customValueConfig: CustomValueConfig = {
    student: {
      age: 18,
      name: '张三'
    },
    introduce: `I'am ZhangSan，from China，now is living in beijing`
};

export const CustomValueConfigProvider: Provider = {
    provide: Custom_VALUE_CONFIG,
    useValue: customValueConfig,
    deps: [] // 依赖什么吗？ 无
};