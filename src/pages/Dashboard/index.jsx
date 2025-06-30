import React from 'react'
import { Row, Col, Card, Button, Statistic } from 'antd'
import {
  DownloadOutlined,
  SyncOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

/**
 * 数据统计卡片组件
 */
const StatCard = ({ title, value, trend, trendValue, icon, color = 'primary' }) => {
  const isPositive = trend === 'up'

  return (
    <Card className="stat-card" hoverable>
      <div className="stat-card-content">
        <div className="stat-info">
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
          <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            <span>{trendValue}</span>
            <span className="trend-label">较上月</span>
          </div>
        </div>
        <div className={`stat-icon stat-icon-${color}`}>
          <i className={icon} />
        </div>
      </div>
    </Card>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down']).isRequired,
  trendValue: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger'])
}

/**
 * 仪表盘页面组件
 */
const Dashboard = () => {
  const { setBreadcrumbs } = useGlobalStore()

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '数据管理', path: '/dashboard' },
      { title: '用户分析' }
    ])
  }, [setBreadcrumbs])

  // 模拟数据
  const statsData = [
    {
      title: '总用户数',
      value: '12,845',
      trend: 'up',
      trendValue: '12.5%',
      icon: 'fas fa-user',
      color: 'primary'
    },
    {
      title: '今日订单',
      value: '328',
      trend: 'up',
      trendValue: '8.2%',
      icon: 'fas fa-shopping-cart',
      color: 'success'
    },
    {
      title: '转化率',
      value: '24.7%',
      trend: 'down',
      trendValue: '1.3%',
      icon: 'fas fa-percentage',
      color: 'warning'
    },
    {
      title: '本月收入',
      value: '¥128,450',
      trend: 'up',
      trendValue: '15.6%',
      icon: 'fas fa-money-bill-wave',
      color: 'primary'
    }
  ]

  return (
    <div className="dashboard">
      {/* 页面标题和操作按钮 */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <h1>数据仪表盘</h1>
            <p>查看系统关键指标和用户行为数据</p>
          </div>
          <div className="action-buttons">
            <Button icon={<DownloadOutlined />} className="btn-secondary">
              导出数据
            </Button>
            <Button type="primary" icon={<SyncOutlined />}>
              刷新数据
            </Button>
          </div>
        </div>
      </div>

      {/* 数据概览卡片 */}
      <Row gutter={[24, 24]} className="stats-row">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      {/* 图表区域 */}
      <Row gutter={[24, 24]} className="charts-row">
        <Col xs={24} lg={16}>
          <Card title="用户增长趋势" className="chart-card">
            <div className="chart-placeholder">
              <div className="chart-content">
                <i className="fas fa-chart-line" />
                <p>图表组件开发中...</p>
                <p>这里将显示用户增长趋势图</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="用户来源分布" className="chart-card">
            <div className="chart-placeholder">
              <div className="chart-content">
                <i className="fas fa-chart-pie" />
                <p>饼图组件开发中...</p>
                <p>这里将显示用户来源分布</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 快速操作区域 */}
      <Card title="快速操作" className="quick-actions-card">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6}>
            <Button block size="large" className="quick-action-btn">
              <i className="fas fa-user-plus" />
              添加用户
            </Button>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Button block size="large" className="quick-action-btn">
              <i className="fas fa-file-export" />
              数据导出
            </Button>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Button block size="large" className="quick-action-btn">
              <i className="fas fa-cog" />
              系统设置
            </Button>
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Button block size="large" className="quick-action-btn">
              <i className="fas fa-chart-bar" />
              数据分析
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Dashboard