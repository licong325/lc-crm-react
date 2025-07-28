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
  const { menuData } = useRouterAuth()
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
      const hasSubmenu = menuData.find(item =>
        item.isSubmenu && item.path === parentPath
      )
      if (hasSubmenu && !sidebarCollapsed) {
        setOpenKeys([parentPath])
      }
    }
  }, [location.pathname, menuData, sidebarCollapsed])

  // 处理子菜单展开/收起
  const handleOpenChange = (keys) => {
    setOpenKeys(keys)
  }

  // 渲染传统菜单项（分组模式和普通菜单）
  const renderTraditionalMenuItem = (item) => {
    if (item.isGroup) {
      return (
        <div key={item.key} className="menu-group">
          <div className="menu-group-title">
            {!sidebarCollapsed && <span>{item.title}</span>}
          </div>
          {item.children?.map(renderTraditionalMenuItem)}
        </div>
      )
    }

    return (
      <Link
        key={item.key}
        to={item.path}
        className={`menu-item ${location.pathname === item.path ? 'menu-item-active' : ''}`}
      >
        <i className={`${item.icon} menu-item-icon`} />
        {!sidebarCollapsed && <span className="menu-item-text">{item.title}</span>}
      </Link>
    )
  }

  // 生成Ant Design Menu组件的数据结构
  const generateAntMenuItems = (data) => {
    return data.map(item => {
      if (item.isSubmenu) {
        // 折叠展开式子菜单
        return {
          key: item.path,
          icon: <i className={item.icon} />,
          label: item.title,
          children: item.children?.map(child => {
            // 确保子菜单路径正确拼接
            const fullPath = `${item.path}/${child.path}`
            return {
              key: fullPath,
              icon: <i className={child.icon} />,
              label: <Link to={fullPath}>{child.title}</Link>
            }
          })
        }
      } else if (item.isGroup) {
        // 分组菜单不在这里处理，保持原有渲染方式
        return null
      } else {
        // 普通菜单项
        return {
          key: item.path,
          icon: <i className={item.icon} />,
          label: <Link to={item.path}>{item.title}</Link>
        }
      }
    }).filter(Boolean)
  }

  // 分离不同类型的菜单
  const submenuItems = menuData.filter(item => item.isSubmenu)
  const traditionalItems = menuData.filter(item => !item.isSubmenu)
  const antMenuItems = generateAntMenuItems(submenuItems.concat(
    traditionalItems.filter(item => !item.isGroup)
  ))

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
        {/* Ant Design Menu组件处理折叠展开菜单 */}
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={sidebarCollapsed}
          selectedKeys={selectedKeys}
          openKeys={sidebarCollapsed ? [] : openKeys}
          onOpenChange={handleOpenChange}
          items={antMenuItems}
          className="sidebar-menu"
        />

        {/* 传统方式渲染分组菜单 */}
        <div className="traditional-menu">
          {traditionalItems.filter(item => item.isGroup).map(renderTraditionalMenuItem)}
        </div>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {}

export default Sidebar