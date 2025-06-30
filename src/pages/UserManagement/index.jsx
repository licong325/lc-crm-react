import React from 'react'
import { Card } from 'antd'
import { useGlobalStore } from '@stores/useGlobalStore'

/**
 * 用户管理页面
 */
const UserManagement = () => {
  const { setBreadcrumbs } = useGlobalStore()

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '用户管理', path: '/users' }
    ])
  }, [setBreadcrumbs])

  return (
    <div className="user-management">
      <Card title="用户管理">
        <div className="page-placeholder">
          <div className="placeholder-content">
            <i className="fas fa-users" />
            <h3>用户管理功能开发中</h3>
            <p>这里将展示用户列表、搜索、添加、编辑等功能</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserManagement