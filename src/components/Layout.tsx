// Main layout component with navigation
import { useState, useEffect } from 'react';
import { Layout as AntLayout, Menu, Switch, Typography, Button, Dropdown } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  BarChartOutlined,
  BulbOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Layout.module.css';

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <BarChartOutlined />,
      label: <Link to="/">Metrics</Link>,
    },
    {
      key: '/case',
      icon: <DashboardOutlined />,
      label: <Link to="/case">Case Dashboard</Link>,
    },
    {
      key: '/rules',
      icon: <FileTextOutlined />,
      label: <Link to="/rules">Rules Studio</Link>,
    },
    {
      key: '/data-connector',
      icon: <CloudUploadOutlined />,
      label: <Link to="/data-connector">Data Connector</Link>,
    },
  ];

  // Get dynamic page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Metrics Dashboard';
      case '/case':
        return 'Case Dashboard';
      case '/rules':
        return 'Rules Studio';
      case '/data-connector':
        return 'Data Connector';
      default:
        return 'Page not found';
    }
  };

  return (
    <AntLayout className={styles.layout}>
      {/* Mobile menu backdrop */}
      {isMobile && mobileMenuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {!isMobile ? (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className={styles.sider}
        >
          <div className={styles.logoContainer}>
            {!collapsed && (
              <Title level={4} className={styles.logoTitle}>
                Sustainawise
              </Title>
            )}
          </div>
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={menuItems}
          />
        </Sider>
      ) : (
        <Sider
          trigger={null}
          collapsible
          collapsed={!mobileMenuOpen}
          onCollapse={() => setMobileMenuOpen(false)}
          className={styles.mobileSider}
          breakpoint="md"
          collapsedWidth={0}
        >
          <div className={styles.logoContainer}>
            <Title level={4} className={styles.logoTitle}>
              Sustainawise
            </Title>
          </div>
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={menuItems}
            onClick={() => setMobileMenuOpen(false)}
          />
        </Sider>
      )}
      <AntLayout>
        <Header className={`${styles.header} ${theme === 'dark' ? styles.headerDark : styles.headerLight}`}>
          <div className={styles.headerLeft}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={styles.mobileMenuButton}
              />
            )}
            <Title level={3} className={styles.pageTitle}>
              {getPageTitle()}
            </Title>
          </div>
          <div className={styles.headerActions}>
            {!isMobile && <BulbOutlined />}
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren={isMobile ? '' : 'Dark'}
              unCheckedChildren={isMobile ? '' : 'Light'}
            />
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: () => {
                      logout();
                      navigate('/login');
                    },
                  },
                ],
              }}
              placement="bottomRight"
            >
              <Button icon={<UserOutlined />}>
                {!isMobile && user?.username}
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
