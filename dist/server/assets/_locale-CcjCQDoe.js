import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
var zh_default = {
	common: {
		"title": "魔方简历",
		"subtitle": "AI 驱动简历编辑器",
		"description": "魔方简历是一款开源的简历编辑器，免费，隐私优先。无需注册登录，数据完全存储在本地，支持数据导出备份，确保您的简历数据随时可用。",
		"dashboard": "仪表盘",
		"edit": "编辑",
		"delete": "删除",
		"newResume": "新建简历",
		"copy": "复制",
		"cancel": "取消",
		"confirm": "确认",
		"deleteSuccess": "删除成功",
		"deleteModuleConfirm": "确定要删除此模块吗？此操作无法撤销。",
		"configured": "已配置",
		"notConfigured": "未配置"
	},
	home: {
		"header": {
			"title": "魔方简历",
			"startButton": "开始使用",
			"features": "功能特点",
			"pricing": "定价",
			"about": "关于我们",
			"login": "登录",
			"register": "注册",
			"dashboard": "控制台"
		},
		"hero": {
			"badge": "免费简历制作",
			"title": "让简历制作变得简单而智能",
			"subtitle": "魔方简历利用 AI 技术，帮助您快速创建专业的简历。无需注册，免费使用，数据安全存储。",
			"cta": "立即开始",
			"secondary": "浏览模板"
		},
		"features": {
			"title": "为什么选择魔方简历？",
			"subtitle": "我们提供一站式简历解决方案，让您的求职之路更加顺畅",
			"ai": {
				"badge": "AI 驱动",
				"title": "智能识别，专业建议",
				"description": "内置智能语法检查，自动识别不恰当的表达，提供专业的修改建议，让您的简历更加出色。",
				"item1": "智能润色",
				"item1_description": "AI 自动优化文案表达，让简历更专业",
				"item2": "语法检查",
				"item2_description": "自动检测并修正语法和拼写错误"
			},
			"storage": {
				"badge": "隐私安全",
				"title": "数据安全，隐私优先",
				"description": "所有简历数据完全存储在您的本地设备中，无需担心隐私泄露。支持数据导出备份，确保您的简历数据随时可用。",
				"item1": "本地文件存储",
				"item1_description": "简历数据安全存储在您的电脑硬盘中",
				"item2": "多种导出格式",
				"item2_description": "支持PDF和JSON格式导出",
				"item3": "支持数据导出备份"
			},
			"preview": {
				"badge": "实时预览",
				"title": "所见即所得",
				"description": "边编辑边预览，实时查看简历效果。支持多种专业模板，让您的简历既美观又规范。快速导出PDF，随时投递简历。",
				"item1": "实时预览编辑效果",
				"item2": "多种导出格式支持"
			}
		},
		"news": {
			"label": "新闻",
			"content": " 全新的 AI 简历优化功能已上线"
		},
		"cta": {
			"title": "开启你的新职业篇章",
			"description": "立即使用魔方简历，创建一份令人印象深刻的简历",
			"button": "免费开始使用"
		},
		"footer": { "copyright": " 2025 魔方简历. 保留所有权利." },
		"changelog": "更新日志",
		"faq": {
			"title": "常见问题",
			"items": [
				{
					"question": "使用魔方简历需要付费吗？",
					"answer": "魔方简历目前是免费的，满足基础简历制作需求，开源版本的功能不会变更。"
				},
				{
					"question": "我的简历数据安全吗？",
					"answer": "是的，非常安全。魔方简历采用本地存储方式，您的所有数据都保存在您自己的设备上，不存在云存储，完全保护您的隐私。"
				},
				{
					"question": "支持哪些简历格式导出？",
					"answer": "目前支持导出PDF格式，确保您的简历在任何设备上都能保持一致的排版效果。未来我们还将支持更多导出格式。"
				},
				{
					"question": "多设备如何同步",
					"answer": "我们提供了导出JSON配置，您可以将简历的配置以JSON格式保存，随时随地，任何设备上都可以打开查看。"
				},
				{
					"question": "自定义程度如何？",
					"answer": "我们提供丰富的自定义操作，包括颜色、布局等，让您能够根据个人喜好和行业特点调整简历风格。"
				}
			]
		}
	},
	dashboard: {
		"sidebar": {
			"appName": "魔方简历",
			"resumes": "我的简历",
			"settings": "通用设置",
			"templates": "简历模板",
			"ai": "AI服务商"
		},
		"resumes": {
			"created": "创建于",
			"synced": "已备份文件夹",
			"view": "去查看",
			"myResume": "我的简历",
			"create": "新建简历",
			"newResume": "新建简历",
			"newResumeDescription": "创建一个新简历以开始。",
			"import": "导入简历",
			"untitled": "未命名简历",
			"importSuccess": "配置导入成功",
			"importError": "配置导入失败，请检查文件格式",
			"importSuccessTitle": "导入成功",
			"importFailedTitle": "导入失败",
			"editResume": "编辑简历",
			"importFileName": "文件名: {fileName}",
			"importFormat": "导入格式: {format}",
			"importDialog": {
				"title": "导入简历",
				"jsonTitle": "导入 JSON",
				"jsonDescription": "导入已导出的简历配置文件（.json）",
				"pdfTitle": "导入 PDF",
				"pdfDescription": "使用 Gemini 自动识别生成简历结构",
				"importing": "正在导入，请稍候...",
				"geminiConfigRequired": "请先在 AI 服务商设置页配置 Gemini API Key 和模型 ID",
				"pdfSuccess": "PDF 导入成功",
				"pdfError": "PDF 导入失败，请检查 PDF 内容或 Gemini 配置"
			},
			"notice": {
				"title": "注意",
				"description": "建议在设置里中配置简历备份文件夹，防止您的数据可能会在浏览器清除缓存后丢失",
				"goToSettings": "前往设置"
			},
			"deleteConfirmTitle": "确认删除简历？",
			"deleteConfirmDescription": "此操作无法撤销。这将永久删除此简历，并从设备中移除数据。",
			"createDialog": {
				"title": "新建简历",
				"description": "从空白模板开始创建新简历",
				"tabs": {
					"fromTemplate": "从模板创建",
					"uploadFile": "上传文件"
				},
				"namePlaceholder": "姓名",
				"switchTemplate": "切换模板",
				"cancel": "取消",
				"create": "创建",
				"blankTitle": "空白简历",
				"startFromBlank": "从空白开始",
				"startFromTemplate": "从模板开始",
				"blankCardDescription": "从内置默认模板创建，空白开始",
				"blankThumbnailDescription": "一张白纸，不受任何预设干扰，自由发挥您的创意，打造完全属于您个人风格的代码级简历",
				"createNow": "立即创建",
				"backToGrid": "返回模板列表",
				"blankPreviewDescription": "选择这张白纸，一切从零开始。不受任何预设干扰，打造完全属于您个人风格的代码级可控精美简历。",
				"useThisTemplate": "就用这个模板开始",
				"sample": {
					"company": "Google",
					"position": "高级软件工程师",
					"present": "至今",
					"workDescription": "主导前端团队，页面性能提升 40%。"
				}
			}
		},
		"settings": {
			"title": "设置",
			"syncDirectory": {
				"title": "同步目录",
				"description": "选择一个文件夹来同步和备份您的简历。",
				"currentSyncFolder": "当前同步文件夹",
				"noFolderConfigured": "尚未配置同步文件夹",
				"changeFolder": "更改文件夹",
				"selectFolder": "选择文件夹"
			},
			"sync": {
				"title": "同步目录",
				"description": "选择一个文件夹来同步和备份您的简历。",
				"select": "选择文件夹"
			},
			"ai": {
				"title": "AI 配置",
				"currentModel": "当前使用的模型",
				"selectModel": "选择模型",
				"getApiKey": "获取 API Key",
				"doubao": {
					"title": "豆包",
					"description": "在火山引擎获取 API 密钥",
					"apiKey": "API Key",
					"modelId": "模型 ID"
				},
				"deepseek": {
					"title": "DeepSeek",
					"description": "在 DeepSeek 开放平台获取 API 密钥",
					"apiKey": "API Key"
				},
				"openai": {
					"title": "OpenAI",
					"description": "在 OpenAI 或兼容 OpenAI 格式的开放平台获取 API 密钥",
					"apiKey": "API Key",
					"modelId": "模型 ID",
					"apiEndpoint": "API 端点，如：https://openai.example.org/v1"
				},
				"gemini": {
					"title": "Gemini",
					"description": "支持润色、语法检查和 PDF 图片识别导入。推荐模型 ID：gemini-flash-latest",
					"apiKey": "Gemini API Key",
					"modelId": "Gemini 模型 ID"
				}
			}
		},
		"templates": {
			"title": "模板",
			"useTemplate": "使用此模板",
			"preview": "预览",
			"switchTemplate": "切换模板",
			"classic": {
				"name": "经典模板",
				"description": "传统简约的简历布局，适合大多数求职场景"
			},
			"modern": {
				"name": "两栏布局",
				"description": "经典两栏，突出个人特色"
			},
			"leftRight": {
				"name": "模块标题背景色",
				"description": "模块标题背景鲜明，突出美观特色"
			},
			"timeline": {
				"name": "时间轴布局",
				"description": "时间轴风格，突出经历的时间顺序"
			},
			"minimalist": {
				"name": "极简模板",
				"description": "大面积留白，干净纯粹的排版风格"
			},
			"elegant": {
				"name": "优雅模板",
				"description": "居中标题单列设计，具有高级感的分隔线"
			},
			"creative": {
				"name": "创意模板",
				"description": "视觉错落设计，灵动活泼展现个性"
			},
			"editorial": {
				"name": "画报风模板",
				"description": "大号精美衬线体与窄体无衬线的完美结合，极具奢华感"
			},
			"swiss": {
				"name": "瑞士美学",
				"description": "极具艺术感的包豪斯国际排版，超粗字重对比与几何色块点缀，彰显理性与高级"
			}
		}
	},
	pdfExport: {
		"modal": {
			"title": "导出简历",
			"subtitle": "选择您希望导出简历的格式",
			"pdfDesc": "通过高精度渲染生成，100% 还原格式，简历投递首选。",
			"printDesc": "调用系统打印工具另存为 PDF，当主渲染拥堵或需手动干预边距时的备用方案。",
			"jsonDesc": "保存您的配置档案副本。日后更换设备或清理缓存后，可使用此文件一键无损导入恢复进度。",
			"markdownDesc": "转换为极简的文本标记语言文件，方便快速粘贴给各种 AI 模型或是其他文本编辑器。",
			"privacyNotice": "魔方简历承诺绝不收集、上传或存储您的任何简历数据，您的隐私完全受到保护。"
		},
		"button": {
			"export": "导出",
			"exportPdf": "PDF",
			"exportJson": "JSON配置",
			"exportMarkdown": "Markdown",
			"exporting": "导出中...",
			"exportingJson": "导出中...",
			"exportingMarkdown": "导出中...",
			"print": "PDF(备份)"
		},
		"toast": {
			"success": "PDF导出成功",
			"error": "PDF导出失败",
			"jsonSuccess": "配置导出成功",
			"jsonError": "配置导出失败",
			"markdownSuccess": "Markdown 导出成功",
			"markdownError": "Markdown 导出失败"
		},
		"result": {
			"successTitle": "成功导出",
			"errorTitle": "导出失败",
			"clickToClose": "点击任意位置关闭"
		}
	},
	workbench: {
		"sidePanel": {
			"layout": {
				"title": "布局",
				"addCustomSection": "添加模块",
				"addCustomSectionOption": "添加自定义模块",
				"standardSections": {
					"skills": "专业技能",
					"experience": "工作经验",
					"projects": "项目经历",
					"education": "教育经历",
					"selfEvaluation": "自我评价",
					"certificates": "证书作品"
				}
			},
			"theme": {
				"title": "主题色",
				"custom": "自定义"
			},
			"typography": {
				"title": "排版",
				"font": {
					"title": "字体",
					"alibaba": "阿里巴巴普惠体",
					"misans": "MiSans",
					"notosanssc": "Noto Sans SC",
					"sourcehanserifsc": "思源宋体",
					"note": "MiSans 依据其许可免费商用；使用本项目时请保留 MiSans 字体说明。"
				},
				"lineHeight": {
					"title": "行高",
					"normal": "默认",
					"relaxed": "适中",
					"loose": "宽松"
				},
				"baseFontSize": { "title": "基础字号" },
				"headerSize": { "title": "模块标题字号" },
				"subheaderSize": { "title": "模块项一级标题字号" }
			},
			"spacing": {
				"title": "间距",
				"pagePadding": { "title": "页边距" },
				"sectionSpacing": { "title": "模块间距" },
				"paragraphSpacing": { "title": "段落间距" }
			},
			"mode": {
				"title": "模式",
				"useIconMode": { "title": "图标模式" },
				"centerSubtitle": { "title": "副标题居中" },
				"flexibleHeaderLayout": { "title": "长标题模式" }
			}
		},
		"basicPanel": {
			"title": "资料",
			"basicField": "基础字段",
			"customField": "自定义字段",
			"githubContributions": "Github贡献",
			"layout": "布局",
			"layoutLeft": "居左",
			"layoutCenter": "居中",
			"layoutRight": "居右",
			"avatar": "头像",
			"customFields": {
				"placeholders": {
					"label": "标签",
					"value": "值"
				},
				"displayLabel": "显示标签",
				"addButton": "添加自定义字段"
			},
			"basicFields": {
				"name": "姓名",
				"title": "职位",
				"email": "邮箱",
				"phone": "电话",
				"website": "个人网站",
				"location": "地址",
				"birthDate": "生日",
				"employementStatus": "状态"
			},
			"fieldVisibility": {
				"show": "显示",
				"hide": "隐藏"
			}
		},
		"experiencePanel": {
			"title": "工作经历",
			"addButton": "添加工作经历",
			"defaultProject": {
				"company": "某科技有限公司",
				"position": "高级前端工程师",
				"date": "2020 - 至今",
				"details": "负责公司核心产品..."
			},
			"placeholders": {
				"company": "请输入公司名称",
				"position": "请输入职位",
				"date": "请输入工作时间",
				"details": "请输入工作职责和成就"
			}
		},
		"experienceItem": {
			"labels": {
				"company": "公司名称",
				"position": "岗位",
				"date": "工作时间",
				"details": "工作职责"
			},
			"placeholders": {
				"company": "请输入公司名称",
				"position": "如：前端工程师",
				"date": "如：2020-至今",
				"details": "描述你在这份工作中的职责和成就"
			},
			"buttons": {
				"edit": "编辑",
				"save": "保存",
				"cancel": "取消",
				"delete": "删除"
			},
			"visibility": {
				"show": "显示",
				"hide": "隐藏"
			}
		},
		"projectPanel": {
			"title": "项目经历",
			"addButton": "添加项目",
			"defaultProject": {
				"name": "个人项目",
				"description": "项目描述",
				"role": "负责内容",
				"technologies": "技术栈",
				"date": "2023.01 - 2023.06"
			},
			"placeholders": {
				"name": "项目名称",
				"description": "简要描述项目背景和目标",
				"role": "你在项目中的角色和职责",
				"technologies": "使用的技术和工具",
				"date": "项目时间范围",
				"link": "项目链接"
			}
		},
		"projectItem": {
			"labels": {
				"name": "项目名称",
				"role": "项目角色",
				"date": "项目时间",
				"description": "项目描述",
				"link": "项目链接",
				"linkLabel": "显示文字"
			},
			"placeholders": {
				"name": "请输入项目名称",
				"role": "你在项目中的角色",
				"date": "项目时间范围",
				"description": "简要描述项目背景和目标",
				"link": "项目链接",
				"linkLabel": "显示文字"
			},
			"hints": { "linkLabel": "显示文字留空时，将自动显示域名或完整链接。链接仅支持 http:// 或 https:// 链接。" },
			"buttons": {
				"edit": "编辑",
				"save": "保存",
				"cancel": "取消",
				"delete": "删除"
			},
			"visibility": {
				"show": "显示",
				"hide": "隐藏"
			}
		},
		"educationPanel": {
			"title": "教育背景",
			"addButton": "添加教育经历",
			"defaultProject": {
				"school": "学校名称",
				"degree": "学历",
				"major": "专业",
				"date": "2020.09 - 2024.06"
			},
			"placeholders": {
				"school": "请输入学校名称",
				"degree": "请选择学历",
				"major": "请输入专业名称",
				"date": "请输入就读时间范围"
			}
		},
		"educationItem": {
			"labels": {
				"school": "学校名称",
				"degree": "学历",
				"major": "专业",
				"date": "就读时间",
				"description": "学校简介",
				"gpa": "GPA",
				"startDate": "开始时间",
				"endDate": "结束时间"
			},
			"placeholders": {
				"school": "请输入学校名称",
				"degree": "请选择学历",
				"major": "请输入专业名称",
				"date": "请输入就读时间范围",
				"description": "请输入学校简介",
				"gpa": "请输入GPA"
			},
			"buttons": {
				"edit": "编辑",
				"save": "保存",
				"cancel": "取消",
				"delete": "删除"
			},
			"visibility": {
				"show": "显示",
				"hide": "隐藏"
			}
		},
		"certificatesPanel": {
			"title": "证书作品",
			"addButton": "添加照片或证书",
			"tips": "支持点击上传或快捷键 (Cmd/Ctrl + V) 直接粘贴图片。拖动滑块可调整宽度实现横向拼接。",
			"width": "宽度 (横向拼接占比)",
			"delete": "删除",
			"empty": "暂无图片，请上传或粘贴图片"
		}
	},
	field: {
		"selectDate": "选择日期",
		"enterYear": "输入年份",
		"toPresent": "至今"
	},
	richEditor: {
		"bold": "加粗",
		"italic": "斜体",
		"underline": "下划线",
		"link": "链接",
		"linkPlaceholder": "输入链接，例如 https://example.com",
		"linkApply": "应用",
		"linkRemove": "移除",
		"linkInvalid": "请输入有效链接",
		"textColor": "文字颜色",
		"backgroundColor": "背景颜色",
		"alignLeft": "左对齐",
		"alignCenter": "居中对齐",
		"alignRight": "右对齐",
		"alignJustify": "两端对齐",
		"bulletList": "无序列表",
		"orderedList": "有序列表",
		"undo": "撤销",
		"redo": "重做",
		"aiPolish": "AI 润色",
		"paragraph": "正文",
		"heading1": "标题 1",
		"heading2": "标题 2",
		"heading3": "标题 3",
		"colors": {
			"black": "黑色",
			"darkGray": "深灰",
			"gray": "灰色",
			"red": "红色",
			"orange": "橙色",
			"orangeYellow": "橙黄",
			"yellow": "黄色",
			"yellowGreen": "黄绿",
			"green": "绿色",
			"cyan": "青色",
			"lightBlue": "浅蓝",
			"blue": "蓝色",
			"purple": "紫色",
			"magenta": "紫红",
			"pink": "粉色"
		}
	},
	iconSelector: {
		"all": "全部",
		"searchPlaceholder": "搜索图标...",
		"noMatchingIcons": "未找到匹配的图标",
		"tryOtherKeywords": "请尝试其他搜索关键词",
		"selectOtherCategory": "请选择其他分类",
		"categories": {
			"personal": "个人信息",
			"education": "教育背景",
			"experience": "工作经验",
			"skills": "技能",
			"languages": "语言",
			"projects": "项目",
			"achievements": "成就证书",
			"hobbies": "兴趣爱好",
			"social": "社交媒体",
			"others": "其他"
		},
		"icons": {
			"user": "用户",
			"email": "邮箱",
			"phone": "电话",
			"address": "地址",
			"website": "网站",
			"mobile": "手机",
			"education": "学历",
			"school": "学校",
			"major": "专业",
			"library": "图书馆",
			"scholarship": "奖学金",
			"work": "工作",
			"company": "公司",
			"office": "办公室",
			"dateRange": "日期范围",
			"workTime": "工作时间",
			"programming": "编程",
			"system": "系统",
			"database": "数据库",
			"terminal": "终端",
			"techStack": "技术栈",
			"language": "语言",
			"speaking": "口语",
			"communication": "交流",
			"project": "项目",
			"branch": "分支",
			"release": "发布",
			"target": "目标",
			"trophy": "奖杯",
			"medal": "奖牌",
			"star": "星级",
			"interest": "兴趣",
			"music": "音乐",
			"art": "艺术",
			"photography": "摄影",
			"linkedin": "领英",
			"twitter": "推特",
			"facebook": "脸书",
			"instagram": "照片",
			"profile": "简介",
			"review": "审核",
			"filter": "筛选",
			"link": "链接",
			"salary": "薪资",
			"idea": "创意",
			"send": "发送",
			"share": "分享",
			"settings": "设置",
			"search": "搜索",
			"flag": "标记",
			"bookmark": "收藏",
			"thumbsUp": "点赞",
			"skill": "技能"
		}
	},
	photoConfig: {
		"title": "头像设置",
		"description": "自定义您的简历头像",
		"upload": {
			"title": "在线链接",
			"dragHint": "拖拽或点击上传图片",
			"sizeLimit": "图片大小不能超过2MB",
			"typeLimit": "请上传图片文件",
			"urlPlaceholder": "输入图片链接",
			"invalidUrl": "图片链接无效或无法访问，请尝试使用其他图片链接",
			"timeout": "加载超时",
			"loadError": "图片加载失败"
		},
		"config": {
			"aspectRatio": "宽高比",
			"size": "尺寸",
			"width": "宽度",
			"height": "高度",
			"border-radius": "圆角",
			"widthPlaceholder": "宽度",
			"heightPlaceholder": "高度",
			"ratios": {
				"1:1": "1:1 正方形",
				"4:3": "4:3 横版",
				"3:4": "3:4 竖版",
				"16:9": "16:9 宽屏",
				"custom": "自定义"
			},
			"borderRadius": {
				"none": "无",
				"medium": "中等",
				"full": "圆形",
				"custom": "自定义",
				"customPlaceholder": "自定义圆角大小"
			}
		},
		"actions": {
			"reset": "重置",
			"close": "关闭",
			"cancel": "取消",
			"removePhoto": "删除头像"
		}
	},
	previewDock: {
		"switchTemplate": "切换模板",
		"grammarCheck": {
			"idle": "AI语法纠错",
			"checking": "检查中...",
			"configurePrompt": "请先配置 ApiKey 和 模型Id",
			"configureButton": "去配置",
			"errorToast": "语法检查失败，请重试"
		},
		"sidePanel": {
			"expand": "展开侧边栏",
			"collapse": "收起侧边栏"
		},
		"editPanel": {
			"expand": "展开编辑面板",
			"collapse": "收起编辑面板"
		},
		"previewPanel": {
			"expand": "展开预览面板",
			"collapse": "收起预览面板"
		},
		"github": "GitHub",
		"backToDashboard": "返回仪表盘",
		"copyResume": {
			"tooltip": "复制简历",
			"success": "简历复制成功",
			"error": "简历复制失败"
		},
		"export": {
			"tooltip": "导出简历",
			"pdf": "导出PDF",
			"json": "导出JSON",
			"markdown": "导出Markdown",
			"print": "导出PDF(备份）"
		},
		"autoOnePage": {
			"tooltip": "自动一页纸",
			"enabled": "已开启一页纸模式",
			"disabled": "已关闭一页纸模式",
			"cannotFit": "内容较多，已尽量压缩但无法完美一页，建议精简内容, 也可在此基础上调节页边距、字体大小等左侧设置栏选项"
		},
		"backup": {
			"configured": "已备份",
			"notConfigured": "未备份",
			"clickToConfigure": "点击前往设置"
		}
	},
	aiPolishDialog: {
		"title": "AI 润色",
		"description": {
			"ready": "填写可选的自定义要求后，点击「开始润色」",
			"polishing": "正在为您润色内容...",
			"finished": "已经为您优化了内容，请查看效果"
		},
		"error": {
			"configRequired": "请先配置 AI 模型",
			"polishFailed": "润色失败",
			"applied": "已应用润色内容"
		},
		"content": {
			"original": "原始内容",
			"polished": "润色后的内容"
		},
		"customInstructions": "自定义要求",
		"customInstructionsPlaceholder": "例如：请用更技术化的表述、突出量化成果、语气偏正式…（选填，留空则按默认规则润色）",
		"button": {
			"start": "开始润色",
			"regenerate": "重新生成",
			"generating": "生成中...",
			"apply": "应用内容"
		}
	},
	templates: { "switchTemplate": "切换模板" },
	themeModal: { "delete": {
		"title": "确定要删除吗",
		"description": "您确定要删除{title}吗？",
		"confirmText": "删除",
		"cancelText": "取消"
	} },
	grammarCheck: {
		"title": "AI 语法检查",
		"description": "发现 {count} 个建议优化项",
		"exit": "退出检查",
		"spelling": "错别字",
		"punctuation": "标点符号",
		"original": "原文",
		"error_point": "错误点",
		"suggestion": "建议修改",
		"reason": "原因",
		"accept": "应用",
		"ignore": "忽略",
		"found_issues": "发现 {count} 个问题",
		"applied_success": "已应用修改",
		"apply_error": "未找到对应文本，无法自动修改",
		"no_errors_title": "太棒了！",
		"no_errors_desc": "文档非常完美，没有发现任何错别字或标点错误。"
	},
	faqDialog: {
		"title": "常见问题 (FAQ)",
		"description": "关于 Magic Resume 工作台的一些常用技巧和解答。",
		"items": {
			"browser-compatibility": {
				"question": "推荐使用什么浏览器？",
				"answer": "推荐使用最新版的 Chrome (谷歌浏览器) 或 Edge 浏览器以获得最佳排版和导出体验。部分不兼容的旧版浏览器可能会导致样式错乱。"
			},
			"export-methods": {
				"question": "两种导出方式有什么不同？",
				"answer": "• PDF 导出：使用后端服务进行高精度渲染，100% 还原排版，推荐用于正式发送给 HR。\n\n• 浏览器打印：调用您当前浏览器的自带打印功能（另存为 PDF）。适合在后端导出服务繁忙或您需要通过浏览器微调打印边距时使用。"
			},
			"export-failure": {
				"question": "导出失败或样式错乱怎么办？",
				"answer": "1. 推荐使用 Google Chrome 浏览器 (https://www.google.cn/intl/zh-CN/chrome/) 以获得最佳兼容性。\n2. 如果导出依然失败，请尝试在“无痕模式”下进行操作，排除插件干扰。\n3. 或者点击导出菜单中的“PDF (备份)”选项，并在打印预览界面选择“另存为 PDF”。"
			},
			"drag-and-drop": {
				"question": "如何拖拽调整模块顺序？",
				"answer": "在左侧编辑面板的“布局”设置中，将光标悬停在模块卡片左侧的「拖拽手柄」（通常表现为六个点状图标）上，按住鼠标左键即可上下拖拽模块以重新排序整个简历的章节。"
			}
		}
	}
};
var en_default = {
	common: {
		"title": "Magic Resume",
		"subtitle": "AI Driven Resume Editor",
		"description": "Magic Resume is an open source resume editor, free, privacy-first. No registration required, all data stored locally, support data backup and export, ensuring your resume data is always available.",
		"dashboard": "Dashboard",
		"edit": "Edit",
		"delete": "Delete",
		"newResume": "New Resume",
		"copy": "Copy",
		"cancel": "Cancel",
		"confirm": "Confirm",
		"deleteSuccess": "Deleted successfully",
		"deleteModuleConfirm": "Are you sure you want to delete this module? This action cannot be undone.",
		"configured": "Configured",
		"notConfigured": "Not configured"
	},
	home: {
		"header": {
			"title": "Magic Resume",
			"startButton": "Get Started",
			"features": "Features",
			"pricing": "Pricing",
			"about": "About",
			"login": "Login",
			"register": "Register",
			"dashboard": "Dashboard"
		},
		"hero": {
			"badge": "Smart Resume Creation",
			"title": "Make Resume Creation Simple and Smart",
			"subtitle": "Magic Resume uses AI technology to help you quickly create professional resumes. No registration required, free to use, with secure data storage.",
			"cta": "Get Started",
			"secondary": "Browse Templates"
		},
		"features": {
			"title": "Why Choose Magic Resume?",
			"subtitle": "We provide an all-in-one resume solution to make your job search journey smoother",
			"ai": {
				"badge": "AI Smart Check",
				"title": "Smart Detection, Professional Advice",
				"description": "Built-in smart grammar check, automatically identifies inappropriate expressions, provides professional modification suggestions, making your resume more outstanding.",
				"item1": "Intelligent enhancement",
				"item1_description": "AI automatically optimizes content expression, making your resume more professional",
				"item2": "Grammar check",
				"item2_description": "Automatically detects and corrects grammar and spelling errors"
			},
			"storage": {
				"badge": "Local Storage",
				"title": "Data Security, Privacy First",
				"description": "All resume data is fully stored locally, no need to worry about privacy leaks. Support data export backup, ensure your resume data is always available.",
				"item1": "Local file storage",
				"item1_description": "Resume data securely stored on your computer's hard drive",
				"item2": "Multiple export formats",
				"item2_description": "Support PDF and JSON format export",
				"item3": "Support data export backup"
			},
			"preview": {
				"badge": "Real-time Preview",
				"title": "What You See Is What You Get",
				"item1": "Real-time preview of editing effects",
				"item2": "Multiple export format support"
			}
		},
		"news": {
			"label": "News",
			"content": "New AI Resume Enhancement Feature is Live"
		},
		"footer": { "copyright": " 2025 Magic Resume. All rights reserved." },
		"changelog": "Changelog",
		"cta": {
			"title": "Start Your New Career Chapter",
			"description": "Start using Magic Resume now to create an impressive resume",
			"button": "Start Using for Free"
		},
		"faq": {
			"title": "Frequently Asked Questions",
			"items": [
				{
					"question": "Is Magic Resume free to use?",
					"answer": "Magic Resume is currently free, meeting basic resume creation needs. The open-source version's features will remain unchanged"
				},
				{
					"question": "Is my resume data secure?",
					"answer": "Yes, very secure. Magic Resume uses local storage, meaning all your data is stored on your own device with no cloud storage, ensuring complete privacy protection."
				},
				{
					"question": "What export formats are supported?",
					"answer": "We currently support PDF export, ensuring your resume maintains consistent formatting on any device. We plan to support more export formats in the future."
				},
				{
					"question": "How can I sync across devices?",
					"answer": "We provide JSON configuration export, allowing you to save your resume settings in JSON format, accessible anytime, anywhere, on any device."
				},
				{
					"question": "How customizable is it?",
					"answer": "We offer rich customization options, including colors, layouts, and more, allowing you to adjust your resume style according to personal preferences and industry requirements."
				}
			]
		}
	},
	dashboard: {
		"sidebar": {
			"appName": "Magic Resume",
			"resumes": "Resumes",
			"settings": "Settings",
			"templates": "Templates",
			"ai": "AI Config"
		},
		"resumes": {
			"created": "Created At",
			"synced": "Synced Files",
			"view": "View",
			"myResume": "My Resumes",
			"create": "Create Resume",
			"newResume": "New Resume",
			"newResumeDescription": "Create a new resume to get started.",
			"import": "Import Resume",
			"untitled": "Untitled Resume",
			"importSuccess": "Configuration imported successfully",
			"importError": "Import failed, please check the file format",
			"importDialog": {
				"title": "Import Resume",
				"jsonTitle": "Import JSON",
				"jsonDescription": "Import an exported resume config file (.json)",
				"pdfTitle": "Import PDF",
				"pdfDescription": "Use Gemini into structured resume data",
				"importing": "Importing, please wait...",
				"geminiConfigRequired": "Please configure Gemini API Key and Model ID in AI settings first",
				"pdfSuccess": "PDF imported successfully",
				"pdfError": "PDF import failed. Please check PDF content or Gemini configuration"
			},
			"notice": {
				"title": "Attention",
				"description": "It is recommended to configure a resume backup folder in the settings to prevent your data from being lost when the browser cache is cleared",
				"goToSettings": "Go to Settings"
			},
			"deleteConfirmTitle": "Confirm Delete Resume?",
			"deleteConfirmDescription": "This action cannot be undone. This will permanently delete this resume and remove the data from your device.",
			"createDialog": {
				"title": "Create New Resume",
				"description": "Start a new resume from a blank template",
				"tabs": {
					"fromTemplate": "From Template",
					"uploadFile": "Upload File"
				},
				"namePlaceholder": "Name",
				"switchTemplate": "Switch Template",
				"cancel": "Cancel",
				"create": "Create",
				"blankTitle": "Blank Resume",
				"startFromBlank": "Start from Blank",
				"startFromTemplate": "Start from Template",
				"blankCardDescription": "Use a default built-in layout and start from scratch.",
				"blankThumbnailDescription": "Start with a clean page and shape a code-driven resume with complete creative control.",
				"createNow": "Create Now",
				"backToGrid": "Back to template grid",
				"blankPreviewDescription": "Choose a blank page and build everything from zero, without any preset constraints.",
				"useThisTemplate": "Use This Template",
				"sample": {
					"company": "Google",
					"position": "Senior Software Engineer",
					"present": "Present",
					"workDescription": "Led the frontend team and improved page performance by 40%."
				}
			}
		},
		"settings": {
			"title": "Settings",
			"syncDirectory": {
				"title": "Sync Directory",
				"description": "Choose a folder to sync and backup your resumes.",
				"currentSyncFolder": "Current Sync Folder",
				"noFolderConfigured": "No folder configured",
				"changeFolder": "Change Folder",
				"selectFolder": "Select Folder"
			},
			"sync": {
				"title": "Sync Directory",
				"description": "Choose a folder to sync and backup your resumes.",
				"select": "Select Folder"
			},
			"ai": {
				"title": "AI Configuration",
				"currentModel": "Current Model",
				"selectModel": "Select Model",
				"getApiKey": "Get API Key",
				"doubao": {
					"title": "Doubao",
					"description": "Get API key from Volcengine",
					"apiKey": "Doubao API Key",
					"modelId": "Model ID"
				},
				"deepseek": {
					"title": "DeepSeek",
					"description": "Get API key from DeepSeek Platform",
					"apiKey": "DeepSeek API Key"
				},
				"openai": {
					"title": "OpenAI",
					"description": "Obtain the API key at OpenAI or an open platform compatible with the OpenAI format",
					"apiKey": "OpenAI API Key",
					"modelId": "Model ID",
					"apiEndpoint": "API Endpoint, example: https://openai.example.org/v1"
				},
				"gemini": {
					"title": "Gemini",
					"description": "Supports polish, grammar check, and PDF image resume import. Recommended model: gemini-flash-latest",
					"apiKey": "Gemini API Key",
					"modelId": "Gemini Model ID"
				}
			}
		},
		"templates": {
			"title": "Templates",
			"useTemplate": "Use Template",
			"preview": "Preview",
			"switchTemplate": "Switch Template",
			"classic": {
				"name": "Classic",
				"description": "Traditional and minimalist layout, suitable for most job applications"
			},
			"modern": {
				"name": "Two Column",
				"description": "Classic two-column layout, highlighting personal characteristics"
			},
			"leftRight": {
				"name": "Section Title Background",
				"description": "Distinctive section titles with background color"
			},
			"timeline": {
				"name": "Timeline Layout",
				"description": "Timeline style, emphasizing chronological order of experiences"
			},
			"minimalist": {
				"name": "Minimalist",
				"description": "Large amount of whitespace, clean and pure layout style"
			},
			"elegant": {
				"name": "Elegant",
				"description": "Centered title single-column design, with a touch of elegance"
			},
			"creative": {
				"name": "Creative",
				"description": "Visual contrast design, vibrant and personalized"
			},
			"editorial": {
				"name": "Editorial",
				"description": "Luxurious blend of bold serif and refined sans-serif typography"
			},
			"swiss": {
				"name": "Swiss Aesthetic",
				"description": "Artistic Bauhaus layout with strong typographic hierarchy and geometric accents, showing modern minimalism"
			}
		}
	},
	pdfExport: {
		"modal": {
			"title": "Export Resume",
			"subtitle": "Select the format you want to export your resume",
			"pdfDesc": "High-precision rendering with 100% format accuracy. Recommended for job applications.",
			"printDesc": "Save via system print dialog. Use as a fallback or for custom margins.",
			"jsonDesc": "Export your resume data as JSON to backup or transfer between devices.",
			"markdownDesc": "Convert to plain Markdown text for easy sharing with AI models.",
			"privacyNotice": "Magic Resume promise never to collect, upload, or store any of your resume data. Your privacy is fully protected."
		},
		"button": {
			"export": "Export",
			"exportPdf": "Export PDF (Server)",
			"exportJson": "Export JSON Config",
			"exportMarkdown": "Export Markdown",
			"exporting": "Exporting...",
			"exportingJson": "Exporting...",
			"exportingMarkdown": "Exporting...",
			"print": "Browser Print"
		},
		"toast": {
			"success": "PDF exported successfully",
			"error": "PDF export failed",
			"jsonSuccess": "Configuration exported successfully",
			"jsonError": "Configuration export failed",
			"markdownSuccess": "Markdown exported successfully",
			"markdownError": "Markdown export failed"
		},
		"result": {
			"successTitle": "Export Successful",
			"errorTitle": "Export Failed",
			"clickToClose": "Click anywhere to close"
		}
	},
	previewDock: {
		"switchTemplate": "Switch Template",
		"grammarCheck": {
			"idle": "AI Grammar Check",
			"checking": "Checking...",
			"configurePrompt": "Please configure AI Model",
			"configureButton": "Configure",
			"errorToast": "Grammar check failed, please try again"
		},
		"sidePanel": {
			"expand": "Expand Side Panel",
			"collapse": "Collapse Side Panel"
		},
		"editPanel": {
			"expand": "Expand Edit Panel",
			"collapse": "Collapse Edit Panel"
		},
		"previewPanel": {
			"expand": "Expand Preview Panel",
			"collapse": "Collapse Preview Panel"
		},
		"github": "GitHub",
		"backToDashboard": "Back to Dashboard",
		"copyResume": {
			"tooltip": "Copy Resume",
			"success": "Resume copied successfully",
			"error": "Failed to copy resume"
		},
		"export": {
			"tooltip": "Export Resume",
			"pdf": "Export PDF",
			"json": "Export JSON",
			"markdown": "Export Markdown",
			"print": "Print"
		},
		"autoOnePage": {
			"tooltip": "Auto Fit One Page",
			"enabled": "One page mode enabled",
			"disabled": "One page mode disabled",
			"cannotFit": "Too much content. Optimized as much as possible but cannot fit on one page. Try simplifying the content or adjusting margins and font size in the sidebar."
		},
		"backup": {
			"configured": "Backed up",
			"notConfigured": "Not backed up",
			"clickToConfigure": "Click to configure"
		}
	},
	workbench: {
		"sidePanel": {
			"layout": {
				"title": "Layout",
				"addCustomSection": "Add Module",
				"addCustomSectionOption": "Add Custom Section",
				"standardSections": {
					"skills": "Skills",
					"experience": "Experience",
					"projects": "Projects",
					"education": "Education",
					"selfEvaluation": "Self Evaluation",
					"certificates": "Certificates"
				}
			},
			"theme": {
				"title": "Theme Color",
				"custom": "Custom"
			},
			"typography": {
				"title": "Typography",
				"font": {
					"title": "Font",
					"alibaba": "Alibaba PuHuiTi",
					"misans": "MiSans",
					"notosanssc": "Noto Sans SC",
					"sourcehanserifsc": "Source Han Serif SC",
					"note": "MiSans is used under its free commercial license. Keep MiSans attribution when distributing this project."
				},
				"lineHeight": {
					"title": "Line Height",
					"normal": "Default",
					"relaxed": "Relaxed",
					"loose": "Loose"
				},
				"baseFontSize": { "title": "Base Font Size" },
				"headerSize": { "title": "Section Header Size" },
				"subheaderSize": { "title": "Subsection Header Size" }
			},
			"spacing": {
				"title": "Spacing",
				"pagePadding": { "title": "Page Padding" },
				"sectionSpacing": { "title": "Section Spacing" },
				"paragraphSpacing": { "title": "Paragraph Spacing" }
			},
			"mode": {
				"title": "Mode",
				"useIconMode": { "title": "Icon Mode" },
				"centerSubtitle": { "title": "Center Subtitle" },
				"flexibleHeaderLayout": { "title": "Long Title" }
			}
		},
		"basicPanel": {
			"title": "Profile",
			"avatar": "Avatar",
			"basicField": "Basic",
			"customField": "Custom",
			"layout": "Align",
			"customFields": {
				"placeholders": {
					"label": "Label",
					"value": "Value"
				},
				"displayLabel": "Show label",
				"addButton": "Add Custom Field"
			},
			"basicFields": {
				"name": "Name",
				"title": "Title",
				"email": "Email",
				"phone": "Phone",
				"website": "Website",
				"location": "Location",
				"birthDate": "Birth Date",
				"employementStatus": "Employ"
			},
			"fieldVisibility": {
				"show": "Show",
				"hide": "Hide"
			},
			"githubContributions": "GitHub Contributions"
		},
		"experiencePanel": {
			"title": "Work Experience",
			"addButton": "Add Work Experience",
			"defaultProject": {
				"company": "Tech Company Ltd.",
				"position": "Senior Frontend Engineer",
				"date": "2020 - Present",
				"details": "Responsible for core product development..."
			},
			"placeholders": {
				"company": "company name",
				"position": "job title",
				"date": "employment period",
				"details": "job responsibilities and achievements"
			}
		},
		"experienceItem": {
			"labels": {
				"company": "Company Name",
				"position": "Position",
				"date": "Employment Period",
				"details": "Job Responsibilities"
			},
			"placeholders": {
				"company": "Enter company name",
				"position": "e.g., Frontend Engineer",
				"date": "e.g., 2020-Present",
				"details": "Describe your responsibilities and achievements in this role"
			},
			"buttons": {
				"edit": "Edit",
				"save": "Save",
				"cancel": "Cancel",
				"delete": "Delete"
			},
			"visibility": {
				"show": "Show",
				"hide": "Hide"
			}
		},
		"projectPanel": {
			"title": "Project Experience",
			"addButton": "Add Project",
			"defaultProject": {
				"name": "Personal Project",
				"description": "Project Description",
				"role": "Responsibilities",
				"date": "2023.01 - 2023.06"
			},
			"placeholders": {
				"name": "Project Name",
				"description": "Briefly describe project background and goals",
				"role": "Your role and responsibilities in the project",
				"date": "Project time range",
				"link": "Project link "
			}
		},
		"projectItem": {
			"labels": {
				"name": "Project Name",
				"role": "Project Role",
				"date": "Project Period",
				"description": "Project Description",
				"technologies": "Tech Stack",
				"link": "Project Link",
				"linkLabel": "Display Text"
			},
			"placeholders": {
				"name": "Enter project name",
				"role": "Your role in the project",
				"date": "Project time range",
				"description": "Briefly describe project background and goals",
				"technologies": "Technologies and tools used",
				"link": "Project link",
				"linkLabel": "Display text"
			},
			"hints": { "linkLabel": "If display text is empty, the domain or full URL will be shown automatically. Only http:// and https:// links are supported." },
			"buttons": {
				"edit": "Edit",
				"save": "Save",
				"cancel": "Cancel",
				"delete": "Delete"
			},
			"visibility": {
				"show": "Show",
				"hide": "Hide"
			}
		},
		"educationPanel": {
			"title": "Education",
			"addButton": "Add Education",
			"defaultProject": {
				"school": "School Name",
				"degree": "Degree",
				"major": "Major",
				"date": "2020.09 - 2024.06"
			},
			"placeholders": {
				"school": "Enter school name",
				"degree": "Select degree",
				"major": "Enter major",
				"date": "Enter study period"
			}
		},
		"educationItem": {
			"labels": {
				"school": "School Name",
				"degree": "Degree",
				"major": "Major",
				"date": "Study Period",
				"description": "Description",
				"gpa": "GPA",
				"location": "Location",
				"startDate": "Start Date",
				"endDate": "End Date"
			},
			"placeholders": {
				"school": "Enter school name",
				"degree": "Select degree",
				"major": "Enter major",
				"date": "Enter study time range",
				"description": "Enter school description",
				"gpa": "Enter GPA",
				"location": "Enter location"
			},
			"buttons": {
				"edit": "Edit",
				"save": "Save",
				"cancel": "Cancel",
				"delete": "Delete"
			},
			"visibility": {
				"show": "Show",
				"hide": "Hide"
			}
		},
		"certificatesPanel": {
			"title": "Certificates",
			"addButton": "Add Certificate",
			"tips": "Upload or paste (Cmd/Ctrl + V) images directly. Adjust width ratio for horizontal layout.",
			"width": "Width (%)",
			"delete": "Delete",
			"empty": "No images yet. Please upload or paste images."
		}
	},
	field: {
		"selectDate": "Select Date",
		"enterYear": "Enter Year",
		"toPresent": "To Present"
	},
	richEditor: {
		"bold": "Bold",
		"italic": "Italic",
		"underline": "Underline",
		"link": "Link",
		"linkPlaceholder": "Enter a URL, for example https://example.com",
		"linkApply": "Apply",
		"linkRemove": "Remove",
		"linkInvalid": "Please enter a valid URL",
		"textColor": "Text Color",
		"backgroundColor": "Background Color",
		"alignLeft": "Align Left",
		"alignCenter": "Align Center",
		"alignRight": "Align Right",
		"alignJustify": "Justify",
		"bulletList": "Bullet List",
		"orderedList": "Ordered List",
		"undo": "Undo",
		"redo": "Redo",
		"aiPolish": "AI Polish",
		"paragraph": "Paragraph",
		"heading1": "Heading 1",
		"heading2": "Heading 2",
		"heading3": "Heading 3",
		"colors": {
			"black": "Black",
			"darkGray": "Dark Gray",
			"gray": "Gray",
			"red": "Red",
			"orange": "Orange",
			"orangeYellow": "Orange Yellow",
			"yellow": "Yellow",
			"yellowGreen": "Yellow Green",
			"green": "Green",
			"cyan": "Cyan",
			"lightBlue": "Light Blue",
			"blue": "Blue",
			"purple": "Purple",
			"magenta": "Magenta",
			"pink": "Pink"
		}
	},
	iconSelector: {
		"all": "All",
		"searchPlaceholder": "Search icons...",
		"noMatchingIcons": "No matching icons found",
		"tryOtherKeywords": "Please try other search keywords",
		"selectOtherCategory": "Please select another category",
		"categories": {
			"personal": "Personal Info",
			"education": "Education",
			"experience": "Work Experience",
			"skills": "Skills",
			"languages": "Languages",
			"projects": "Projects",
			"achievements": "Achievements",
			"hobbies": "Hobbies",
			"social": "Social Media",
			"others": "Others"
		},
		"icons": {
			"user": "User",
			"email": "Email",
			"phone": "Phone",
			"address": "Address",
			"website": "Website",
			"mobile": "Mobile",
			"education": "Education",
			"school": "School",
			"major": "Major",
			"library": "Library",
			"scholarship": "Scholarship",
			"work": "Work",
			"company": "Company",
			"office": "Office",
			"dateRange": "Date Range",
			"workTime": "Work Time",
			"programming": "Programming",
			"system": "System",
			"database": "Database",
			"terminal": "Terminal",
			"techStack": "Tech Stack",
			"language": "Language",
			"speaking": "Speaking",
			"communication": "Communication",
			"project": "Project",
			"branch": "Branch",
			"release": "Release",
			"target": "Target",
			"trophy": "Trophy",
			"medal": "Medal",
			"star": "Star",
			"interest": "Interest",
			"music": "Music",
			"art": "Art",
			"photography": "Photography",
			"linkedin": "LinkedIn",
			"twitter": "Twitter",
			"facebook": "Facebook",
			"instagram": "Instagram",
			"profile": "Profile",
			"review": "Review",
			"filter": "Filter",
			"link": "Link",
			"salary": "Salary",
			"idea": "Idea",
			"send": "Send",
			"share": "Share",
			"settings": "Settings",
			"search": "Search",
			"flag": "Flag",
			"bookmark": "Bookmark",
			"thumbsUp": "Thumbs Up",
			"skill": "Skill"
		}
	},
	aiPolishDialog: {
		"title": "AI Polish",
		"description": {
			"ready": "Add optional instructions, then click \"Start polish\"",
			"polishing": "Polishing your content...",
			"finished": "Content has been optimized, please check the result"
		},
		"error": {
			"configRequired": "Please configure AI model first",
			"polishFailed": "Polish failed",
			"applied": "Polish content applied"
		},
		"content": {
			"original": "Original Content",
			"polished": "Polished Content"
		},
		"customInstructions": "Custom instructions",
		"customInstructionsPlaceholder": "e.g. Use more technical terms, highlight metrics, keep tone formal… (optional)",
		"button": {
			"start": "Start polish",
			"regenerate": "Regenerate",
			"generating": "Generating...",
			"apply": "Apply Content"
		}
	},
	photoConfig: {
		"title": "Photo Settings",
		"description": "Customize your resume photo",
		"upload": {
			"title": "Online Link",
			"dragHint": "Drag and drop or click to upload image",
			"sizeLimit": "Image size must not exceed 2MB",
			"typeLimit": "Please upload an image file",
			"urlPlaceholder": "Enter image link",
			"invalidUrl": "Invalid image URL or inaccessible, please try another image link",
			"timeout": "Loading timeout",
			"loadError": "Failed to load image"
		},
		"config": {
			"aspectRatio": "Aspect Ratio",
			"size": "Size",
			"width": "Width",
			"height": "Height",
			"border-radius": "Border Radius",
			"widthPlaceholder": "Width",
			"heightPlaceholder": "Height",
			"ratios": {
				"1:1": "1:1 Square",
				"4:3": "4:3 Landscape",
				"3:4": "3:4 Portrait",
				"16:9": "16:9 Widescreen",
				"custom": "Custom"
			},
			"borderRadius": {
				"none": "None",
				"medium": "Medium",
				"full": "Circle",
				"custom": "Custom",
				"customPlaceholder": "Custom border radius"
			}
		},
		"actions": {
			"reset": "Reset",
			"close": "Close",
			"cancel": "Cancel",
			"removePhoto": "Remove Photo"
		}
	},
	templates: { "switchTemplate": "Switch Template" },
	themeModal: { "delete": {
		"title": "Confirm Deletion",
		"description": "Are you sure you want to delete {title}?",
		"confirmText": "Delete",
		"cancelText": "Cancel"
	} },
	grammarCheck: {
		"title": "AI Grammar Check",
		"description": "Found {count} suggestions",
		"exit": "Exit",
		"spelling": "Spelling",
		"punctuation": "Punctuation",
		"original": "Original",
		"error_point": "Error",
		"suggestion": "Suggestion",
		"reason": "Reason",
		"accept": "Apply",
		"ignore": "Ignore",
		"found_issues": "Found {count} issues",
		"applied_success": "Changes applied",
		"apply_error": "Text not found, cannot apply automatically",
		"no_errors_title": "Perfect!",
		"no_errors_desc": "No grammar or punctuation errors found."
	},
	faqDialog: {
		"title": "Frequently Asked Questions (FAQ)",
		"description": "Common tips and solutions for the Magic Resume workbench.",
		"items": {
			"browser-compatibility": {
				"question": "Which browser is recommended?",
				"answer": "We recommend using the latest version of Chrome or Edge for the best layout and export experience. Some outdated browsers may cause styling issues."
			},
			"export-failure": {
				"question": "What if export fails or style is broken?",
				"answer": "1. We recommend using Google Chrome (https://www.google.cn/intl/zh-CN/chrome/) for best compatibility.\n2. If it still fails, try in 'Incognito Mode' to exclude extension interference.\n3. Alternatively, click 'PDF (Backup)' in the export menu and select 'Save as PDF' in the print dialog."
			},
			"export-methods": {
				"question": "What's the difference between the two export methods?",
				"answer": "• Export PDF: Uses a backend service for high-precision rendering, 100% restoring the layout. Recommended for formal submission to HR.\n\n• Browser Print: Invokes your current browser's native print function (Save as PDF). Suitable when the backend export service is busy or you need to fine-tune print margins via your browser."
			},
			"drag-and-drop": {
				"question": "How do I drag and drop to reorder modules?",
				"answer": "In the 'Layout' settings of the left edit panel, hover your cursor over the 'Drag Handle' (usually represented by a six-dot icon) on the left side of the module card. Click and hold the left mouse button to drag the module up or down to reorder the sections of your entire resume."
			}
		}
	}
};
//#endregion
//#region src/i18n/config.ts
var locales = ["zh", "en"];
var localeNames = {
	zh: "中文",
	en: "English"
};
//#endregion
//#region src/i18n/runtime.ts
var localeSet = new Set(locales);
function isSupportedLocale(value) {
	return localeSet.has(value);
}
function getLocaleFromPathname(pathname) {
	const firstSegment = pathname.split("/").filter(Boolean)[0];
	if (!firstSegment) return null;
	return isSupportedLocale(firstSegment) ? firstSegment : null;
}
function getPreferredLocale(pathname) {
	const localeFromPath = getLocaleFromPathname(pathname);
	if (localeFromPath) return localeFromPath;
	if (typeof document !== "undefined") {
		const cookieLocale = document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1];
		if (cookieLocale && isSupportedLocale(cookieLocale)) return cookieLocale;
	}
	return "zh";
}
function replacePathLocale(pathname, locale) {
	const segments = pathname.split("/").filter(Boolean);
	if (segments.length > 0 && isSupportedLocale(segments[0])) {
		segments[0] = locale;
		return `/${segments.join("/")}`;
	}
	return `/${locale}`;
}
//#endregion
//#region src/routes/$locale.tsx
var $$splitComponentImporter = () => import("./_locale-Cz-w8m_H.js");
var SEO_BASE_URL = "https://magicv.art";
function resolveLocale(rawLocale) {
	if (locales.includes(rawLocale)) return rawLocale;
	return "zh";
}
function getLocaleSeo(locale) {
	const messages = locale === "en" ? en_default : zh_default;
	return {
		title: `${messages.common.title} - ${messages.common.subtitle}`,
		description: messages.common.description,
		localeTag: locale === "en" ? "en_US" : "zh_CN",
		canonical: `${SEO_BASE_URL}/${locale}`,
		alternateLocale: locale === "en" ? "zh" : "en"
	};
}
var Route = createFileRoute("/$locale")({
	head: ({ params }) => {
		const locale = resolveLocale(params.locale);
		const seo = getLocaleSeo(locale);
		return {
			meta: [
				{ title: seo.title },
				{
					name: "description",
					content: seo.description
				},
				{
					name: "robots",
					content: "index,follow"
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:site_name",
					content: "Magic Resume"
				},
				{
					property: "og:title",
					content: seo.title
				},
				{
					property: "og:description",
					content: seo.description
				},
				{
					property: "og:locale",
					content: seo.localeTag
				},
				{
					property: "og:url",
					content: seo.canonical
				},
				{
					property: "og:image",
					content: `${SEO_BASE_URL}/web-shot.png`
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: seo.title
				},
				{
					name: "twitter:description",
					content: seo.description
				},
				{
					name: "twitter:image",
					content: `${SEO_BASE_URL}/web-shot.png`
				}
			],
			links: [
				{
					rel: "canonical",
					href: seo.canonical
				},
				{
					rel: "alternate",
					hrefLang: locale,
					href: seo.canonical
				},
				{
					rel: "alternate",
					hrefLang: seo.alternateLocale,
					href: `${SEO_BASE_URL}/${seo.alternateLocale}`
				},
				{
					rel: "alternate",
					hrefLang: "x-default",
					href: `${SEO_BASE_URL}/zh`
				}
			]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { localeNames as a, zh_default as c, replacePathLocale as i, getLocaleFromPathname as n, locales as o, getPreferredLocale as r, en_default as s, Route as t };
