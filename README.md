# SDWebMaintain

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
  
## 目录结构

``` bash
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 图片资源
│   ├── common                 // 全局公用文件
│   │    └── font              // 字体文件
│   ├── components             // 全局UI组件
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── utils                  // 全局公用方法
│   ├── view                   // view界面
│   │    ├── details           //详情管理UI组件
│   │    ├── userStastics      //用户统计UI组件
│   │    ├── education         //继续教育UI组件
│   │    └── login             //登录界面
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源
├── .babelrc                   // babel-loader 配置
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
```