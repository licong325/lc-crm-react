import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useGlobalStore } from '@stores/useGlobalStore'
import { MENU_ITEMS } from '@constants'
import './index.scss'

/**
 * 侧边栏组件
 */
const Sidebar = () => {
  const location = useLocation()
  const { sidebarCollapsed } = useGlobalStore()

  // 判断菜单项是否激活
  const isMenuActive = (path) => {
    return location.pathname === path
  }

  // 渲染菜单项
  const renderMenuItem = (item) => {
    if (item.isGroup) {
      return (
        <div key={item.key} className="menu-group">
          <div className="menu-group-title">
            {!sidebarCollapsed && <span>{item.title}</span>}
          </div>
          {item.children?.map(renderMenuItem)}
        </div>
      )
    }

    return (
      <Link
        key={item.key}
        to={item.path}
        className={`menu-item ${isMenuActive(item.path) ? 'menu-item-active' : ''}`}
      >
        <i className={`${item.icon} menu-item-icon`} />
        {!sidebarCollapsed && <span className="menu-item-text">{item.title}</span>}
      </Link>
    )
  }

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
      <nav className="sidebar-nav">
        {MENU_ITEMS.map(renderMenuItem)}
      </nav>
    </aside>
  )
}

Sidebar.propTypes = {}

export default Sidebar