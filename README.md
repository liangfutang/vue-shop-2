# vue-shop-2项目简介
管理后台的前端页面相关实现，可以通过下面相关指令启动运行。为支撑当前后台页面的相关功能，提供了后端接口实现项目: boot-shop（在本github库中git地址为`git@github.com:liangfutang/boot_shop.git`）,该后端项目无需其他配置，直接启动即可，内部默认使用`7777`端口，项目没有整合数据库相关，所有数据均存储在内存中。如有被占用，可按照下面方案修改: <br>
一. 修改本地被占用的端口，将该`7777`端口让给`boot-shop`使用<br>
二. 找一个没被占用的端口号，将本后台页面`main.js`中`axios.defaults.baseURL`的端口号改为该可用端口号，并且修改`boot-shop`后端项目的`WebConfiguration.java`中端口号为该可用端口号


# vue-shop-2相关指令

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
