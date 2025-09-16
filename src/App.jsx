import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import RouterView from '@/router/RouterView'
import AuthGuard from '@components/AuthGuard'
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
  const { login, isAuthenticated } = useGlobalStore()

  // 检查本地存储的登录状态并恢复登录
  React.useEffect(() => {
    const token = localStorage.getItem('userToken')
    const userInfo = localStorage.getItem('userInfo')

    if (token && userInfo && !isAuthenticated) {
      try {
        const userData = JSON.parse(userInfo)
        // 恢复登录状态
        login(userData, token)
      } catch (error) {
        console.error('恢复登录状态失败:', error)
        // 清除无效的本地存储
        localStorage.removeItem('userToken')
        localStorage.removeItem('userInfo')
      }
    }
  }, [login, isAuthenticated])

  return (
    <AuthGuard>
      <RouterView routes={filteredRoutes} />
    </AuthGuard>
  )
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
