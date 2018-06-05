# 安装库用yarn
```shell
// 安装库
yarn install
// 编译typescript
yarn run tsc
```

# 目录结构 参考[ignite](https://github.com/infinitered/ignite/blob/master/docs/quick-start/project-structure.md)
```
├─app               // 代码目录
│  ├─actions        // action
│  ├─common         // 在其他项目中也可以使用的通用的代码
│  │  ├─components  // 通用基本组件
│  │  └─utils       // 通用接口
│  ├─components     // 组件(不需要store中state)
│  ├─configs        // 配置
│  ├─constants      // 常量
│  ├─containers     // 容器组件(一般是需要从store获取state的)
│  ├─reducers       // reducer
│  ├─sagas          // saga
│  ├─store          // store配置,以及state的定义
│  ├─styles         // 主题,布局
│  └─__tests__      // 测试代码
├─lib               // typescript编译后的js代码不要自己修改
├─node_modules      // 库
├─test_server       // 测试用的server,用来测试http请求
└─types             // 对于一些不支持typescript的js库,在这个目录里面添加ts的支持
```


# 开发调试工具
1. [reactotron](https://github.com/infinitered/reactotron)

[ConfigutrStore.ts](./app/store/ConfigureStore.ts)文件中配置了Reactotron作为开发工具,跟踪redux状态
```js
//TODO 下面三个import是调试工具,在编译release版本的时候需要注释掉
import Reactotron from 'reactotron-react-native';
import * as reactotronReduxSaga from 'reactotron-redux-saga'
import {reactotronRedux} from 'reactotron-redux'
```

# 问题

1. `run-android` 失败
执行的时候偶尔出现下面的错误,没有细查,通常在编译一次,或者删除`android\build`目录下面的文件之后再编译,就可以通过
```
Execution failed for task ':app:prepareShengXianReactNativeSplashScreenUnspecifiedLibrary'.
> Could not expand ZIP 'F:\react\ShengXian\node_modules\react-native-splash-screen\android\build\outputs\aar\react-native-splash-screen-release.aar'.
```