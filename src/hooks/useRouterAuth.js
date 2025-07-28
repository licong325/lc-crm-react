import { useMemo } from 'react'
import { useGlobalStore } from '@stores/useGlobalStore'
import { filterRoutesByPermission, generateMenuData, routerConfig } from '@/router'
import { MENU_ORDER } from '@constants'

/**
 * 路由权限控制Hook
 * 根据用户权限过滤路由和菜单
 */
export const useRouterAuth = () => {
  const { user, isAuthenticated } = useGlobalStore()

  // 模拟用户权限和角色
  // TODO: 实际项目中应该从用户信息或API获取
  const userPermissions = useMemo(() => {
    if (!isAuthenticated || !user) {
      return []
    }

    // 模拟不同角色的菜单权限
    const mockPermissions = {
      admin: [
        'dashboard',
        'user_management',
        'order_management',
        'feature_collection',
        'system_settings',
        'role_management',
        'permission_management'
      ],
      manager: [
        'dashboard',
        'user_management',
        'order_management',
        'feature_collection'
      ],
      user: [
        'dashboard',
        'user_management',
        'feature_collection'
      ]
    }

    return mockPermissions[user.role] || mockPermissions.user
  }, [user, isAuthenticated])

  const userRoles = useMemo(() => {
    if (!isAuthenticated || !user) {
      return []
    }
    return [user.role || 'user']
  }, [user, isAuthenticated])

  // 过滤后的路由配置
  const filteredRoutes = useMemo(() => {
    if (!isAuthenticated) {
      // 未登录时只显示登录相关路由
      return routerConfig.filter(route => !route.meta?.requireAuth)
    }

    return filterRoutesByPermission(routerConfig, userPermissions, userRoles)
  }, [isAuthenticated, userPermissions, userRoles])

  // 生成菜单数据并手动排序
  const menuData = useMemo(() => {
    const unsortedMenuData = generateMenuData(filteredRoutes)

    // 手动对菜单数据进行排序
    return unsortedMenuData.sort((a, b) => {
      // 为菜单项分配顺序值
      const getMenuOrder = (item) => {
        const path = item.path

        if (path === 'dashboard') return MENU_ORDER.DASHBOARD
        if (path === 'features') return MENU_ORDER.FEATURE_COLLECTION
        if (path === 'users') return MENU_ORDER.USER_MANAGEMENT
        if (path === 'orders') return MENU_ORDER.ORDER_MANAGEMENT
        if (path === 'settings') return MENU_ORDER.SYSTEM_SETTINGS

        // 权限管理组
        if (item.isGroup && item.title === '权限管理') return MENU_ORDER.PERMISSION_GROUP

        // 默认顺序值
        return 999
      }

      return getMenuOrder(a) - getMenuOrder(b)
    })
  }, [filteredRoutes])

  // 检查是否有权限访问指定路径
  const hasPermissionToPath = (path) => {
    const checkRoute = (routes, targetPath) => {
      for (const route of routes) {
        if (route.path === targetPath) {
          return true
        }
        if (route.children) {
          if (checkRoute(route.children, targetPath)) {
            return true
          }
        }
      }
      return false
    }

    return checkRoute(filteredRoutes, path)
  }

  // 检查是否有指定权限
  const hasPermission = (permission) => {
    return userPermissions.includes(permission)
  }

  // 检查是否有指定角色
  const hasRole = (role) => {
    return userRoles.includes(role)
  }

  return {
    filteredRoutes,
    menuData,
    userPermissions,
    userRoles,
    hasPermissionToPath,
    hasPermission,
    hasRole
  }
}