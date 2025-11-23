// Rule form component for create/edit
import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Space,
  Card,
  message,
  Typography,
} from 'antd';
import type { ICreateRuleReq, RuleFormProps } from '../interface/rule';
import { ruleService } from '../service/rule';
import styles from './RuleForm.module.css';

const { TextArea } = Input;
const { Title } = Typography;

export const RuleForm = ({ rule, onSuccess, onCancel }: RuleFormProps) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [jsonPreview, setJsonPreview] = useState('');

  useEffect(() => {
    if (rule) {
      form.setFieldsValue({
        name: rule.name,
        type: rule.type,
        threshold: rule.threshold,
        window: rule.window,
        enabled: rule.enabled,
      });
      updateJsonPreview(rule);
    }
  }, [rule, form]);

  const updateJsonPreview = (values: Partial<ICreateRuleReq>) => {
    const preview = JSON.stringify(values, null, 2);
    setJsonPreview(preview);
  };

  const handleValuesChange = (_: unknown, allValues: ICreateRuleReq) => {
    updateJsonPreview(allValues);
  };

  const handleSubmit = async (values: ICreateRuleReq) => {
    setLoading(true);
    try {
      if (rule) {
        await ruleService.updateRule({ ...values, id: rule.id });
        message.success('Rule updated successfully');
      } else {
        await ruleService.createRule(values);
        message.success('Rule created successfully');
      }
      onSuccess();
    } catch (error) {
      message.error(`Failed to ${rule ? 'update' : 'create'} rule`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formGrid}>
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleValuesChange}
          initialValues={{
            enabled: true,
          }}
        >
          <Form.Item
            name="name"
            label="Rule Name"
            rules={[{ required: true, message: 'Please enter rule name' }]}
          >
            <Input placeholder="e.g., Bank Account Change Detection" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Rule Type"
            rules={[{ required: true, message: 'Please select rule type' }]}
          >
            <Select
              placeholder="Select type"
              options={[
                { label: 'Bank Change', value: 'bank_change' },
                { label: 'Duplicate', value: 'duplicate' },
                { label: 'Over Limit', value: 'over_limit' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="threshold"
            label="Threshold"
            rules={[{ required: true, message: 'Please enter threshold' }]}
          >
            <Input
              className={styles.fullWidth}
            />
          </Form.Item>

          <Form.Item
            name="window"
            label="Window"
            rules={[{ required: true, message: 'Please enter window' }]}
          >
            <Input
              className={styles.fullWidth}
            />
          </Form.Item>

          <Form.Item
            name="enabled"
            label="Enabled"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {rule ? 'Update' : 'Create'}
              </Button>
              <Button onClick={onCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Card>
          <Title level={5}>JSON Preview</Title>
          <TextArea
            value={jsonPreview}
            readOnly
            rows={16}
            className={styles.jsonPreview}
          />
        </Card>
      </div>
    </div>
  );
};

