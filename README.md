# yunmusic

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

------------------------------2019·10·17------------------------------

修复了音乐播放完不能切换下一首

修复了better-scroll插件触发两次点击事件导致每次点击删除预播放列表的音乐会出
现删除两首音乐的问题

修复了自动切换下一首音乐发起多次ajax请求等问题

添加了预播放列表、预播放列表当前播放音乐高亮、当遇到无版权音乐时会自动切换下一
首等功能


------------------------------2019·10·18------------------------------

修复了每次删除playlist列表中几首音乐后，拖拉进度条切换下一首音乐，再回到
playlist页面，会无法滚动playlist列表的问题

修复当显示playlist列表时鼠标拖拉遮罩层层或鼠标滚轮在遮罩层层滚动时外层页面会
滚动的问题

修复了因为better-scroll插件初始化的问题，导致第一次进入playlist列表，第一
次点击或拖动无法触发事件或列表滚动的问题

增加了进入预播放列表时当前播放音乐定位到顶部
