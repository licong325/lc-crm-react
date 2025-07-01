import { Navigate } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'
import Dashboard from '@pages/Dashboard'
import UserManagement from '@pages/UserManagement'
import OrderManagement from '@pages/OrderManagement'
import SystemSettings from '@pages/SystemSettings'
import RoleManagement from '@pages/RoleManagement'
import PermissionConfig from '@pages/PermissionConfig'
import Feature1 from '@pages/Feature1'
import Feature2 from '@pages/Feature2'

/**
 * 路由配置
 * 每个路由可以包含以下属性：
 * - path: 路由路径
 * - element: 组件元素
 * - meta: 路由元信息
 *   - title: 页面标题
 *   - icon: 菜单图标
 *   - requireAuth: 是否需要登录
 *   - permissions: 所需权限数组
 *   - roles: 所需角色数组
 *   - hidden: 是否在菜单中隐藏
 *   - breadcrumb: 面包屑配置
 */

// 页面占位符组件（404页面使用）
const PagePlaceholder = ({ title, icon = 'fas fa-cog' }) => (
  <div className="page-placeholder">
    <div className="placeholder-content">
      <i className={icon} />
      <h3>{title}</h3>
      <p>功能正在开发中，敬请期待</p>
    </div>
  </div>
)

/**
 * 路由配置数组
 */
export const routerConfig = [
  {
    path: '/',
    element: <MainLayout />,
    meta: {
      title: '主布局',
      requireAuth: true
    },
    children: [
      // 默认重定向到仪表盘
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
        meta: {
          hidden: true
        }
      },

      // 仪表盘
      {
        path: 'dashboard',
        element: <Dashboard />,
        meta: {
          title: '仪表盘',
          icon: 'fas fa-tachometer-alt',
          requireAuth: true,
          permissions: ['dashboard'],
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '仪表盘', path: '/dashboard' }
          ]
        }
      },

      // 用户管理
      {
        path: 'users',
        element: <UserManagement />,
        meta: {
          title: '用户管理',
          icon: 'fas fa-users',
          requireAuth: true,
          permissions: ['user_management'],
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '用户管理', path: '/users' }
          ]
        }
      },

      // 订单管理
      {
        path: 'orders',
        element: <OrderManagement />,
        meta: {
          title: '订单管理',
          icon: 'fas fa-shopping-cart',
          requireAuth: true,
          permissions: ['order_management'],
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '订单管理', path: '/orders' }
          ]
        }
      },

      // 系统设置
      {
        path: 'settings',
        element: <SystemSettings />,
        meta: {
          title: '系统设置',
          icon: 'fas fa-cog',
          requireAuth: true,
          permissions: ['system_settings'],
          roles: ['admin'],
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '系统设置', path: '/settings' }
          ]
        }
      },

      // 功能集合 - 折叠展开模式
      {
        path: 'features',
        meta: {
          title: '功能集合',
          icon: 'fas fa-puzzle-piece',
          requireAuth: true,
          permissions: ['feature_collection'],
          submenu: true, // 标识这是一个可展开的子菜单
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '功能集合', path: '#' }
          ]
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
              breadcrumb: [
                { title: '首页', path: '/' },
                { title: '功能集合', path: '#' },
                { title: '功能1', path: '/features/feature1' }
              ]
            }
          },
          {
            path: 'feature2',
            element: <Feature2 />,
            meta: {
              title: '功能2',
              icon: 'fas fa-rocket',
              requireAuth: true,
              permissions: ['feature_collection'],
              breadcrumb: [
                { title: '首页', path: '/' },
                { title: '功能集合', path: '#' },
                { title: '功能2', path: '/features/feature2' }
              ]
            }
          }
        ]
      },

      // 权限管理组
      {
        path: 'roles',
        element: <RoleManagement />,
        meta: {
          title: '角色管理',
          icon: 'fas fa-key',
          requireAuth: true,
          permissions: ['role_management'],
          roles: ['admin'],
          group: 'permission',
          groupTitle: '权限管理',
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '权限管理', path: '#' },
            { title: '角色管理', path: '/roles' }
          ]
        }
      },

      {
        path: 'permissions',
        element: <PermissionConfig />,
        meta: {
          title: '权限配置',
          icon: 'fas fa-shield-alt',
          requireAuth: true,
          permissions: ['permission_management'],
          roles: ['admin'],
          group: 'permission',
          groupTitle: '权限管理',
          breadcrumb: [
            { title: '首页', path: '/' },
            { title: '权限管理', path: '#' },
            { title: '权限配置', path: '/permissions' }
          ]
        }
      }
    ]
  },

  // 404 页面
  {
    path: '*',
    element: <PagePlaceholder title="页面未找到" icon="fas fa-exclamation-triangle" />,
    meta: {
      title: '404',
      hidden: true
    }
  }
]

/**
 * 根据权限过滤路由
 * @param {Array} routes - 路由配置数组
 * @param {Array} userPermissions - 用户权限数组
 * @param {Array} userRoles - 用户角色数组
 * @returns {Array} 过滤后的路由数组
 */
export const filterRoutesByPermission = (routes, userPermissions = [], userRoles = []) => {
  return routes.filter(route => {
    const { meta } = route

    // 如果没有权限要求，直接通过
    if (!meta?.requireAuth) {
      return true
    }

    // 检查权限
    if (meta.permissions && meta.permissions.length > 0) {
      const hasPermission = meta.permissions.some(permission =>
        userPermissions.includes(permission)
      )
      if (!hasPermission) {
        return false
      }
    }

    // 检查角色
    if (meta.roles && meta.roles.length > 0) {
      const hasRole = meta.roles.some(role =>
        userRoles.includes(role)
      )
      if (!hasRole) {
        return false
      }
    }

    // 递归过滤子路由
    if (route.children) {
      route.children = filterRoutesByPermission(route.children, userPermissions, userRoles)
    }

    return true
  })
}

/**
 * 生成菜单数据
 * @param {Array} routes - 路由配置数组
 * @returns {Array} 菜单数据数组
 */
export const generateMenuData = (routes) => {
  const menuData = []

  routes.forEach(route => {
    const { meta, path, children } = route

    // 跳过隐藏的路由和索引路由
    if (meta?.hidden || route.index) {
      return
    }

    // 如果有子路由，递归处理
    if (children) {
      const childMenus = generateMenuData(children)

      // 区分不同类型的菜单
      if (meta?.submenu) {
        // 折叠展开式子菜单
        menuData.push({
          key: path,
          path: path,
          title: meta.title,
          icon: meta.icon,
          isSubmenu: true,
          children: childMenus,
          meta: meta
        })
      } else {
        // 按分组整理菜单（权限管理模式）
        const groups = {}
        const normalMenus = []

        childMenus.forEach(menu => {
          if (menu.meta?.group) {
            const groupKey = menu.meta.group
            if (!groups[groupKey]) {
              groups[groupKey] = {
                key: groupKey,
                title: menu.meta.groupTitle,
                isGroup: true,
                children: []
              }
            }
            groups[groupKey].children.push(menu)
          } else {
            normalMenus.push(menu)
          }
        })

        // 合并普通菜单和分组菜单
        menuData.push(...normalMenus, ...Object.values(groups))
      }
    } else if (meta?.title) {
      // 叶子节点菜单
      menuData.push({
        key: path,
        path: path,
        title: meta.title,
        icon: meta.icon,
        meta: meta
      })
    }
  })

  return menuData
}

export default routerConfig