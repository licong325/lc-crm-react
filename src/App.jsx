import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import MainLayout from '@layouts/MainLayout'
import Dashboard from '@pages/Dashboard'
import UserManagement from '@pages/UserManagement'
import '@styles/global.scss'

// 创建 React Query 客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Ant Design 主题配置 - 基于你的设计配色
const theme = {
  token: {
    colorPrimary: '#165DFF',
    colorSuccess: '#67C23A',
    colorWarning: '#E6A23C',
    colorError: '#F56C6C',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Layout: {
      bodyBg: '#F5F7FA',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
  },
}

/**
 * 主应用组件
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <Router>
          <Routes>
            {/* 主布局路由 */}
            <Route path="/" element={<MainLayout />}>
              {/* 默认重定向到仪表盘 */}
              <Route index element={<Navigate to="/dashboard" replace />} />

              {/* 仪表盘 */}
              <Route path="dashboard" element={<Dashboard />} />

              {/* 用户管理 */}
              <Route path="users" element={<UserManagement />} />

              {/* 其他页面路由 */}
              <Route path="orders" element={<div className="page-placeholder">订单管理页面开发中...</div>} />
              <Route path="settings" element={<div className="page-placeholder">系统设置页面开发中...</div>} />
              <Route path="roles" element={<div className="page-placeholder">角色管理页面开发中...</div>} />
              <Route path="permissions" element={<div className="page-placeholder">权限配置页面开发中...</div>} />
            </Route>

            {/* 404 页面 */}
            <Route path="*" element={<div className="page-placeholder">页面未找到</div>} />
          </Routes>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
