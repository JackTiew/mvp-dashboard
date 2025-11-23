// Rules Studio page - CRUD operations for rules
import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Modal,
  Popconfirm,
  Input,
  Select,
  Row,
  Col,
  Card,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ruleService } from '../service/rule';
import { RuleForm } from '../components/RuleForm';
import { format } from 'date-fns';
import type { IRule, RuleType, RuleStatus } from '../interface/rule';
import styles from './RulesStudio.module.css';

export const RulesStudio = () => {
  const [rules, setRules] = useState<IRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<IRule | undefined>(undefined);

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<RuleType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<RuleStatus | 'all'>('all');

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    setLoading(true);
    try {
      const data = await ruleService.getRuleList();
      setRules(data);
    } catch (error) {
      message.error('Failed to fetch rules');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingRule(undefined);
    setModalOpen(true);
  };

  const handleEdit = (rule: IRule) => {
    setEditingRule(rule);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await ruleService.deleteRule(id);
      message.success('Rule deleted successfully');
      initData();
    } catch (error) {
      message.error('Failed to delete rule');
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingRule(undefined);
  };

  const handleSuccess = () => {
    initData();
    handleModalClose();
  };

  const handleClearFilters = () => {
    setNameFilter('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  // Filter rules based on current filter values
  const filteredRules = rules.filter((rule) => {
    const matchesName = nameFilter === '' || rule.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || rule.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || rule.status === statusFilter;
    return matchesName && matchesType && matchesStatus;
  });

  const columns: ColumnsType<IRule> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      render: (type: string) => {
        const colors = {
          bank_change: 'blue',
          duplicate: 'orange',
          over_limit: 'red',
        };
        return <Tag color={colors[type as keyof typeof colors]}>{type.replace('_', ' ').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      render: (status: string) => (
        <Tag color={status === 'enabled' ? 'green' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      width: '16%',
      render: (date: string) => format(new Date(date), 'MMM dd, yyyy HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '8%',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete rule?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.headerSection}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Create Rule
        </Button>
      </div>

      <Card className={styles.filterCard}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search by name..."
              prefix={<SearchOutlined />}
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by type"
              className={styles.fullWidth}
              value={typeFilter}
              onChange={(value) => setTypeFilter(value)}
              options={[
                { label: 'All Types', value: 'all' },
                { label: 'Bank Change', value: 'bank_change' },
                { label: 'Duplicate', value: 'duplicate' },
                { label: 'Over Limit', value: 'over_limit' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by status"
              className={styles.fullWidth}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { label: 'All Statuses', value: 'all' },
                { label: 'Enabled', value: 'enabled' },
                { label: 'Disabled', value: 'disabled' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
              block
              disabled={nameFilter === '' && typeFilter === 'all' && statusFilter === 'all'}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredRules}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingRule ? 'Edit Rule' : 'Create Rule'}
        open={modalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={window.innerWidth < 768 ? '100%' : 800}
        style={window.innerWidth < 768 ? { top: 0, paddingBottom: 0, maxWidth: '100vw' } : {}}
      >
        <RuleForm
          rule={editingRule}
          onSuccess={handleSuccess}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
};

