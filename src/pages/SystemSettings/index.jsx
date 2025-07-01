import React from 'react'
import { Card, Row, Col, Form, Input, Select, Switch, Button, Divider, Tabs } from 'antd'
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons'
import { useGlobalStore } from '@stores/useGlobalStore'
import './index.scss'

const { TextArea } = Input
const { Option } = Select

/**
 * 系统设置页面
 */
const SystemSettings = () => {
  const { setBreadcrumbs } = useGlobalStore()
  const [form] = Form.useForm()

  // 设置面包屑
  React.useEffect(() => {
    setBreadcrumbs([
      { title: '首页', path: '/' },
      { title: '系统设置', path: '/settings' }
    ])
  }, [setBreadcrumbs])

  // 基础设置表单
  const BasicSettingsForm = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        siteName: 'LC CRM 后台管理系统',
        siteUrl: 'https://crm.example.com',
        adminEmail: 'admin@example.com',
        timezone: 'Asia/Shanghai',
        language: 'zh-CN',
        enableMaintenance: false,
        enableRegistration: true,
        enableEmailNotification: true
      }}
    >
      <Row gutter={[24, 0]}>
        <Col xs={24} lg={12}>
          <Form.Item
            label="站点名称"
            name="siteName"
            rules={[{ required: true, message: '请输入站点名称' }]}
          >
            <Input placeholder="请输入站点名称" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="站点URL"
            name="siteUrl"
            rules={[{ required: true, message: '请输入站点URL' }]}
          >
            <Input placeholder="请输入站点URL" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="管理员邮箱"
            name="adminEmail"
            rules={[
              { required: true, message: '请输入管理员邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入管理员邮箱" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="时区设置" name="timezone">
            <Select placeholder="请选择时区">
              <Option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</Option>
              <Option value="America/New_York">America/New_York (UTC-5)</Option>
              <Option value="Europe/London">Europe/London (UTC+0)</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="系统语言" name="language">
            <Select placeholder="请选择语言">
              <Option value="zh-CN">中文简体</Option>
              <Option value="zh-TW">中文繁体</Option>
              <Option value="en-US">English</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[24, 0]}>
        <Col xs={24} lg={8}>
          <Form.Item label="维护模式" name="enableMaintenance" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label="允许注册" name="enableRegistration" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label="邮件通知" name="enableEmailNotification" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  // 邮件设置表单
  const EmailSettingsForm = () => (
    <Form layout="vertical">
      <Row gutter={[24, 0]}>
        <Col xs={24} lg={12}>
          <Form.Item label="SMTP服务器" name="smtpHost">
            <Input placeholder="请输入SMTP服务器地址" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="SMTP端口" name="smtpPort">
            <Input placeholder="请输入SMTP端口" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="邮箱用户名" name="emailUsername">
            <Input placeholder="请输入邮箱用户名" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="邮箱密码" name="emailPassword">
            <Input.Password placeholder="请输入邮箱密码" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="邮件签名" name="emailSignature">
            <TextArea rows={4} placeholder="请输入邮件签名" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  // 安全设置表单
  const SecuritySettingsForm = () => (
    <Form layout="vertical">
      <Row gutter={[24, 0]}>
        <Col xs={24} lg={12}>
          <Form.Item label="登录失败次数限制" name="maxLoginAttempts">
            <Input type="number" placeholder="请输入次数" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="账户锁定时间(分钟)" name="lockoutDuration">
            <Input type="number" placeholder="请输入时间" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="密码最小长度" name="minPasswordLength">
            <Input type="number" placeholder="请输入长度" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="会话超时时间(分钟)" name="sessionTimeout">
            <Input type="number" placeholder="请输入时间" />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[24, 0]}>
        <Col xs={24} lg={8}>
          <Form.Item label="启用双因子认证" name="enableTwoFactor" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label="密码复杂度检查" name="enablePasswordComplexity" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item label="IP白名单" name="enableIpWhitelist" valuePropName="checked">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  // 备份设置表单
  const BackupSettingsForm = () => (
    <Form layout="vertical">
      <Row gutter={[24, 0]}>
        <Col xs={24} lg={12}>
          <Form.Item label="自动备份频率" name="backupFrequency">
            <Select placeholder="请选择备份频率">
              <Option value="daily">每日备份</Option>
              <Option value="weekly">每周备份</Option>
              <Option value="monthly">每月备份</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="备份保留天数" name="backupRetentionDays">
            <Input type="number" placeholder="请输入天数" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="备份存储路径" name="backupPath">
            <Input placeholder="请输入备份存储路径" />
          </Form.Item>
        </Col>
      </Row>

      <div className="backup-actions">
        <Button type="primary" icon={<SaveOutlined />}>
          立即备份
        </Button>
        <Button icon={<ReloadOutlined />}>
          恢复数据
        </Button>
      </div>
    </Form>
  )

  const tabItems = [
    {
      key: 'basic',
      label: '基础设置',
      children: <BasicSettingsForm />
    },
    {
      key: 'email',
      label: '邮件设置',
      children: <EmailSettingsForm />
    },
    {
      key: 'security',
      label: '安全设置',
      children: <SecuritySettingsForm />
    },
    {
      key: 'backup',
      label: '备份设置',
      children: <BackupSettingsForm />
    }
  ]

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('保存设置:', values)
      // TODO: 调用API保存设置
    })
  }

  const handleReset = () => {
    form.resetFields()
  }

  return (
    <div className="system-settings">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>系统设置</h1>
            <p>配置系统的基本参数和高级选项</p>
          </div>
          <div className="action-buttons">
            <Button onClick={handleReset}>
              重置
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              保存设置
            </Button>
          </div>
        </div>
      </div>

      {/* 设置内容 */}
      <Card className="settings-card">
        <Tabs
          items={tabItems}
          tabPosition="left"
          className="settings-tabs"
        />
      </Card>
    </div>
  )
}

export default SystemSettings