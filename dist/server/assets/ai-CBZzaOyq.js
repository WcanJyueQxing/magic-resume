import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { TrendingUp } from "lucide-react";
import { Button, Card, Divider, Form, Input, Modal, Popconfirm, Select, Space, Spin, Switch, Table, Tag, Typography, message } from "antd";
import { BarChartOutlined, DeleteOutlined, EditOutlined, KeyOutlined, PlusOutlined } from "@ant-design/icons";
//#region src/app/app/dashboard/ai/page.tsx
var { Title, Text } = Typography;
var PLATFORMS = [
	{
		value: "openai",
		label: "OpenAI"
	},
	{
		value: "claude",
		label: "Claude"
	},
	{
		value: "gemini",
		label: "Gemini"
	},
	{
		value: "doubao",
		label: "Doubao"
	},
	{
		value: "qwen",
		label: "Qwen"
	},
	{
		value: "zhipu",
		label: "Zhipu GLM"
	},
	{
		value: "deepseek",
		label: "DeepSeek"
	},
	{
		value: "ollama",
		label: "Ollama"
	}
];
function ApiKeyConfigPage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [form] = Form.useForm();
	const [modalForm] = Form.useForm();
	const [selectedRow, setSelectedRow] = useState(null);
	const [selectedPlatform, setSelectedPlatform] = useState("");
	const fetchData = async () => {
		try {
			setLoading(true);
			const result = await (await fetch("/api/ai-config")).json();
			if (result.success) setData(result.data);
			else message.error(result.error || "获取配置失败");
		} catch (error) {
			console.error("Fetch config error:", error);
			message.error("获取配置失败");
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
		setSelectedPlatform("");
		modalForm.resetFields();
		setIsModalOpen(true);
	};
	const handleEdit = (record) => {
		setIsEditMode(true);
		setSelectedRow(record);
		setSelectedPlatform(record.platform);
		modalForm.setFieldsValue({
			name: record.name,
			platform: record.platform,
			apiKey: record.platform === "ollama" ? "ollama-local" : record.apiKey,
			endpoint: record.endpoint,
			defaultModel: record.model,
			enabled: record.enabled
		});
		setIsModalOpen(true);
	};
	const handleDelete = async (id) => {
		try {
			const result = await (await fetch(`/api/ai-config?id=${id}`, { method: "DELETE" })).json();
			if (result.success) {
				setData(data.filter((item) => item.id !== id));
				message.success("删除成功");
			} else message.error(result.error || "删除失败");
		} catch (error) {
			console.error("Delete config error:", error);
			message.error("删除失败");
		}
	};
	const handleSubmit = async () => {
		try {
			const payload = {
				...await modalForm.validateFields(),
				id: isEditMode ? selectedRow.id : void 0
			};
			const result = await (await fetch("/api/ai-config", {
				method: isEditMode ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			})).json();
			if (result.success) {
				await fetchData();
				message.success(isEditMode ? "更新成功" : "添加成功");
				setIsModalOpen(false);
			} else message.error(result.error || (isEditMode ? "更新失败" : "添加失败"));
		} catch (error) {
			console.error("Submit config error:", error);
			message.error(isEditMode ? "更新失败" : "添加失败");
		}
	};
	const columns = [
		{
			title: "配置名",
			dataIndex: "name",
			key: "name",
			width: 150,
			ellipsis: true
		},
		{
			title: "平台",
			dataIndex: "platform",
			key: "platform",
			width: 120,
			render: (text) => {
				const platform = PLATFORMS.find((p) => p.value === text);
				return /* @__PURE__ */ jsx(Tag, {
					color: getPlatformColor(text),
					children: platform?.label || text
				});
			}
		},
		{
			title: "API Key",
			dataIndex: "apiKey",
			key: "apiKey",
			width: 200,
			render: (text) => /* @__PURE__ */ jsx(Text, {
				code: true,
				className: "truncate-block",
				children: text.slice(0, 8) + "********************"
			})
		},
		{
			title: "默认模型",
			dataIndex: "model",
			key: "model",
			width: 180,
			ellipsis: true
		},
		{
			title: "今日已用",
			dataIndex: "usedToday",
			key: "usedToday",
			width: 100,
			align: "center",
			render: (text) => text.toLocaleString()
		},
		{
			title: "状态",
			dataIndex: "enabled",
			key: "enabled",
			width: 80,
			align: "center",
			render: (text) => /* @__PURE__ */ jsx(Switch, {
				checked: text,
				disabled: true
			})
		},
		{
			title: "操作",
			key: "action",
			width: 120,
			align: "center",
			render: (_, record) => /* @__PURE__ */ jsxs(Space, { children: [/* @__PURE__ */ jsx(Button, {
				type: "link",
				icon: /* @__PURE__ */ jsx(EditOutlined, {}),
				onClick: () => handleEdit(record),
				children: "编辑"
			}), /* @__PURE__ */ jsx(Popconfirm, {
				title: "确定要删除吗？",
				onConfirm: () => handleDelete(record.id),
				children: /* @__PURE__ */ jsx(Button, {
					type: "link",
					danger: true,
					icon: /* @__PURE__ */ jsx(DeleteOutlined, {}),
					children: "删除"
				})
			})] })
		}
	];
	const stats = {
		totalKeys: data.length,
		totalUsedToday: data.reduce((sum, item) => sum + item.usedToday, 0),
		totalUsedTotal: data.reduce((sum, item) => sum + item.usedTotal, 0),
		enabledCount: data.filter((item) => item.enabled).length
	};
	const getPlatformColor = (platform) => {
		return {
			openai: "blue",
			claude: "purple",
			gemini: "orange",
			doubao: "cyan",
			qwen: "red",
			zhipu: "green",
			deepseek: "geekblue",
			ollama: "success"
		}[platform] || "default";
	};
	return /* @__PURE__ */ jsx("div", {
		className: "p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Title, {
						level: 2,
						className: "mb-1",
						children: "API 密钥配置管理"
					}), /* @__PURE__ */ jsx(Text, {
						type: "secondary",
						children: "管理和配置 AI 模型的 API 密钥"
					})] }), /* @__PURE__ */ jsx(Button, {
						type: "primary",
						icon: /* @__PURE__ */ jsx(PlusOutlined, {}),
						onClick: handleAdd,
						children: "新增配置"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ jsx(Card, {
								title: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(KeyOutlined, { className: "text-blue-500" }), /* @__PURE__ */ jsx("span", { children: "密钥统计" })]
								}),
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx(Text, {
												type: "secondary",
												children: "总密钥数"
											}), /* @__PURE__ */ jsx(Title, {
												level: 3,
												className: "mb-0",
												children: stats.totalKeys
											})]
										}),
										/* @__PURE__ */ jsx(Divider, { className: "my-3" }),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx(Text, {
												type: "secondary",
												children: "已启用"
											}), /* @__PURE__ */ jsxs(Tag, {
												color: stats.enabledCount > 0 ? "green" : "default",
												children: [stats.enabledCount, " 个"]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx(Text, {
												type: "secondary",
												children: "已禁用"
											}), /* @__PURE__ */ jsxs(Tag, {
												color: stats.totalKeys - stats.enabledCount > 0 ? "red" : "default",
												children: [stats.totalKeys - stats.enabledCount, " 个"]
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(Card, {
								title: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(BarChartOutlined, { className: "text-orange-500" }), /* @__PURE__ */ jsx("span", { children: "今日用量" })]
								}),
								children: /* @__PURE__ */ jsxs("div", {
									className: "text-center py-4",
									children: [/* @__PURE__ */ jsx(Title, {
										level: 2,
										className: "mb-1",
										children: stats.totalUsedToday.toLocaleString()
									}), /* @__PURE__ */ jsx(Text, {
										type: "secondary",
										children: "已用 Token"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Card, {
								title: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-green-500" }), /* @__PURE__ */ jsx("span", { children: "累计用量" })]
								}),
								children: /* @__PURE__ */ jsxs("div", {
									className: "text-center py-4",
									children: [/* @__PURE__ */ jsx(Title, {
										level: 2,
										className: "mb-1",
										children: stats.totalUsedTotal.toLocaleString()
									}), /* @__PURE__ */ jsx(Text, {
										type: "secondary",
										children: "累计已用 Token"
									})]
								})
							})
						]
					}), /* @__PURE__ */ jsxs(Card, {
						title: "密钥列表",
						children: [/* @__PURE__ */ jsxs(Form, {
							form,
							layout: "vertical",
							className: "mb-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ jsx(Form.Item, {
										label: "配置名",
										name: "name",
										rules: [{
											required: true,
											message: "请输入配置名"
										}],
										children: /* @__PURE__ */ jsx(Input, { placeholder: "输入配置名称" })
									}),
									/* @__PURE__ */ jsx(Form.Item, {
										label: "AI 平台",
										name: "platform",
										rules: [{
											required: true,
											message: "请选择平台"
										}],
										children: /* @__PURE__ */ jsx(Select, {
											placeholder: "选择 AI 平台",
											children: PLATFORMS.map((platform) => /* @__PURE__ */ jsx(Select.Option, {
												value: platform.value,
												children: platform.label
											}, platform.value))
										})
									}),
									/* @__PURE__ */ jsx(Form.Item, {
										label: "API Key",
										name: "apiKey",
										rules: [{
											required: true,
											message: "请输入 API Key"
										}],
										children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "输入 API Key" })
									}),
									/* @__PURE__ */ jsx(Form.Item, {
										label: "Endpoint",
										name: "endpoint",
										children: /* @__PURE__ */ jsx(Input, { placeholder: "输入 API 端点" })
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-end gap-4",
								children: [
									/* @__PURE__ */ jsx(Form.Item, {
										label: "默认模型",
										name: "defaultModel",
										rules: [{
											required: true,
											message: "请输入模型名称"
										}],
										className: "flex-1 max-w-md mb-0",
										children: /* @__PURE__ */ jsx(Input, { placeholder: "如: gpt-4o" })
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 pb-2",
										children: [/* @__PURE__ */ jsx(Form.Item, {
											name: "enabled",
											valuePropName: "checked",
											className: "mb-0",
											children: /* @__PURE__ */ jsx(Switch, {})
										}), /* @__PURE__ */ jsx("span", {
											className: "text-gray-600 whitespace-nowrap",
											children: "启用此配置"
										})]
									}),
									/* @__PURE__ */ jsx(Button, {
										type: "primary",
										onClick: () => {
											form.validateFields().then((values) => {
												const payload = { ...values };
												fetch("/api/ai-config", {
													method: "POST",
													headers: { "Content-Type": "application/json" },
													body: JSON.stringify(payload)
												}).then(async (res) => {
													const result = await res.json();
													if (result.success) {
														fetchData();
														form.resetFields();
														message.success("添加成功");
													} else message.error(result.error || "添加失败");
												}).catch(() => message.error("添加失败"));
											}).catch(() => {});
										},
										children: "快速添加"
									})
								]
							})]
						}), /* @__PURE__ */ jsx(Spin, {
							spinning: loading,
							children: /* @__PURE__ */ jsx(Table, {
								columns,
								dataSource: data,
								rowKey: "id",
								pagination: { pageSize: 10 },
								bordered: true,
								scroll: { x: 1e3 }
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsx(Modal, {
					title: isEditMode ? "编辑配置" : "新增配置",
					open: isModalOpen,
					onCancel: () => setIsModalOpen(false),
					footer: [/* @__PURE__ */ jsx(Button, {
						onClick: () => setIsModalOpen(false),
						children: "取消"
					}, "back"), /* @__PURE__ */ jsx(Button, {
						type: "primary",
						onClick: handleSubmit,
						children: isEditMode ? "更新" : "添加"
					}, "submit")],
					children: /* @__PURE__ */ jsxs(Form, {
						form: modalForm,
						layout: "vertical",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsx(Form.Item, {
									label: "配置名",
									name: "name",
									rules: [{
										required: true,
										message: "请输入配置名"
									}],
									children: /* @__PURE__ */ jsx(Input, { placeholder: "输入配置名称" })
								}), /* @__PURE__ */ jsx(Form.Item, {
									label: "AI 平台",
									name: "platform",
									rules: [{
										required: true,
										message: "请选择平台"
									}],
									children: /* @__PURE__ */ jsx(Select, {
										placeholder: "选择 AI 平台",
										onChange: (value) => {
											setSelectedPlatform(value);
											if (value === "ollama") modalForm.setFieldsValue({
												apiKey: "ollama-local",
												endpoint: "http://localhost:11434"
											});
										},
										children: PLATFORMS.map((platform) => /* @__PURE__ */ jsx(Select.Option, {
											value: platform.value,
											children: platform.label
										}, platform.value))
									})
								})]
							}),
							selectedPlatform !== "ollama" && /* @__PURE__ */ jsx(Form.Item, {
								label: "API Key",
								name: "apiKey",
								rules: [{
									required: true,
									message: "请输入 API Key"
								}],
								children: /* @__PURE__ */ jsx(Input.Password, { placeholder: "输入 API Key" })
							}),
							selectedPlatform === "ollama" && /* @__PURE__ */ jsx(Form.Item, {
								label: "API Key",
								name: "apiKey",
								initialValue: "ollama-local",
								children: /* @__PURE__ */ jsx(Input, {
									disabled: true,
									placeholder: "Ollama 本地部署无需 API Key"
								})
							}),
							/* @__PURE__ */ jsx(Form.Item, {
								label: "Endpoint",
								name: "endpoint",
								children: /* @__PURE__ */ jsx(Input, { placeholder: selectedPlatform === "ollama" ? "http://localhost:11434" : "输入 API 端点" })
							}),
							/* @__PURE__ */ jsx(Form.Item, {
								label: "默认模型",
								name: "defaultModel",
								rules: [{
									required: true,
									message: "请输入模型名称"
								}],
								children: /* @__PURE__ */ jsx(Input, { placeholder: selectedPlatform === "ollama" ? "如: llama3" : "如: gpt-4o" })
							}),
							/* @__PURE__ */ jsx(Form.Item, {
								name: "enabled",
								valuePropName: "checked",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Switch, {}), /* @__PURE__ */ jsx("span", { children: "启用此配置" })]
								})
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/routes/app/dashboard/ai.tsx?tsr-split=component
var SplitComponent = ApiKeyConfigPage;
//#endregion
export { SplitComponent as component };
