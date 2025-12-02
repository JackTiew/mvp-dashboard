import { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Tag, Spin } from 'antd';
import {
  RobotOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import styles from './Home.module.css';
import { dashboardService } from '../service/dashboard';
import type { DashboardData } from '../interface/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }
  // Columns for open incidents table
  const incidentsColumns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string) => <span style={{ color: '#8c8c8c' }}>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '',
      dataIndex: 'risk',
      key: 'risk',
      width: 100,
      render: (risk: string) => (
        <Tag
          color={
            risk === 'High' ? 'red' : risk === 'Medium' ? 'orange' : 'green'
          }
        >
          {risk}
        </Tag>
      ),
    },
  ];

  // Columns for tasks table
  const tasksColumns = [
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      render: (text: string) => <span style={{ color: '#8c8c8c' }}>{text}</span>,
    },
  ];

  // Columns for detailed incidents
  const detailedIncidentsColumns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (text: string) => <span style={{ color: '#8c8c8c' }}>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag
          color={
            status === 'High'
              ? 'red'
              : status === 'Outdated'
              ? 'blue'
              : 'green'
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  // Chart data for Requests Over Time
  const requestsChartData = {
    labels: dashboardData.requestsOverTime.labels,
    datasets: [
      {
        label: 'Workflows',
        data: dashboardData.requestsOverTime.values,
        fill: true,
        backgroundColor: 'rgba(24, 144, 255, 0.1)',
        borderColor: 'rgba(24, 144, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for Integrity KPI Trend
  const integrityTrendData = {
    labels: dashboardData.integrityTrend.labels,
    datasets: [
      {
        label: 'Integrity Score',
        data: dashboardData.integrityTrend.values,
        fill: true,
        backgroundColor: 'rgba(24, 144, 255, 0.1)',
        borderColor: 'rgba(24, 144, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  // Chart data for Governance Activities
  const governanceActivitiesData = {
    labels: dashboardData.governanceActivities.labels,
    datasets: [
      {
        label: 'Activities',
        data: dashboardData.governanceActivities.values,
        backgroundColor: 'rgba(24, 144, 255, 0.6)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        {/* Left Section */}
        <Col xs={24} lg={16}>
          {/* Row 1: KPI Cards */}
          <Row gutter={[16, 16]} className={styles.kpiRow}>
            <Col xs={24} sm={8}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>TASKS</span>
                </div>
                <div className={styles.kpiValue}>{dashboardData.kpi.tasks}</div>
                <div className={styles.kpiDescription}>
                  Approvals & integrity actions requiring your attention.
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>INCIDENTS</span>
                </div>
                <div className={styles.kpiValue}>{dashboardData.kpi.incidents}</div>
                <div className={styles.kpiDescription}>
                  Open integrity, compliance & culture cases.
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className={styles.kpiCard}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>INTEGRITY KPI</span>
                </div>
                <div className={styles.kpiValue}>
                  {dashboardData.kpi.integrityScore}{' '}
                  <span className={styles.kpiChange}>
                    <ArrowUpOutlined /> +{dashboardData.kpi.integrityChange}
                  </span>
                </div>
                <div className={styles.kpiDescription}>
                  Quarterly integrity score across the organisation.
                </div>
              </Card>
            </Col>
          </Row>

          {/* Row 2: Open Incidents and Tasks */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12}>
              <Card
                title="Open Incidents"
                extra={<a href="/incidents">Risk view</a>}
                className={styles.sectionCard}
              >
                <Table
                  dataSource={dashboardData.openIncidents}
                  columns={incidentsColumns}
                  pagination={false}
                  showHeader={false}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Tasks" className={styles.sectionCard}>
                <Table
                  dataSource={dashboardData.tasks}
                  columns={tasksColumns}
                  pagination={false}
                  showHeader={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>

          {/* Row 3: Requests Over Time and Open Incidents */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12}>
              <Card
                title="Requests Over Time"
                extra={<span style={{ color: '#8c8c8c', fontSize: '12px' }}>Workflows in last 6 months</span>}
                className={styles.chartCard}
              >
                <div style={{ height: '200px' }}>
                  <Line data={requestsChartData} options={chartOptions} />
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title="Open Incidents"
                extra={<span style={{ color: '#8c8c8c', fontSize: '12px' }}>Risk level</span>}
                className={styles.chartCard}
              >
                <Table
                  dataSource={dashboardData.detailedIncidents}
                  columns={detailedIncidentsColumns}
                  pagination={false}
                  showHeader={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right Section */}
        <Col xs={24} lg={8}>
          {/* Row 1: AI Executive Insight */}
          <Card className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <RobotOutlined className={styles.aiIcon} />
              <span className={styles.aiTitle}>AI EXECUTIVE INSIGHT</span>
            </div>
            <h3 className={styles.insightTitle}>{dashboardData.aiInsight.title}</h3>
            <ul className={styles.insightList}>
              {dashboardData.aiInsight.points.map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: point.replace(/(\d+\.?\d*\s*points?)/g, '<strong>$1</strong>') }} />
              ))}
            </ul>
            <div className={styles.insightFooter}>
              {dashboardData.aiInsight.footer}
            </div>
          </Card>

          {/* Row 2: Integrity KPI Trend */}
          <Card
            title="Integrity KPI Trend"
            extra={<span style={{ color: '#8c8c8c', fontSize: '12px' }}>Last 6 months</span>}
            className={styles.chartCard}
            style={{ marginTop: 16 }}
          >
            <div style={{ height: '150px' }}>
              <Line data={integrityTrendData} options={chartOptions} />
            </div>
          </Card>

          {/* Row 3: Governance Activities */}
          <Card
            title="Governance Activities"
            extra={<span style={{ color: '#8c8c8c', fontSize: '12px' }}>Policies · Training · Reviews</span>}
            className={styles.chartCard}
            style={{ marginTop: 16 }}
          >
            <div style={{ height: '150px' }}>
              <Bar data={governanceActivitiesData} options={barChartOptions} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

