import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import RouterView from '@/router/RouterView'
import { useRouterAuth } from '@hooks/useRouterAuth'
import { useGlobalStore } from '@stores/useGlobalStore'
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
 * 应用内容组件
 * 处理路由权限逻辑
 */
const AppContent = () => {
  const { filteredRoutes } = useRouterAuth()
  const { login } = useGlobalStore()

  // 模拟自动登录 - 实际项目中应该检查token有效性
  React.useEffect(() => {
    // 模拟登录用户
    const mockUser = {
      id: 1,
      name: '管理员',
      email: 'admin@example.com',
      role: 'admin' // admin | manager | user
    }
    const mockToken = 'mock-jwt-token'

    login(mockUser, mockToken)
  }, [login])

  return <RouterView routes={filteredRoutes} />
}

/**
 * 主应用组件
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
