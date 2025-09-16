import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGlobalStore } from '@stores/useGlobalStore';
import './index.scss';
import '@styles/login-override.scss';

/**
 * 登录页面组件
 * @returns {JSX.Element} 登录页面
 * @author licong
 * @created 2024-09-16
 */
const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setBreadcrumbs, setUser } = useGlobalStore();

  // 设置面包屑和全屏样式
  React.useEffect(() => {
    setBreadcrumbs([{ title: '首页', path: '/' }, { title: '用户登录' }]);

    // 添加全屏样式类
    document.body.classList.add('login-page-body');

    // 组件卸载时移除样式类
    return () => {
      document.body.classList.remove('login-page-body');
    };
  }, [setBreadcrumbs]);

  /**
   * 处理登录表单提交
   * @param {Object} values - 表单值
   * @returns {Promise<void>}
   */
  const handleSubmit = async values => {
    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 模拟保存登录状态
      const userData = {
        username: values.username,
        token: 'mock-jwt-token-' + Date.now(),
        permissions: [
          'dashboard',
          'user_management',
          'order_management',
          'feature_collection',
          'system_settings',
          'role_management',
          'permission_management'
        ],
        roles: ['user', 'admin'],
      };

      // 保存用户信息到localStorage（实际项目中可能使用更安全的方式）
      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userInfo', JSON.stringify(userData));

      // 更新全局状态
      setUser({
        username: userData.username,
        role: 'admin', // 设置为管理员角色以获取所有权限
        permissions: userData.permissions,
        roles: userData.roles,
      });

      message.success('登录成功！即将跳转到后台首页...');
      console.log('登录信息:', values);

      // 延迟一下让用户看到成功消息，然后跳转到后台首页
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    } catch (error) {
      message.error('登录失败，请检查用户名和密码');
      console.error('登录错误:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理忘记密码
   */
  const handleForgotPassword = () => {
    message.info('忘记密码功能开发中...');
  };

  /**
   * 处理注册跳转
   */
  const handleRegister = () => {
    message.info('注册功能开发中...');
  };

  const handleWechatLogin = () => {
    message.info('微信登录功能开发中...');
  };

  const handleQQLogin = () => {
    message.info('QQ登录功能开发中...');
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="background-overlay"></div>
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="login-container">
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <div className="logo-section">
              <i className="fas fa-user-shield logo-icon" />
              <h1>系统登录</h1>
              <p>欢迎使用CRM管理系统</p>
            </div>
          </div>

          <Form form={form} name="login" className="login-form" size="large" onFinish={handleSubmit} autoComplete="off" layout="vertical">
            <Form.Item
              name="username"
              label="用户名/邮箱"
              rules={[
                { required: true, message: '请输入用户名或邮箱' },
                { min: 3, message: '用户名至少3个字符' },
              ]}>
              <Input prefix={<UserOutlined className="input-icon" />} placeholder="请输入用户名或邮箱" allowClear />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' },
              ]}>
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="请输入密码"
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                visibilityToggle={{
                  visible: showPassword,
                  onVisibleChange: setShowPassword,
                }}
              />
            </Form.Item>

            <Form.Item className="form-options">
              <div className="options-wrapper">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Button type="link" className="forgot-password" onClick={handleForgotPassword}>
                  忘记密码？
                </Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button" loading={loading} block>
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>

            <Divider>其他登录方式</Divider>

            <div className="social-login">
              <Button className="social-btn social-btn-wechat" onClick={handleWechatLogin}>
                <i className="fab fa-weixin" />
                微信登录
              </Button>
              <Button className="social-btn social-btn-qq" onClick={handleQQLogin}>
                <i className="fab fa-qq" />
                QQ登录
              </Button>
            </div>

            <div className="register-section">
              <span>还没有账号？</span>
              <Button type="link" onClick={handleRegister} >
                立即注册
              </Button>
            </div>
          </Form>
        </Card>

        <div className="login-footer">
          <p>&copy; 2024 CRM管理系统. 保留所有权利.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
