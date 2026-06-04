"use client";

import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Switch,
  Table,
  Modal,
  message,
  Card,
  Progress,
  Space,
  Tag,
  Typography,
  Divider,
  Popconfirm,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { TrendingUp } from 'lucide-react';

const { Title, Text } = Typography;

interface ApiKeyConfig {
  id: string;
  name: string;
  platform: string;
  apiKey: string;
  endpoint: string;
  model: string;
  usedToday: number;
  usedTotal: number;
  enabled: boolean;
}

const PLATFORMS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'doubao', label: 'Doubao' },
  { value: 'qwen', label: 'Qwen' },
  { value: 'zhipu', label: 'Zhipu GLM' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'ollama', label: 'Ollama' },
];

export default function ApiKeyConfigPage() {
  const [data, setData] = useState<ApiKeyConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [selectedRow, setSelectedRow] = useState<ApiKeyConfig | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai-config');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        message.error(result.error || '获取配置失败');
      }
    } catch (error) {
      console.error('Fetch config error:', error);
      message.error('获取配置失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedRow(null);
    setSelectedPlatform('');
    modalForm.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: ApiKeyConfig) => {
    setIsEditMode(true);
    setSelectedRow(record);
    setSelectedPlatform(record.platform);
    modalForm.setFieldsValue({
      name: record.name,
      platform: record.platform,
      apiKey: record.platform === 'ollama' ? 'ollama-local' : record.apiKey,
      endpoint: record.endpoint,
      defaultModel: record.model,
      enabled: record.enabled,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/ai-config?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setData(data.filter((item) => item.id !== id));
        message.success('删除成功');
      } else {
        message.error(result.error || '删除失败');
      }
    } catch (error) {
      console.error('Delete config error:', error);
      message.error('删除失败');
    }
  };

  const handleStatusChange = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch(`/api/ai-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, enabled }),
      });
      const result = await response.json();
      if (result.success) {
        setData(data.map((item) => (item.id === id ? { ...item, enabled } : item)));
        message.success(enabled ? '已启用' : '已禁用');
      } else {
        message.error(result.error || '操作失败');
        fetchData();
      }
    } catch (error) {
      console.error('Update status error:', error);
      message.error('操作失败');
      fetchData();
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await modalForm.validateFields();
      const payload = {
        ...values,
        id: isEditMode ? selectedRow!.id : undefined,
      };

      const method = isEditMode ? 'PUT' : 'POST';
      const response = await fetch('/api/ai-config', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        await fetchData();
        message.success(isEditMode ? '更新成功' : '添加成功');
        setIsModalOpen(false);
      } else {
        message.error(result.error || (isEditMode ? '更新失败' : '添加失败'));
      }
    } catch (error) {
      console.error('Submit config error:', error);
      message.error(isEditMode ? '更新失败' : '添加失败');
    }
  };

  const columns = [
    {
      title: '配置名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
      width: 120,
      render: (text: string) => {
        const platform = PLATFORMS.find((p) => p.value === text);
        return (
          <Tag color={getPlatformColor(text)}>
            {platform?.label || text}
          </Tag>
        );
      },
    },
    {
      title: 'API Key',
      dataIndex: 'apiKey',
      key: 'apiKey',
      width: 200,
      render: (text: string) => (
        <Text code className="truncate-block">
          {text.slice(0, 8) + '********************'}
        </Text>
      ),
    },
    {
      title: '默认模型',
      dataIndex: 'model',
      key: 'model',
      width: 180,
      ellipsis: true,
    },
    {
      title: '今日已用',
      dataIndex: 'usedToday',
      key: 'usedToday',
      width: 100,
      align: 'center',
      render: (text: number) => text.toLocaleString(),
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      align: 'center',
      render: (text: boolean, record: ApiKeyConfig) => (
        <Switch
          checked={text}
          onChange={(checked) => handleStatusChange(record.id, checked)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'center',
      render: (_, record: ApiKeyConfig) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const stats = {
    totalKeys: data.length,
    totalUsedToday: data.reduce((sum, item) => sum + item.usedToday, 0),
    totalUsedTotal: data.reduce((sum, item) => sum + item.usedTotal, 0),
    enabledCount: data.filter((item) => item.enabled).length,
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      openai: 'blue',
      claude: 'purple',
      gemini: 'orange',
      doubao: 'cyan',
      qwen: 'red',
      zhipu: 'green',
      deepseek: 'geekblue',
      ollama: 'success',
    };
    return colors[platform] || 'default';
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={2} className="mb-1">
              API 密钥配置管理
            </Title>
            <Text type="secondary">管理和配置 AI 模型的 API 密钥</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增配置
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card
              title={
                <div className="flex items-center gap-2">
                  <KeyOutlined className="text-blue-500" />
                  <span>密钥统计</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Text type="secondary">总密钥数</Text>
                  <Title level={3} className="mb-0">
                    {stats.totalKeys}
                  </Title>
                </div>
                <Divider className="my-3" />
                <div className="flex justify-between items-center">
                  <Text type="secondary">已启用</Text>
                  <Tag color={stats.enabledCount > 0 ? 'green' : 'default'}>
                    {stats.enabledCount} 个
                  </Tag>
                </div>
                <div className="flex justify-between items-center">
                  <Text type="secondary">已禁用</Text>
                  <Tag color={stats.totalKeys - stats.enabledCount > 0 ? 'red' : 'default'}>
                    {stats.totalKeys - stats.enabledCount} 个
                  </Tag>
                </div>
              </div>
            </Card>

            <Card
              title={
                <div className="flex items-center gap-2">
                  <BarChartOutlined className="text-orange-500" />
                  <span>今日用量</span>
                </div>
              }
            >
              <div className="text-center py-4">
                <Title level={2} className="mb-1">
                  {stats.totalUsedToday.toLocaleString()}
                </Title>
                <Text type="secondary">已用 Token</Text>
              </div>
            </Card>

            <Card
              title={
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>累计用量</span>
                </div>
              }
            >
              <div className="text-center py-4">
                <Title level={2} className="mb-1">
                  {stats.totalUsedTotal.toLocaleString()}
                </Title>
                <Text type="secondary">累计已用 Token</Text>
              </div>
            </Card>
          </div>

          <Card title="密钥列表">
            <Form form={form} layout="vertical" className="mb-6">
              <div className="grid grid-cols-4 gap-4">
                <Form.Item
                  label="配置名"
                  name="name"
                  rules={[{ required: true, message: '请输入配置名' }]}
                >
                  <Input placeholder="输入配置名称" />
                </Form.Item>
                <Form.Item
                  label="AI 平台"
                  name="platform"
                  rules={[{ required: true, message: '请选择平台' }]}
                >
                  <Select placeholder="选择 AI 平台">
                    {PLATFORMS.map((platform) => (
                      <Select.Option key={platform.value} value={platform.value}>
                        {platform.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="API Key"
                  name="apiKey"
                  rules={[{ required: true, message: '请输入 API Key' }]}
                >
                  <Input.Password placeholder="输入 API Key" />
                </Form.Item>
                <Form.Item label="Endpoint" name="endpoint">
                  <Input placeholder="输入 API 端点" />
                </Form.Item>
              </div>
              <div className="flex items-end gap-4">
                <Form.Item
                  label="默认模型"
                  name="defaultModel"
                  rules={[{ required: true, message: '请输入模型名称' }]}
                  className="flex-1 max-w-md mb-0"
                >
                  <Input placeholder="如: gpt-4o" />
                </Form.Item>
                <div className="flex items-center gap-2 pb-2">
                  <Form.Item name="enabled" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                  <span className="text-gray-600 whitespace-nowrap">启用此配置</span>
                </div>
                <Button type="primary" onClick={() => {
                  form.validateFields().then((values) => {
                    const payload = { ...values };
                    fetch('/api/ai-config', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    }).then(async (res) => {
                      const result = await res.json();
                      if (result.success) {
                        fetchData();
                        form.resetFields();
                        message.success('添加成功');
                      } else {
                        message.error(result.error || '添加失败');
                      }
                    }).catch(() => message.error('添加失败'));
                  }).catch(() => {});
                }}>
                  快速添加
                </Button>
              </div>
            </Form>

            <Spin spinning={loading}>
              <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: 1000 }}
              />
            </Spin>
          </Card>
        </div>

        <Modal
          title={isEditMode ? '编辑配置' : '新增配置'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              {isEditMode ? '更新' : '添加'}
            </Button>,
          ]}
        >
          <Form form={modalForm} layout="vertical">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="配置名"
                name="name"
                rules={[{ required: true, message: '请输入配置名' }]}
              >
                <Input placeholder="输入配置名称" />
              </Form.Item>
              <Form.Item
                label="AI 平台"
                name="platform"
                rules={[{ required: true, message: '请选择平台' }]}
              >
                <Select
                  placeholder="选择 AI 平台"
                  onChange={(value) => {
                    setSelectedPlatform(value);
                    if (value === 'ollama') {
                      modalForm.setFieldsValue({
                        apiKey: 'ollama-local',
                        endpoint: 'http://localhost:11434',
                      });
                    }
                  }}
                >
                  {PLATFORMS.map((platform) => (
                    <Select.Option key={platform.value} value={platform.value}>
                      {platform.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            {selectedPlatform !== 'ollama' && (
              <Form.Item
                label="API Key"
                name="apiKey"
                rules={[{ required: true, message: '请输入 API Key' }]}
              >
                <Input.Password placeholder="输入 API Key" />
              </Form.Item>
            )}
            {selectedPlatform === 'ollama' && (
              <Form.Item label="API Key" name="apiKey" initialValue="ollama-local">
                <Input disabled placeholder="Ollama 本地部署无需 API Key" />
              </Form.Item>
            )}
            <Form.Item label="Endpoint" name="endpoint">
              <Input placeholder={selectedPlatform === 'ollama' ? 'http://localhost:11434' : '输入 API 端点'} />
            </Form.Item>
            <Form.Item
              label="默认模型"
              name="defaultModel"
              rules={[{ required: true, message: '请输入模型名称' }]}
            >
              <Input placeholder={selectedPlatform === 'ollama' ? '如: llama3' : '如: gpt-4o'} />
            </Form.Item>
            <Form.Item name="enabled" valuePropName="checked">
              <div className="flex items-center gap-2">
                <Switch />
                <span>启用此配置</span>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
