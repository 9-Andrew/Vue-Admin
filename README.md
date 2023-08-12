<h1 align="center">
    <img src="https://img1.imgtp.com/2023/06/02/dih93Zck.png" alt="Logo">
</h1>
<p align="center">
    <a href="https://github.com/vuejs/vue">
      <img src="https://img.shields.io/badge/vue-3.3.4-brightgreen" alt="vue">
    </a>
    <a href="https://github.com/ElemeFE/element">
      <img src="https://img.shields.io/badge/element--plus-2.3.7-brightgreen" alt="element-plus">
    </a>
</p>

## 说明

这是一个使用 Vue3、Pinia、Vue-Router、Vite、Element-Plus、Typescript 和 SCSS 构建的后台管理系统。传送门：[在线地址](http://43.138.113.163/)。

> 如果对您对此项目有兴趣，可以点 "star" 支持一下 谢谢！ ^\_\^
> 如有问题请直接在 issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

## 项目运行

```
git clone https://github.com/Anjiu1/Vue-Admin.git

cd Vue-Admin

npm install 或 pnpm(推荐)

npm run dev
```

## 功能列表

1. 登录模块
2. Layout 模块（主界面）
   - 设计主界面布局，包括左侧菜单栏、顶部导航栏和主要内容区域。
   - 实现顶部 TabBar 组件，用于展示当前打开的页面，支持面包屑导航、刷新、全屏等功能。
3. 商品管理模块
   - 品牌管理
   - 属性管理
   - SPU
   - SKU
4. 权限管理模块
   - 用户管理
   - 角色管理
   - 菜单管理
5. 数据大屏
   - 设计数据大屏初始页面，展示数据可视化图表，包括柱状图、饼图、折线图、水球图、地图。
6. 动态路由（菜单权限、按钮权限）
   - 根据用户角色获取正确的路由权限，展示对应的菜单项。
   - 实现动态路由加载，根据用户权限动态生成路由。
   - 根据用户角色获取相应的按钮权限，控制按钮的显式。
