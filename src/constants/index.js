// API 基础配置
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// 路由路径
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  USER_MANAGEMENT: '/users',
  ORDER_MANAGEMENT: '/orders',
  SYSTEM_SETTINGS: '/settings',
  ROLE_MANAGEMENT: '/roles',
  PERMISSION_CONFIG: '/permissions'
}

// 菜单配置 - 基于你的设计
export const MENU_ITEMS = [
  {
    key: 'dashboard',
    icon: 'fas fa-tachometer-alt',
    title: '仪表盘',
    path: ROUTES.DASHBOARD
  },
  {
    key: 'user-management',
    icon: 'fas fa-users',
    title: '用户管理',
    path: ROUTES.USER_MANAGEMENT
  },
  {
    key: 'order-management',
    icon: 'fas fa-shopping-cart',
    title: '订单管理',
    path: ROUTES.ORDER_MANAGEMENT
  },
  {
    key: 'system-settings',
    icon: 'fas fa-cog',
    title: '系统设置',
    path: ROUTES.SYSTEM_SETTINGS
  },
  {
    key: 'permission-group',
    title: '权限管理',
    isGroup: true,
    children: [
      {
        key: 'role-management',
        icon: 'fas fa-key',
        title: '角色管理',
        path: ROUTES.ROLE_MANAGEMENT
      },
      {
        key: 'permission-config',
        icon: 'fas fa-shield-alt',
        title: '权限配置',
        path: ROUTES.PERMISSION_CONFIG
      }
    ]
  }
]

// 用户状态
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}

// 订单状态
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100']
}

// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'admin_token',
  USER_INFO: 'admin_user_info',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  THEME: 'admin_theme'
}

// 主题配置
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}