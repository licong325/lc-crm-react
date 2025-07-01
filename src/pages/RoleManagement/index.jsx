import React, { useState } from 'react'
import { Card, Table, Button, Modal, Form, Input, Tree, Tag, Space, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

const { TextArea } = Input

/**
 * 角色管理页面
 */
const RoleManagement = () => {
  const { setBreadcrumbs } = useGlobalStore()
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [checkedPermissions, setCheckedPermissions] = useState([])

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '权限管理', path: '#' },
      { title: '角色管理', path: '/roles' }
    ])
  }, [setBreadcrumbs])

  // 模拟角色数据
  const mockRoles = [
    {
      id: '1',
      name: '超级管理员',
      code: 'admin',
      description: '拥有系统全部权限',
      userCount: 2,
      status: 'active',
      createTime: '2024-01-01 10:00:00'
    },
    {
      id: '2',
      name: '管理员',
      code: 'manager',
      description: '拥有大部分管理权限',
      userCount: 5,
      status: 'active',
      createTime: '2024-01-02 11:00:00'
    },
    {
      id: '3',
      name: '普通用户',
      code: 'user',
      description: '基础查看权限',
      userCount: 50,
      status: 'active',
      createTime: '2024-01-03 12:00:00'
    },
    {
      id: '4',
      name: '客服',
      code: 'service',
      description: '客户服务相关权限',
      userCount: 8,
      status: 'inactive',
      createTime: '2024-01-04 13:00:00'
    }
  ]

  // 菜单权限树结构
  const permissionTreeData = [
    {
      title: '核心功能',
      key: 'core',
      children: [
        { title: '仪表盘', key: 'dashboard' },
        { title: '用户管理', key: 'user_management' }
      ]
    },
    {
      title: '业务功能',
      key: 'business',
      children: [
        { title: '订单管理', key: 'order_management' }
      ]
    },
    {
      title: '系统管理',
      key: 'system',
      children: [
        { title: '系统设置', key: 'system_settings' }
      ]
    },
    {
      title: '权限管理',
      key: 'permission',
      children: [
        { title: '角色管理', key: 'role_management' },
        { title: '权限配置', key: 'permission_management' }
      ]
    }
  ]

  // 表格列配置
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 120
    },
    {
      title: '角色代码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      render: (code) => <Tag color="blue">{code}</Tag>
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 100,
      render: (count) => <span>{count} 人</span>
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
            title="确定删除此角色吗？"
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
    setEditingRole(null)
    setCheckedPermissions([])
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (role) => {
    setEditingRole(role)
    form.setFieldsValue(role)
    // 模拟已有权限
    setCheckedPermissions(['dashboard', 'user_management', 'order_management'])
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    message.success('删除成功')
    // TODO: 调用删除API
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const roleData = {
        ...values,
        permissions: checkedPermissions
      }

      if (editingRole) {
        message.success('角色更新成功')
      } else {
        message.success('角色创建成功')
      }

      setIsModalVisible(false)
      form.resetFields()
      setCheckedPermissions([])
      // TODO: 调用API保存角色
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
    setCheckedPermissions([])
  }

  const onPermissionCheck = (checkedKeys) => {
    setCheckedPermissions(checkedKeys)
  }

  return (
    <div className="role-management">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>角色管理</h1>
            <p>管理系统中的用户角色和菜单权限分配</p>
          </div>
          <div className="action-buttons">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新建角色
            </Button>
          </div>
        </div>
      </div>

      {/* 角色列表 */}
      <Card className="role-list-card">
        <Table
          columns={columns}
          dataSource={mockRoles}
          rowKey="id"
          pagination={{
            total: 20,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      {/* 新建/编辑角色弹窗 */}
      <Modal
        title={editingRole ? '编辑角色' : '新建角色'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          className="role-form"
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            label="角色代码"
            name="code"
            rules={[{ required: true, message: '请输入角色代码' }]}
          >
            <Input placeholder="请输入角色代码" />
          </Form.Item>

          <Form.Item
            label="角色描述"
            name="description"
          >
            <TextArea rows={3} placeholder="请输入角色描述" />
          </Form.Item>

          <Form.Item label="权限配置">
            <div className="permission-tree-container">
              <Tree
                checkable
                checkedKeys={checkedPermissions}
                onCheck={onPermissionCheck}
                treeData={permissionTreeData}
                className="permission-tree"
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default RoleManagement