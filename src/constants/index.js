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

// 菜单顺序常量
export const MENU_ORDER = {
  DASHBOARD: 1,
  FEATURE_COLLECTION: 2,
  USER_MANAGEMENT: 3,
  ORDER_MANAGEMENT: 4,
  SYSTEM_SETTINGS: 5,
  PERMISSION_GROUP: 6
}

// 菜单配置已迁移到路由配置中
// 请查看 src/router/index.jsx 了解新的菜单系统

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