### 活动项目构建文档
#### wisdomtmt_activity/activity_build 目录结构
```tree
.
|-- dist 打包文件
|-- gulpfile.js gulp配置文件
|-- package.json
|-- rev 版本文件
|-- src 源文件
|   |-- public
|   |   |-- components 组件
|   |   |   |-- tmt-loading.vue
|   |   |   |-- tmt-msgbox.js
|   |   |   `-- tmt-msgbox.vue
|   |   |-- css
|   |   |   |-- common.css
|   |   |   `-- start_signup.css
|   |   |-- fonts
|   |   |   |-- icomoon.eot
|   |   |   |-- icomoon.svg
|   |   |   |-- icomoon.ttf
|   |   |   `-- icomoon.woff
|   |   |-- img
|   |   |   `-- signup-bkg.jpg
|   |   `-- javascript
|   |       |-- common.js
|   |       |-- flexible.debug.js
|   |       |-- flexible_css.debug.js
|   |       |-- md5.min.js
|   |       `-- start_signup.js
|   `-- start_signup.html 页面
`-- webpack.config.js webpack配置文件
```

#### 功能
- ES6语法编译
- css预编译(less/sass/postcss/stylus)
- 代码模块化
- vue 组件化
- 根据分支切换api地址
- 静态资源MD5非覆盖式发布

#### 使用方法
- ```npm i/cnpm i```安装依赖包
- 入口文件js放在src/public/javascript文件夹下，webpacl.config.js是webpack的配置文件，入口文件需要手动添加到配置文件中
```javascript
var entry = {
      // 入口文件
      start_signup : './src/public/javascript/start_signup.js'
    }
```
- 添加好入口文件后，执行命令```npm run watch```，使用了webpack watch增量更新打包文件，可以看到dist目录生成了start_signup.bundle.js文件，需要将它以script标签的方式添加到html中，并且在8080端口启动了express服务器，在 http://192.168.99.100:8080/src/start_signup.html 中可以调试开发
```html
<script type="text/javascript" src="../dist/start_signup.bundle.js"></script>
```
- 在start_signup.js中自由只用es6语法，import/export引入或者导出模块，比如：
```javascript
import '../css/start_signup.css'
```
webpack 会另外打包出start_signup.bundle.css文件在dist目录下，然后再手动添加link标签到html中
```html
<link rel="stylesheet" href="../dist/start_signup.bundle.css" media="screen" title="no title">
```
- 在开发完页面后，执行命令```npm run watch```，gulp会将css/js生成对应的MD5版本，再将src中html文件中的路径替换再输出到dist中，在 http://192.168.99.100:8080/dist/start_signup.html 中可以看到静态资源(img/css/js)全部替换成MD5版本，就可以提交到远程仓库了

#### npm命令
- ```npm run clean``` 清理dist/rev目录下文件，在场次提交完成后，需要对代码进行维护/更新就需要清理一次重新打包发布

- ```npm run watch``` 执行webpack watch 打包文件，并且增量更新代码
- ```npm run dev``` 生成MD5版本静态资源并且替换路径
- ```npm run build``` 代码压缩版的```npm run dev```

#### vue 组件使用
每个组件设计api不同，用法也不一样，这里演示下*loading*动画的使用，在js文件中引入组件：
```javascript
import loading from '../components/tmt-loading.vue'
```
在vue实例中注册component
```javascript
const vm = new Vue({
  el : '',
  data(){
    return {
      loading_show :false
    }
  },
  components:{ loading }
})
```
在html中添加组件
```html
<loading v-show="loading_show"></loading>

```
然后就可以通过更改*loading_show*的值实现开关loading
