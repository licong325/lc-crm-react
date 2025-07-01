# 🚀 LC CRM 后台管理系统

现代化、响应式的企业级后台管理系统，基于 React 18 + Vite + Ant Design 构建。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.26.3-1890FF.svg)

## ✨ 项目特色

- 🎨 **精美设计** - 基于现代化设计理念，专业蓝色主调 (#165DFF)
- 📱 **响应式布局** - 完美适配桌面端、平板、手机等各种设备
- 🔧 **模块化架构** - 清晰的项目结构，易于维护和扩展
- ⚡ **高性能** - Vite 构建工具，开发体验极佳
- 🛡️ **类型安全** - PropTypes 验证，确保组件属性类型安全
- 🎯 **状态管理** - Zustand 轻量级状态管理，简单易用
- 🌐 **国际化支持** - 内置中文语言包
- 🔒 **权限管理** - 基于角色的菜单权限控制
- 🧩 **多种菜单模式** - 支持折叠式菜单和分组式菜单

## 🛠️ 技术栈

### 核心框架
- **React** `18.2.0` - 用户界面构建库
- **Vite** `5.4.10` - 现代化构建工具
- **React Router DOM** `7.6.3` - 客户端路由管理

### UI 组件库
- **Ant Design** `5.26.3` - 企业级 UI 设计语言和组件库
- **FontAwesome** `6.7.2` - 图标库

### 状态管理
- **Zustand** `5.0.6` - 轻量级状态管理库
- **TanStack React Query** `5.81.5` - 强大的数据获取和缓存库

### 表单处理
- **React Hook Form** `7.59.0` - 高性能、灵活的表单库

### 网络请求
- **Axios** `1.10.0` - HTTP 客户端

### 样式处理
- **Sass** `1.89.2` - CSS 预处理器
- **PostCSS** `8.5.6` - CSS 后处理工具

### 开发工具
- **ESLint** `9.29.0` - 代码检查工具
- **PropTypes** `15.8.1` - 组件属性类型验证

## 📁 项目架构

```
lc-crm-react/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 通用组件
│   ├── layouts/            # 布局组件
│   │   ├── Header/         # 顶部导航栏
│   │   ├── Sidebar/        # 侧边栏
│   │   └── MainLayout/     # 主布局
│   ├── pages/              # 页面组件
│   │   ├── Dashboard/      # 数据仪表盘
│   │   ├── UserManagement/ # 用户管理
│   │   ├── OrderManagement/# 订单管理
│   │   ├── SystemSettings/ # 系统设置
│   │   ├── RoleManagement/ # 角色管理
│   │   ├── PermissionConfig/# 权限配置
│   │   ├── Feature1/       # 功能1示例
│   │   └── Feature2/       # 功能2示例
│   ├── router/             # 路由配置
│   │   └── RouterView.jsx  # 路由视图组件
│   ├── stores/             # Zustand 状态管理
│   ├── styles/             # SCSS 样式文件
│   │   ├── variables.scss  # 样式变量
│   │   └── global.scss     # 全局样式
│   ├── constants/          # 常量配置
│   ├── hooks/              # 自定义 Hook
│   │   └── useRouterAuth.js# 路由权限Hook
│   ├── services/           # API 服务
│   └── utils/              # 工具函数
├── .gitignore              # Git 忽略文件
├── package.json            # 项目依赖配置
├── vite.config.js          # Vite 配置
├── postcss.config.js       # PostCSS 配置
├── eslint.config.js        # ESLint 配置
└── README.md               # 项目说明文档
```

## 🔒 权限管理系统

### 角色体系
- **admin** - 管理员角色，拥有所有权限
- **manager** - 经理角色，拥有业务相关权限
- **user** - 普通用户角色，拥有基础查看权限

### 权限控制流程
1. **路由配置** - 每个路由都有 meta.permissions 定义所需权限
2. **权限过滤** - useRouterAuth Hook 根据用户角色过滤路由
3. **菜单生成** - 动态生成侧边栏菜单，只显示有权限的项目
4. **权限检查** - 提供 hasPermission 工具函数进行权限判断

### 权限管理模块
- **角色管理** - 管理系统角色和分配权限
- **权限配置** - 定义和管理系统权限

## 🎨 设计系统

### 颜色规范
```scss
$primary: #165DFF;        // 主色调
$success: #67C23A;        // 成功色
$warning: #E6A23C;        // 警告色
$danger: #F56C6C;         // 危险色
$gray-50: #F5F7FA;        // 背景色
```

### 菜单类型
- **折叠展开式** - 功能集合菜单展示了多级菜单的折叠展开效果
- **分组式** - 权限管理展示了菜单分组效果

### 组件特性
- ✅ 可折叠侧边栏导航
- ✅ 响应式顶部导航栏
- ✅ 面包屑导航
- ✅ 数据统计卡片
- ✅ 图表占位区域
- ✅ 用户下拉菜单
- ✅ 通知徽章
- ✅ 权限控制
- ✅ 多种菜单样式
- ✅ 步骤条组件
- ✅ 时间线组件

## 🚀 快速开始

### 环境要求
- **Node.js** = 18.20.4
- **npm** = 10.7.0

### 安装依赖
```bash
# 使用 npm
npm install

# 或使用 pnpm (推荐)
pnpm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

### 预览生产构建
```bash
npm run preview
```

## 📋 功能模块

### ✅ 已实现功能
- **数据仪表盘** - 统计卡片、图表占位符、快速操作
- **布局系统** - 侧边栏、顶部导航、主内容区域
- **路由管理** - 嵌套路由、导航守卫、权限控制
- **状态管理** - 全局状态、本地存储持久化
- **响应式设计** - 移动端适配
- **用户管理** - 用户列表、搜索、添加、编辑
- **订单管理** - 订单列表、状态管理
- **系统设置** - 配置管理
- **权限管理** - 角色权限配置
- **多菜单模式** - 折叠式菜单和分组式菜单
- **功能示例** - 各种组件展示页面

### 🔄 开发中功能
- **数据可视化** - ECharts 图表集成
- **表单验证** - 复杂表单处理
- **API 集成** - 真实后端接口对接

### 🎯 计划功能
- **主题切换** - 明暗主题支持
- **多语言** - 国际化支持
- **文件上传** - 图片、文档上传组件
- **消息通知** - 站内消息系统

## 🔧 路由权限配置

### 路由结构
```jsx
// 路由示例
{
  path: 'features',
  meta: {
    title: '功能集合',
    icon: 'fas fa-puzzle-piece',
    requireAuth: true,
    permissions: ['feature_collection'],
    submenu: true, // 标识这是一个可展开的子菜单
  },
  children: [
    {
      path: 'feature1',
      element: <Feature1 />,
      meta: {
        title: '功能1',
        icon: 'fas fa-star',
        requireAuth: true,
        permissions: ['feature_collection'],
      }
    }
  ]
}
```

### 菜单配置
支持两种菜单模式：
1. **折叠式子菜单** - 使用 `submenu: true` 标记
2. **分组式菜单** - 使用 `group` 和 `groupTitle` 标记

```jsx
// 分组菜单示例
{
  path: 'permissions',
  element: <PermissionConfig />,
  meta: {
    title: '权限配置',
    icon: 'fas fa-key',
    requireAuth: true,
    permissions: ['permission_management'],
    roles: ['admin'],
    group: 'permission-group',
    groupTitle: '权限管理',
  }
}
```

## 📦 部署指南

### 构建应用
```bash
npm run build
```

构建文件将输出到 `dist/` 目录。

### 部署到静态服务器
构建完成后，可以将 `dist/` 目录部署到任何静态文件服务器，如：
- **Nginx**
- **Apache**
- **Vercel**
- **Netlify**

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 作者

- **开发者** - [你的名字](https://github.com/yourusername)

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面构建库
- [Ant Design](https://ant.design/) - 企业级 UI 组件库
- [Vite](https://vitejs.dev/) - 现代化构建工具
- [Zustand](https://github.com/pmndrs/zustand) - 状态管理库

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
