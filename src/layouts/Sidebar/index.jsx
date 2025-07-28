import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { useGlobalStore } from '@stores/useGlobalStore'
import { useRouterAuth } from '@hooks/useRouterAuth'
import './index.scss'

const { SubMenu } = Menu

/**
 * 侧边栏组件
 */
const Sidebar = () => {
  const location = useLocation()
  const { sidebarCollapsed } = useGlobalStore()
  const { menuData, userPermissions, userRoles } = useRouterAuth()
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  // 根据当前路径设置选中状态和展开状态
  useEffect(() => {
    const currentPath = location.pathname
    setSelectedKeys([currentPath])

    // 如果当前路径包含子菜单，自动展开对应的父菜单
    const pathSegments = currentPath.split('/').filter(Boolean)
    if (pathSegments.length > 1) {
      const parentPath = `/${pathSegments[0]}`
      setOpenKeys([parentPath])
    }
  }, [location.pathname])

  // 处理子菜单展开/收起
  const handleOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  // 检查是否有权限访问菜单项
  const hasPermission = (permissions) => {
    if (!permissions || permissions.length === 0) return true
    return permissions.some(p => userPermissions.includes(p))
  }

  // 检查是否有角色访问菜单项
  const hasRole = (roles) => {
    if (!roles || roles.length === 0) return true
    return roles.some(r => userRoles.includes(r))
  }

  // 硬编码菜单项
  const menuItems = [
    {
      key: '/dashboard',
      icon: <i className="fas fa-tachometer-alt" />,
      label: <Link to="/dashboard">仪表盘</Link>,
      permissions: ['dashboard']
    },
    {
      key: '/users',
      icon: <i className="fas fa-users" />,
      label: <Link to="/users">用户管理</Link>,
      permissions: ['user_management']
    },
    {
      key: '/orders',
      icon: <i className="fas fa-shopping-cart" />,
      label: <Link to="/orders">订单管理</Link>,
      permissions: ['order_management']
    },
    {
      key: '/settings',
      icon: <i className="fas fa-cog" />,
      label: <Link to="/settings">系统设置</Link>,
      permissions: ['system_settings'],
      roles: ['admin']
    },
    {
      key: '/features',
      icon: <i className="fas fa-puzzle-piece" />,
      label: '功能集合',
      permissions: ['feature_collection'],
      children: [
        {
          key: '/features/feature1',
          icon: <i className="fas fa-star" />,
          label: <Link to="/features/feature1">功能1</Link>,
          permissions: ['feature_collection']
        },
        {
          key: '/features/feature2',
          icon: <i className="fas fa-rocket" />,
          label: <Link to="/features/feature2">功能2</Link>,
          permissions: ['feature_collection']
        }
      ]
    }
  ]

  // 权限管理组 - 单独处理
  const permissionGroup = {
    title: '权限管理',
    children: [
      {
        key: '/roles',
        icon: <i className="fas fa-key" />,
        label: <Link to="/roles">角色管理</Link>,
        permissions: ['role_management'],
        roles: ['admin']
      },
      {
        key: '/permissions',
        icon: <i className="fas fa-shield-alt" />,
        label: <Link to="/permissions">权限配置</Link>,
        permissions: ['permission_management'],
        roles: ['admin']
      }
    ]
  }

  // 过滤有权限的菜单项
  const filteredMenuItems = menuItems.filter(item => {
    const hasMenuPermission = hasPermission(item.permissions)
    const hasMenuRole = hasRole(item.roles)

    // 处理子菜单
    if (item.children) {
      item.children = item.children.filter(child =>
        hasPermission(child.permissions) && hasRole(child.roles)
      )
      // 如果没有可见的子菜单，则隐藏父菜单
      if (item.children.length === 0) {
        return false
      }
    }

    return hasMenuPermission && hasMenuRole
  })

  // 过滤权限管理组
  const filteredPermissionItems = permissionGroup.children.filter(item =>
    hasPermission(item.permissions) && hasRole(item.roles)
  )

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Logo区域 */}
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-cube logo-icon" />
          {!sidebarCollapsed && <span className="logo-text">AdminSystem</span>}
        </div>
      </div>

      {/* 菜单区域 */}
      <div className="sidebar-nav">
        {/* 主菜单 */}
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={sidebarCollapsed}
          selectedKeys={selectedKeys}
          openKeys={sidebarCollapsed ? [] : openKeys}
          onOpenChange={handleOpenChange}
          items={filteredMenuItems}
          className="sidebar-menu"
        />

        {/* 权限管理组 */}
        {filteredPermissionItems.length > 0 && (
          <div className="traditional-menu">
            <div className="menu-group">
              <div className="menu-group-title">
                {!sidebarCollapsed && <span>{permissionGroup.title}</span>}
              </div>
              {filteredPermissionItems.map(item => (
                <Link
                  key={item.key}
                  to={item.key}
                  className={`menu-item ${location.pathname === item.key ? 'menu-item-active' : ''}`}
                >
                  {item.icon}
                  {!sidebarCollapsed && <span className="menu-item-text">{item.label.props.children}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

Sidebar.propTypes = {}

export default Sidebar