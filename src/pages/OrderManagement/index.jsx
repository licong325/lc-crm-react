import React from 'react'
import { Card, Row, Col, Button, Input, Table, Tag, Space, Dropdown } from 'antd'
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  MoreOutlined
} from '@ant-design/icons'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

/**
 * 订单管理页面
 */
const OrderManagement = () => {
  const { setBreadcrumbs } = useGlobalStore()

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '订单管理', path: '/orders' }
    ])
  }, [setBreadcrumbs])

  // 模拟订单数据
  const mockOrders = [
    {
      id: '1',
      orderNo: 'ORD-2024-001',
      customer: '张三',
      amount: 1299.00,
      status: 'pending',
      createTime: '2024-01-15 10:30:00',
      paymentMethod: '微信支付'
    },
    {
      id: '2',
      orderNo: 'ORD-2024-002',
      customer: '李四',
      amount: 599.00,
      status: 'completed',
      createTime: '2024-01-15 09:15:00',
      paymentMethod: '支付宝'
    },
    {
      id: '3',
      orderNo: 'ORD-2024-003',
      customer: '王五',
      amount: 2099.00,
      status: 'cancelled',
      createTime: '2024-01-14 16:45:00',
      paymentMethod: '银行卡'
    }
  ]

  // 订单状态配置
  const statusConfig = {
    pending: { color: 'processing', text: '待处理' },
    completed: { color: 'success', text: '已完成' },
    cancelled: { color: 'error', text: '已取消' },
    refunded: { color: 'warning', text: '已退款' }
  }

  // 表格列配置
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150
    },
    {
      title: '客户姓名',
      dataIndex: 'customer',
      key: 'customer',
      width: 120
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => `¥${amount.toFixed(2)}`
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={statusConfig[status]?.color}>
          {statusConfig[status]?.text}
        </Tag>
      )
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">
            查看
          </Button>
          <Dropdown
            menu={{
              items: [
                { key: 'edit', label: '编辑' },
                { key: 'delete', label: '删除' },
                { key: 'refund', label: '退款' }
              ]
            }}
            placement="bottomRight"
          >
            <Button type="link" size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ]

  return (
    <div className="order-management">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>订单管理</h1>
            <p>管理系统中的所有订单信息</p>
          </div>
          <div className="action-buttons">
            <Button icon={<DownloadOutlined />}>
              导出订单
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              新建订单
            </Button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]} className="stats-cards">
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-value">245</div>
              <div className="stat-label">总订单数</div>
            </div>
            <div className="stat-icon primary">
              <i className="fas fa-shopping-cart" />
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-value">189</div>
              <div className="stat-label">已完成</div>
            </div>
            <div className="stat-icon success">
              <i className="fas fa-check-circle" />
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-value">32</div>
              <div className="stat-label">待处理</div>
            </div>
            <div className="stat-icon warning">
              <i className="fas fa-clock" />
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-value">¥28.5万</div>
              <div className="stat-label">总金额</div>
            </div>
            <div className="stat-icon primary">
              <i className="fas fa-money-bill-wave" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 订单列表 */}
      <Card className="order-list-card">
        <div className="list-header">
          <h3>订单列表</h3>
          <div className="search-filters">
            <Input.Search
              placeholder="搜索订单编号或客户姓名"
              allowClear
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Button icon={<FilterOutlined />}>
              筛选
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={mockOrders}
          rowKey="id"
          pagination={{
            total: 50,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
}

export default OrderManagement