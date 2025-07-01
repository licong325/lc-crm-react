import React from 'react'
import { Card, Row, Col, Button, List, Avatar, Progress, Statistic } from 'antd'
import {
  RocketOutlined,
  StarOutlined,
  TrophyOutlined,
  LikeOutlined
} from '@ant-design/icons'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

/**
 * 功能1页面 - 展示各种组件示例
 */
const Feature1 = () => {
  const { setBreadcrumbs } = useGlobalStore()

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '功能集合', path: '#' },
      { title: '功能1', path: '/features/feature1' }
    ])
  }, [setBreadcrumbs])

  // 模拟数据
  const listData = [
    {
      title: '组件展示功能',
      description: '展示Ant Design各种组件的使用方式',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
    },
    {
      title: '数据可视化',
      description: '各种图表和数据展示组件',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
    },
    {
      title: '表单处理',
      description: '复杂表单和验证逻辑展示',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
    },
    {
      title: '交互体验',
      description: '用户交互和反馈机制',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4'
    }
  ]

  return (
    <div className="feature1">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>功能1</h1>
            <p>展示各种组件和功能的综合页面</p>
          </div>
          <div className="action-buttons">
            <Button type="primary" icon={<RocketOutlined />}>
              开始体验
            </Button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]} className="stats-row">
        <Col xs={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="总功能数"
              value={28}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#165DFF' }}
            />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="用户满意度"
              value={98.5}
              precision={1}
              suffix="%"
              prefix={<LikeOutlined />}
              valueStyle={{ color: '#67C23A' }}
            />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="完成进度"
              value={75}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#E6A23C' }}
            />
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="今日访问"
              value={1582}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#F56C6C' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 内容区域 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="功能列表" className="content-card">
            <List
              itemLayout="horizontal"
              dataSource={listData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="进度展示" className="content-card">
            <div className="progress-section">
              <div className="progress-item">
                <span className="progress-label">组件开发</span>
                <Progress percent={85} status="active" />
              </div>
              <div className="progress-item">
                <span className="progress-label">功能测试</span>
                <Progress percent={70} />
              </div>
              <div className="progress-item">
                <span className="progress-label">文档编写</span>
                <Progress percent={60} />
              </div>
              <div className="progress-item">
                <span className="progress-label">优化完善</span>
                <Progress percent={40} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 操作区域 */}
      <Card title="快速操作" className="action-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Button block size="large" icon={<StarOutlined />}>
              功能A
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button block size="large" icon={<TrophyOutlined />}>
              功能B
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button block size="large" icon={<LikeOutlined />}>
              功能C
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button block size="large" icon={<RocketOutlined />}>
              功能D
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Feature1