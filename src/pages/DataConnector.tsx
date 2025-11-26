import { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Upload,
  Button,
  Table,
  message,
  Space,
  Tag,
  Progress,
} from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { UploadProps, UploadFile, RcFile } from 'antd/es/upload/interface';
import type { ColumnsType } from 'antd/es/table';
import { getReports, uploadReport } from '../service/report';
import type { IReport } from '../interface/report';
import styles from './DataConnector.module.css';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export const DataConnector = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      setReports(data);
    } catch {
      message.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdfOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />;
      case 'xlsx':
        return <FileExcelOutlined style={{ fontSize: 20, color: '#52c41a' }} />;
      case 'csv':
        return <FileTextOutlined style={{ fontSize: 20, color: '#1890ff' }} />;
      default:
        return <FileTextOutlined style={{ fontSize: 20 }} />;
    }
  };

  const handleDownload = (report: IReport) => {
    // Create a blob URL for download simulation
    const blob = new Blob([`Mock ${report.name} content`], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = report.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    message.success(`Downloaded ${report.name}`);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('Please select files to upload');
      return;
    }

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < fileList.length; i++) {
      const uploadFile = fileList[i];
      const file = uploadFile.originFileObj;

      if (!file) {
        failCount++;
        message.error(`${uploadFile.name} has no file data`);
        continue;
      }

      try {
        // Simulate progress
        setUploadProgress(Math.round(((i + 0.5) / fileList.length) * 100));
        const result = await uploadReport(file as File);

        if (result.success) {
          successCount++;
        } else {
          failCount++;
          message.error(
            `${uploadFile.name} upload failed: ${result.message || 'Unknown error'}`
          );
        }
      } catch (error) {
        failCount++;
        const errorMessage = error instanceof Error ? error.message : 'Network error';
        message.error(`${uploadFile.name} upload failed: ${errorMessage}`);
      }

      setUploadProgress(Math.round(((i + 1) / fileList.length) * 100));
    }

    setUploading(false);
    setUploadProgress(0);
    setFileList([]);

    if (successCount > 0) {
      message.success(`${successCount} file(s) uploaded successfully`);
      fetchReports();
    }

    if (failCount > 0) {
      message.error(`${failCount} file(s) failed to upload`);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    fileList: fileList,
    accept: '.csv,.pdf,.xlsx,.xls',
    beforeUpload(file) {
      const isValidType =
        file.type === 'text/csv' ||
        file.type === 'application/pdf' ||
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel';

      if (!isValidType) {
        message.error('You can only upload CSV, PDF, or Excel files!');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }

      // Add file to list instead of auto-uploading
      // Create a proper UploadFile object
      const uploadFile: UploadFile = {
        uid: file.uid || `${Date.now()}-${file.name}`,
        name: file.name,
        status: 'done',
        size: file.size,
        type: file.type,
        originFileObj: file as RcFile,
      };
      setFileList((prev) => [...prev, uploadFile]);
      return false; // Prevent auto upload
    },
    onRemove(file) {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const columns: ColumnsType<IReport> = [
    {
      title: 'File',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, record: IReport) => (
        <Space>
          {getFileIcon(record.type)}
          <Text strong style={{ wordBreak: 'break-word' }}>{name}</Text>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      responsive: ['md'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type: string) => (
        <Tag color={type === 'pdf' ? 'red' : type === 'xlsx' ? 'green' : 'blue'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: 100,
      responsive: ['sm'],
    },
    {
      title: 'Uploaded',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: 180,
      responsive: ['lg'],
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      width: 130,
      render: (_: unknown, record: IReport) => (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => handleDownload(record)}
          size="small"
        >
          Download
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        {/* Upload Section */}
        <Col xs={24}>
          <Card className={styles.card}>
            <Title level={4}>
              <UploadOutlined /> Upload Reports
            </Title>
            <Paragraph type="secondary">
              Upload your CSV, PDF, or Excel reports. Multiple files are supported.
            </Paragraph>
            <Dragger {...uploadProps} disabled={uploading}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag files to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for single or bulk upload. Accepted formats: CSV, PDF, XLSX.
                Maximum file size: 10MB.
              </p>
            </Dragger>
            {fileList.length > 0 && !uploading && (
              <div className={styles.uploadButtonContainer}>
                <Button onClick={() => setFileList([])}>
                  Clear All
                </Button>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={handleUpload}
                >
                  Upload {fileList.length} File{fileList.length > 1 ? 's' : ''}
                </Button>
              </div>
            )}
            {uploading && uploadProgress > 0 && (
              <div className={styles.progressContainer}>
                <Progress percent={uploadProgress} status="active" />
                <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
                  Uploading files... Please wait.
                </Text>
              </div>
            )}
          </Card>
        </Col>

        {/* Download Section */}
        <Col xs={24}>
          <Card className={styles.card}>
            <Title level={4}>
              <DownloadOutlined /> Available Reports
            </Title>
            <Paragraph type="secondary">
              Download previously uploaded reports and system-generated files.
            </Paragraph>
            <Table
              columns={columns}
              dataSource={reports}
              loading={loading}
              rowKey="id"
              scroll={{ x: 800 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} reports`,
                responsive: true,
              }}
              className={styles.table}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

