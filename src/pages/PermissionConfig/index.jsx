import React, { useState } from 'react'
import { Card, Table, Button, Modal, Form, Input, Select, Tree, Tag, Space, Popconfirm, message, Row, Col } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

const { TextArea } = Input
const { Option } = Select

/**
 * 权限配置页面
 */
const PermissionConfig = () => {
  const { setBreadcrumbs } = useGlobalStore()
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPermission, setEditingPermission] = useState(null)
  const [selectedModule, setSelectedModule] = useState('all')

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '权限管理', path: '#' },
      { title: '权限配置', path: '/permissions' }
    ])
  }, [setBreadcrumbs])

  // 模拟权限数据 - 只包含菜单权限
  const mockPermissions = [
    {
      id: '1',
      name: '仪表盘',
      code: 'dashboard',
      module: '核心功能',
      type: 'menu',
      description: '允许访问和查看仪表盘页面',
      status: 'active',
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: '2',
      name: '用户管理',
      code: 'user_management',
      module: '核心功能',
      type: 'menu',
      description: '允许访问用户管理页面',
      status: 'active',
      createTime: '2024-01-01 10:10:00'
    },
    {
      id: '3',
      name: '订单管理',
      code: 'order_management',
      module: '业务功能',
      type: 'menu',
      description: '允许访问订单管理页面',
      status: 'active',
      createTime: '2024-01-01 10:30:00'
    },
    {
      id: '4',
      name: '系统设置',
      code: 'system_settings',
      module: '系统管理',
      type: 'menu',
      description: '允许访问系统设置页面',
      status: 'active',
      createTime: '2024-01-01 10:35:00'
    },
    {
      id: '5',
      name: '角色管理',
      code: 'role_management',
      module: '权限管理',
      type: 'menu',
      description: '允许访问角色管理页面',
      status: 'active',
      createTime: '2024-01-01 10:40:00'
    },
    {
      id: '6',
      name: '权限配置',
      code: 'permission_management',
      module: '权限管理',
      type: 'menu',
      description: '允许访问权限配置页面',
      status: 'active',
      createTime: '2024-01-01 10:45:00'
    }
  ]

  // 权限类型配置
  const permissionTypeConfig = {
    menu: { color: 'blue', text: '菜单权限' }
  }

  // 获取过滤后的权限数据
  const filteredPermissions = selectedModule === 'all'
    ? mockPermissions
    : mockPermissions.filter(p => p.module === selectedModule)

  // 模块选项
  const moduleOptions = [
    { value: 'all', label: '全部模块' },
    { value: '核心功能', label: '核心功能' },
    { value: '业务功能', label: '业务功能' },
    { value: '系统管理', label: '系统管理' },
    { value: '权限管理', label: '权限管理' }
  ]

  // 表格列配置
  const columns = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '权限代码',
      dataIndex: 'code',
      key: 'code',
      width: 160,
      render: (code) => <Tag color="blue">{code}</Tag>
    },
    {
      title: '所属模块',
      dataIndex: 'module',
      key: 'module',
      width: 120,
      render: (module) => <Tag>{module}</Tag>
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => (
        <Tag color={permissionTypeConfig[type]?.color}>
          {permissionTypeConfig[type]?.text}
        </Tag>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      )
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
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此权限吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleAdd = () => {
    setEditingPermission(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (permission) => {
    setEditingPermission(permission)
    form.setFieldsValue(permission)
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    message.success('删除成功')
    // TODO: 调用删除API
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingPermission) {
        message.success('权限更新成功')
      } else {
        message.success('权限创建成功')
      }

      setIsModalVisible(false)
      form.resetFields()
      // TODO: 调用API保存权限
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div className="permission-config">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>权限配置</h1>
            <p>管理系统中的菜单访问权限</p>
          </div>
          <div className="action-buttons">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新建权限
            </Button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]} className="stats-cards">
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-value">{mockPermissions.length}</div>
              <div className="stat-label">总权限数</div>
            </div>
            <div className="stat-icon primary">
              <i className="fas fa-shield-alt" />
            </div>
          </Card>
        </Col>
                 <Col xs={12} sm={6}>
           <Card className="stat-card">
             <div className="stat-content">
               <div className="stat-value">{mockPermissions.filter(p => p.module === '核心功能').length}</div>
               <div className="stat-label">核心功能</div>
             </div>
             <div className="stat-icon blue">
               <i className="fas fa-home" />
             </div>
           </Card>
         </Col>
         <Col xs={12} sm={6}>
           <Card className="stat-card">
             <div className="stat-content">
               <div className="stat-value">{mockPermissions.filter(p => p.module === '业务功能').length}</div>
               <div className="stat-label">业务功能</div>
             </div>
             <div className="stat-icon success">
               <i className="fas fa-briefcase" />
             </div>
           </Card>
         </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-value">{mockPermissions.filter(p => p.status === 'active').length}</div>
              <div className="stat-label">已启用</div>
            </div>
            <div className="stat-icon warning">
              <i className="fas fa-check-circle" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 权限列表 */}
      <Card className="permission-list-card">
        <div className="list-header">
          <h3>权限列表</h3>
          <div className="filter-section">
            <Select
              value={selectedModule}
              onChange={setSelectedModule}
              style={{ width: 150 }}
              placeholder="选择模块"
            >
              {moduleOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredPermissions}
          rowKey="id"
          pagination={{
            total: filteredPermissions.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* 新建/编辑权限弹窗 */}
      <Modal
        title={editingPermission ? '编辑权限' : '新建权限'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          className="permission-form"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="权限名称"
                name="name"
                rules={[{ required: true, message: '请输入权限名称' }]}
              >
                <Input placeholder="请输入权限名称" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="权限代码"
                name="code"
                rules={[{ required: true, message: '请输入权限代码' }]}
              >
                <Input placeholder="例如: user:create" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="所属模块"
                name="module"
                rules={[{ required: true, message: '请选择所属模块' }]}
              >
                <Select placeholder="请选择所属模块">
                  {moduleOptions.slice(1).map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="权限类型"
                name="type"
                rules={[{ required: true, message: '请选择权限类型' }]}
              >
                                 <Select placeholder="请选择权限类型" defaultValue="menu">
                   <Option value="menu">菜单权限</Option>
                 </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="权限描述"
                name="description"
              >
                <TextArea rows={3} placeholder="请输入权限描述" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default PermissionConfig