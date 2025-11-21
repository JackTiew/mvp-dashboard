// Case Dashboard page with table and detail drawer
import { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Input,
  Select,
  Space,
  Button,
  Drawer,
  Typography,
  message,
  Card,
  Descriptions,
  Divider,
} from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { caseService } from '../service/case';
import { format } from 'date-fns';
import type { ICase } from '../interface/case';
import styles from './CaseDashboard.module.css';
import { COLORS } from '../common/constants';

const { Text } = Typography;

export const CaseDashboard = () => {
  const [cases, setCases] = useState<ICase[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ICase | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  useEffect(() => {
    initData(pagination.current, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initData = async (page: number = 1, status: string = 'all') => {
    setLoading(true);
    try {
      const data = await caseService.getCaseList({ status, page, pageSize: pagination.pageSize });
      setCases(data.cases);
      setPagination({
        current: data.page,
        pageSize: data.page_size,
        total: data.total,
      });
    } catch (error) {
      message.error('Failed to fetch cases');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleTableChange = (newPagination: { current: number }) => {
  //   initData(newPagination.current, statusFilter);
  // };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    initData(1, value);
  };

  const handleViewDetails = (caseItem: ICase) => {
    setSelectedCase(caseItem);
    setDrawerOpen(true);
  };

  const handleAction = async (action: 'hold' | 'release' | 'callback_done') => {
    if (!selectedCase) return;

    try {
      await caseService.performCaseAction({ id: selectedCase.id, payload: { action } });
      message.success(`Case ${action} successful`);
      setDrawerOpen(false);
      initData(pagination.current, statusFilter);
    } catch (error) {
      message.error(`Failed to ${action} case`);
      console.error(error);
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'approve':
        return COLORS.GREEN;
      case 'reject':
        return COLORS.RED;
      case 'review':
        return COLORS.ORANGE;
      default:
        return COLORS.DEFAULT;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return COLORS.BLUE;
      case 'held':
        return COLORS.ORANGE;
      case 'released':
        return COLORS.GREEN;
      case 'callback_done':
        return COLORS.PURPLE;
      default:
        return COLORS.DEFAULT;
    }
  };

  const columns: ColumnsType<ICase> = [
    {
      title: 'Case ID',
      dataIndex: 'id',
      key: 'id',
      width: '12%',
      render: (id: string) => <Text code>{id}</Text>,
    },
    {
      title: 'Decision',
      dataIndex: 'decision',
      key: 'decision',
      width: '10%',
      render: (decision: string) => (
        <Tag color={getDecisionColor(decision)}>{decision.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Reasons',
      dataIndex: 'reasons',
      key: 'reasons',
      width: '25%',
      render: (reasons: string[]) => (
        <>
          {reasons.length > 0 ? (
            reasons.slice(0, 2).map((reason, idx) => (
              <Tag key={idx} color="warning" className={styles.reasonTag}>
                {reason}
              </Tag>
            ))
          ) : (
            <Text type="secondary">No issues</Text>
          )}
          {reasons.length > 2 && <Text type="secondary"> +{reasons.length - 2} more</Text>}
        </>
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      width: '15%',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.vendor.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '12%',
      render: (amount: number) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '13%',
      render: (date: string) => format(new Date(date), 'MMM dd, HH:mm'),
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '8%',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  const filteredCases = cases.filter(
    (c) =>
      searchText === '' ||
      c.vendor.toLowerCase().includes(searchText.toLowerCase()) ||
      c.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className={styles.filterSection}>
        <Space className={styles.filterSpace}>
          <Input
            placeholder="Search by vendor or case ID"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchInput}
          />
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className={styles.statusSelect}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Open', value: 'open' },
              { label: 'Held', value: 'held' },
              { label: 'Released', value: 'released' },
              { label: 'Callback Done', value: 'callback_done' },
            ]}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCases}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        // onChange={handleTableChange}
        scroll={{ x: 1200 }}
      />

      <Drawer
        title="Case Details"
        placement="right"
        width={window.innerWidth < 768 ? '100%' : 720}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {selectedCase && (
          <div>
            <Descriptions bordered column={{ xs: 1, sm: 2 }} size="small">
              <Descriptions.Item label="Case ID" span={2}>
                <Text code>{selectedCase.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Decision">
                <Tag color={getDecisionColor(selectedCase.decision)}>
                  {selectedCase.decision.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedCase.status)}>
                  {selectedCase.status.replace('_', ' ').toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Vendor">{selectedCase.vendor}</Descriptions.Item>
              <Descriptions.Item label="Amount">
                ${selectedCase.amount.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Created At" span={2}>
                {format(new Date(selectedCase.created_at), 'MMM dd, yyyy HH:mm:ss')}
              </Descriptions.Item>
            </Descriptions>

            <Divider>Transaction Input</Divider>
            <Card size="small">
              <pre className={styles.transactionPre}>
                {JSON.stringify(selectedCase.input, null, 2)}
              </pre>
            </Card>

            <Divider>Rule Checks</Divider>
            {selectedCase.checks.length > 0 ? (
              <Space direction="vertical" className={styles.fullWidth}>
                {selectedCase.checks.map((check, idx) => (
                  <Card
                    key={idx}
                    size="small"
                    type={check.matched ? 'inner' : undefined}
                    className={check.matched ? styles.matchedCard : undefined}
                  >
                    <Space direction="vertical" className={styles.fullWidth}>
                      <Text strong>{check.rule_name}</Text>
                      <Tag color={check.matched ? 'error' : 'success'}>
                        {check.matched ? 'MATCHED' : 'NO MATCH'}
                      </Tag>
                      <Text type="secondary">{check.details}</Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            ) : (
              <Text type="secondary">No rule checks performed</Text>
            )}

            <Divider>Reasons</Divider>
            {selectedCase.reasons.length > 0 ? (
              <Space direction="vertical">
                {selectedCase.reasons.map((reason, idx) => (
                  <Tag key={idx} color="warning">
                    {reason}
                  </Tag>
                ))}
              </Space>
            ) : (
              <Text type="secondary">No reasons flagged</Text>
            )}

            <Divider>Actions</Divider>
            <Space>
              <Button
                type="primary"
                danger
                onClick={() => handleAction('hold')}
                disabled={selectedCase.status === 'held'}
              >
                Hold
              </Button>
              <Button
                type="primary"
                onClick={() => handleAction('release')}
                disabled={selectedCase.status === 'released'}
              >
                Release
              </Button>
              <Button
                onClick={() => handleAction('callback_done')}
                disabled={selectedCase.status === 'callback_done'}
              >
                Callback Done
              </Button>
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
};

