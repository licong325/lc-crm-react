import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useGlobalStore } from '@stores/useGlobalStore'
import Sidebar from '../Sidebar'
import Header from '../Header'
import './index.scss'

/**
 * 主布局组件
 * 包含侧边栏、顶部导航栏和主内容区域
 */
const MainLayout = () => {
  const { sidebarCollapsed } = useGlobalStore()

  return (
    <div className="main-layout">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主体内容区域 */}
      <div className={`main-content ${sidebarCollapsed ? 'main-content-expanded' : ''}`}>
        {/* 顶部导航栏 */}
        <Header />

        {/* 页面内容 */}
        <main className="page-content">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

MainLayout.propTypes = {}

export default MainLayout