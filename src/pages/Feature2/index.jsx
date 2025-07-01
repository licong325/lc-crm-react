import React, { useState } from 'react'
import { Card, Row, Col, Button, Timeline, Steps, Tabs, Alert, Badge, Tag } from 'antd'
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  BulbOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

const { Step } = Steps

/**
 * 功能2页面 - 展示流程和步骤组件
 */
const Feature2 = () => {
  const { setBreadcrumbs } = useGlobalStore()
  const [currentStep, setCurrentStep] = useState(1)

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '功能集合', path: '#' },
      { title: '功能2', path: '/features/feature2' }
    ])
  }, [setBreadcrumbs])

  // 时间线数据
  const timelineData = [
    {
      color: 'green',
      children: '项目初始化完成 2024-01-01'
    },
    {
      color: 'green',
      children: '基础架构搭建 2024-01-05'
    },
    {
      color: 'red',
      children: '遇到技术难题 2024-01-10'
    },
    {
      color: 'blue',
      children: '问题解决方案确定 2024-01-12'
    },
    {
      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
      children: '功能开发进行中...'
    }
  ]

  // 标签页数据
  const tabItems = [
    {
      key: '1',
      label: '概览',
      children: (
        <div className="tab-content">
          <Alert
            message="功能概览"
            description="这里展示了系统的主要功能模块和使用流程，帮助用户快速了解系统架构。"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Badge count={5} status="processing">
                <Tag color="blue">进行中</Tag>
              </Badge>
            </Col>
            <Col span={8}>
              <Badge count={12} status="success">
                <Tag color="green">已完成</Tag>
              </Badge>
            </Col>
            <Col span={8}>
              <Badge count={3} status="error">
                <Tag color="red">待处理</Tag>
              </Badge>
            </Col>
          </Row>
        </div>
      )
    },
    {
      key: '2',
      label: '详情',
      children: (
        <div className="tab-content">
          <Alert
            message="详细信息"
            description="包含系统的详细配置信息、技术栈说明以及开发规范等内容。"
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <div className="detail-list">
            <p><strong>技术栈：</strong> React 18 + Vite + Ant Design</p>
            <p><strong>状态管理：</strong> Zustand</p>
            <p><strong>路由管理：</strong> React Router v6</p>
            <p><strong>样式方案：</strong> SCSS + PostCSS</p>
            <p><strong>数据请求：</strong> TanStack Query + Axios</p>
          </div>
        </div>
      )
    },
    {
      key: '3',
      label: '配置',
      children: (
        <div className="tab-content">
          <Alert
            message="系统配置"
            description="系统的各项配置参数和环境变量设置。"
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <div className="config-section">
            <h4>开发环境配置</h4>
            <Tag color="processing">开发模式</Tag>
            <Tag color="success">热重载</Tag>
            <Tag color="warning">调试模式</Tag>
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="feature2">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>功能2</h1>
            <p>展示流程步骤和时间线组件</p>
          </div>
          <div className="action-buttons">
            <Button type="primary" icon={<BulbOutlined />}>
              查看示例
            </Button>
          </div>
        </div>
      </div>

      {/* 步骤条区域 */}
      <Card title="流程步骤" className="steps-card">
        <Steps current={currentStep} className="custom-steps">
          <Step
            title="开始"
            description="项目初始化"
            icon={<BulbOutlined />}
          />
          <Step
            title="进行中"
            description="功能开发"
            icon={<SyncOutlined spin />}
          />
          <Step
            title="测试"
            description="质量保证"
            icon={<ToolOutlined />}
          />
          <Step
            title="完成"
            description="项目交付"
            icon={<CheckCircleOutlined />}
          />
        </Steps>

        <div className="steps-action">
          <Button onClick={prevStep} disabled={currentStep <= 0}>
            上一步
          </Button>
          <Button type="primary" onClick={nextStep} disabled={currentStep >= 3}>
            下一步
          </Button>
        </div>
      </Card>

      {/* 内容区域 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="项目时间线" className="timeline-card">
            <Timeline items={timelineData} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="功能详情" className="tabs-card">
            <Tabs items={tabItems} />
          </Card>
        </Col>
      </Row>

      {/* 状态展示区域 */}
      <Card title="状态监控" className="status-card">
        <Row gutter={[24, 24]}>
          <Col xs={12} sm={6}>
            <div className="status-item">
              <CheckCircleOutlined className="status-icon success" />
              <div className="status-text">
                <div className="status-title">系统正常</div>
                <div className="status-desc">运行状态良好</div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="status-item">
              <SyncOutlined className="status-icon processing" spin />
              <div className="status-text">
                <div className="status-title">数据同步</div>
                <div className="status-desc">正在同步中</div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="status-item">
              <ClockCircleOutlined className="status-icon warning" />
              <div className="status-text">
                <div className="status-title">待处理</div>
                <div className="status-desc">3个任务待处理</div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="status-item">
              <CloseCircleOutlined className="status-icon error" />
              <div className="status-text">
                <div className="status-title">异常警告</div>
                <div className="status-desc">需要关注</div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Feature2