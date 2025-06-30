import { useState } from 'react'
import { Dropdown, Menu, Avatar, Badge } from 'antd'
import PropTypes from 'prop-types'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

/**
 * 顶部导航栏组件
 */
const Header = () => {
  const { sidebarCollapsed, toggleSidebar, user, breadcrumbs, logout } = useGlobalStore()
  const [notificationCount] = useState(3) // 模拟通知数量

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <i className="fas fa-user" />,
      label: '个人资料'
    },
    {
      key: 'settings',
      icon: <i className="fas fa-cog" />,
      label: '设置'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <i className="fas fa-sign-out-alt" />,
      label: '退出登录',
      danger: true
    }
  ]

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        console.log('打开个人资料')
        break
      case 'settings':
        console.log('打开设置')
        break
      case 'logout':
        logout()
        break
      default:
        break
    }
  }

  // 渲染面包屑
  const renderBreadcrumbs = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) {
      return (
        <nav className="breadcrumb">
          <span className="breadcrumb-item">首页</span>
          <i className="fas fa-chevron-right breadcrumb-separator" />
          <span className="breadcrumb-item">数据管理</span>
          <i className="fas fa-chevron-right breadcrumb-separator" />
          <span className="breadcrumb-item active">用户分析</span>
        </nav>
      )
    }

    return (
      <nav className="breadcrumb">
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            <span className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}>
              {item.title}
            </span>
            {index < breadcrumbs.length - 1 && (
              <i className="fas fa-chevron-right breadcrumb-separator" />
            )}
          </span>
        ))}
      </nav>
    )
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* 左侧：菜单按钮和Logo */}
        <div className="header-left">
          <button
            className="menu-toggle-btn"
            onClick={toggleSidebar}
            aria-label="切换侧边栏"
          >
            <i className="fas fa-bars" />
          </button>
          <div className="header-logo">
            <i className="fas fa-cube" />
            <span>AdminSystem</span>
          </div>
        </div>

        {/* 中间：面包屑导航 */}
        <div className="header-center">
          {renderBreadcrumbs()}
        </div>

        {/* 右侧：通知和用户信息 */}
        <div className="header-right">
          {/* 通知按钮 */}
          <Badge count={notificationCount} size="small">
            <button className="notification-btn" aria-label="通知">
              <i className="fas fa-bell" />
            </button>
          </Badge>

          {/* 用户下拉菜单 */}
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <div className="user-info">
              <Avatar
                src="https://picsum.photos/200/200?random=1"
                size={32}
                className="user-avatar"
              />
              <span className="user-name">{user?.name || '管理员'}</span>
              <i className="fas fa-chevron-down" />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {}

export default Header