import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useGlobalStore } from '@stores/useGlobalStore'
import PropTypes from 'prop-types'

/**
 * 路由认证守卫组件
 * 检查用户是否已认证，未认证则重定向到登录页面
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} 守卫后的组件
 * @author licong
 * @created 2024-09-16
 */
const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useGlobalStore()
  const location = useLocation()

  // 如果用户未认证且当前不在登录页面，则重定向到登录页面
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 如果用户已认证且在登录页面，则重定向到首页
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthGuard