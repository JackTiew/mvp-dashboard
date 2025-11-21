// Metrics page with charts
import { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, message, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { metricService } from '../service/metric';
import { format } from 'date-fns';
import type { IMetrics } from '../interface/metric';
import styles from './Metrics.module.css';
import { CHART_COLORS } from '../common/constants';

const { Title } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

export const Metrics = () => {
  const [metrics, setMetrics] = useState<IMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setLoading(true);
    try {
      const data = await metricService.getMetrics();
      setMetrics(data);
    } catch (error) {
      message.error('Failed to fetch metrics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  const exceptionsByTypeData = {
    labels: Object.keys(metrics.exceptions_by_type).map((type) =>
      type.replace('_', ' ').toUpperCase()
    ),
    datasets: [
      {
        label: 'Exceptions Count',
        data: Object.values(metrics.exceptions_by_type),
        backgroundColor: [
          CHART_COLORS.BLUE,
          CHART_COLORS.ORANGE,
          CHART_COLORS.RED,
        ],
        borderColor: [
          CHART_COLORS.BLUE,
          CHART_COLORS.ORANGE,
          CHART_COLORS.RED,
        ],
        borderWidth: 1,
      },
    ],
  };

  const preventedLossData = {
    labels: metrics.prevented_loss_series.map((point) =>
      format(new Date(point.date), 'MMM dd')
    ),
    datasets: [
      {
        label: 'Prevented Loss ($)',
        data: metrics.prevented_loss_series.map((point) => point.amount),
        fill: true,
        backgroundColor: CHART_COLORS.DARK_BLUE,
        borderColor: CHART_COLORS.GREEN,
        tension: 0.4,
      },
    ],
  };

  const isMobile = window.innerWidth < 768;

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return '$' + Number(value).toLocaleString();
          },
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 9 : 11,
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
        },
      },
    },
  };

  const totalExceptions = Object.values(metrics.exceptions_by_type).reduce(
    (sum, val) => sum + val,
    0
  );

  const totalPreventedLoss = metrics.prevented_loss_series.reduce(
    (sum, point) => sum + point.amount,
    0
  );

  return (
    <div>
      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col xs={24} sm={12}>
          <Card>
            <div className={styles.statCard}>
              <Title level={2} className={`${styles.statValue} ${styles.statValueBlue}`}>
                {totalExceptions}
              </Title>
              <Title level={5} type="secondary" className={styles.statLabel}>
                Total Exceptions
              </Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <div className={styles.statCard}>
              <Title level={2} className={`${styles.statValue} ${styles.statValueGreen}`}>
                ${totalPreventedLoss.toLocaleString()}
              </Title>
              <Title level={5} type="secondary" className={styles.statLabel}>
                Total Prevented Loss
              </Title>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Exceptions by Type" className={styles.fullHeightCard}>
            <div className={styles.chartContainer}>
              <Bar data={exceptionsByTypeData} options={barOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Prevented Loss Trend" className={styles.fullHeightCard}>
            <div className={styles.chartContainer}>
              <Line data={preventedLossData} options={lineOptions} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

