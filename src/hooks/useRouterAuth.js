import { useMemo } from 'react'
import { useGlobalStore } from '@stores/useGlobalStore'
import { filterRoutesByPermission, generateMenuData, routerConfig } from '@/router'

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

  // 生成菜单数据
  const menuData = useMemo(() => {
    return generateMenuData(filteredRoutes)
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