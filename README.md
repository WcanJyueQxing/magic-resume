<div align="center">

# ✨ Magic Resume ✨

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-latest-black)
![React 18](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

</div>

Magic Resume 是一款现代化的在线简历编辑器，让创建专业简历变得简单有趣。基于 TanStack Start 和 Framer Motion 构建，支持实时预览和自定义主题。

## 📸 项目截图

<img width="1920" height="1440" alt="Magic Resume Preview" src="https://github.com/user-attachments/assets/4667e49a-7bf2-4379-9390-725e42799dc7" />

## ✨ 功能特性

### 核心功能

- 🚀 **现代架构**: 基于 TanStack Start + React 18 + TypeScript
- 💫 **流畅动画**: Framer Motion 驱动的平滑过渡效果
- 🎨 **自定义主题**: 完全可定制的配色方案和排版
- 🌙 **深色模式**: 原生深色/浅色模式支持
- 📤 **PDF 导出**: 将专业简历导出为 PDF 文件
- 🔄 **实时预览**: 编辑时即时查看更改效果
- 💾 **自动保存**: 自动保存工作内容，永不丢失
- 🔒 **本地存储**: 安全的本地文件系统存储

### AI 集成

- 🤖 **AI 写作助手**: 获取 AI 驱动的简历内容建议
- 📝 **语法检查**: 实时语法和拼写纠正
- ✨ **内容润色**: 使用 AI 优化简历措辞
- 🔧 **多 AI 提供商**: 支持豆包、DeepSeek、OpenAI、Gemini 和 Ollama（本地）

### 简历管理

- 📥 **PDF 导入**: 从 PDF 文件导入现有简历
- 📁 **简历库**: 集中管理多个简历
- 🔄 **模板切换**: 更换模板而不丢失内容

### 模板系统

- 📋 **9 种精美模板**: Classic、Modern、Creative、Elegant、Editorial、Swiss、Minimalist、Timeline、Left-Right
- 🎯 **自定义布局**: 灵活的章节排序
- 📐 **单页模式**: 自动将内容适配到单页

## 🛠️ 技术栈

| 分类    | 技术                        |
| ----- | ------------------------- |
| 框架    | TanStack Start (React 18) |
| 语言    | TypeScript 5              |
| 动画    | Framer Motion             |
| 状态管理  | Zustand                   |
| UI 库  | shadcn/ui                 |
| 样式    | Tailwind CSS 3            |
| 图标    | Lucide React              |
| 富文本编辑 | Tiptap                    |
| 路由    | TanStack Router           |
| 国际化   | next-intl                 |

## 🚀 快速开始

### 前置条件

- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm >= 8.0

### 安装

```bash
# 克隆仓库
git clone git@github.com:JOYCEQL/magic-resume.git
cd magic-resume

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

打开浏览器访问 `http://localhost:3000`

## 📦 构建与部署

### 生产构建

```bash
pnpm build
```

### Docker 部署

```bash
# 使用 Docker Compose
docker compose up -d
```

### Vercel 部署

项目已优化适配 Vercel 部署，只需将 GitHub 仓库连接到 Vercel 即可。

## 📁 项目结构

```
magic-resume/
├── .github/                # GitHub CI/CD 工作流
├── fonts/                  # 自定义字体
├── images/                 # 静态图片
├── public/                 # 公共资源
│   ├── features/           # 功能展示图片
│   ├── fonts/              # Web 字体
│   └── template-snapshots/ # 模板预览截图
├── scripts/                # 辅助脚本
│   ├── clear-resumes.js    # 清除简历数据
│   └── generate-template-snapshots.ts # 生成模板截图
└── src/
    ├── app/                # 应用路由和页面
    │   ├── (public)/       # 公开页面（首页）
    │   ├── app/            # 认证后应用
    │   │   ├── dashboard/  # 仪表盘页面
    │   │   │   ├── ai/     # AI 设置
    │   │   │   ├── resumes/# 简历管理
    │   │   │   └── templates/ # 模板选择
    │   │   ├── pdf-parser/ # PDF 解析页面
    │   │   └── workbench/  # 简历编辑器
    │   └── api/            # API 端点（grammar, polish, proxy）
    ├── components/         # 可复用组件
    │   ├── ai/             # AI 提供商图标
    │   ├── editor/         # 编辑器组件（基本信息、教育、经验、项目）
    │   ├── home/           # 首页组件
    │   ├── pdf/            # PDF 处理组件
    │   │   ├── PdfUploader.tsx      # PDF 文件上传
    │   │   ├── PdfViewer.tsx        # PDF 预览组件
    │   │   └── UniversalPdfParser.tsx # 通用 PDF 解析器（含 OCR）
    │   ├── preview/        # 简历预览面板
    │   ├── shared/         # 共享组件（AI 对话框、富文本编辑器）
    │   ├── templates/      # 9 种简历模板
    │   └── ui/             # shadcn/ui 组件
    ├── config/             # 配置文件
    │   ├── ai.ts           # AI 模型配置
    │   └── constants.ts    # 全局常量
    ├── hooks/              # 自定义 React Hooks
    │   ├── useAIConfiguration.tsx # AI 配置 Hook
    │   ├── useAutoOnePage.ts      # 自动适配单页
    │   └── useGrammarCheck.ts     # 语法检查 Hook
    ├── i18n/               # 国际化（en.json, zh.json）
    ├── routes/             # TanStack Router 定义
    ├── store/              # Zustand 状态管理
    │   ├── useAIConfigStore.ts    # AI 配置 Store
    │   ├── useGrammarStore.ts     # 语法检查 Store
    │   └── useResumeStore.ts      # 简历数据 Store
    └── utils/              # 工具函数
        ├── export.ts               # 导出 PDF/JSON
        ├── fileSystem.ts           # 文件系统操作
        ├── pdfParser.ts            # PDF 解析工具
        ├── pdfResumeParser.ts      # 简历专用 PDF 解析器
        └── uuid.ts                 # UUID 生成
```

### 📂 目录功能概述

| 目录                          | 用途           |
| --------------------------- | ------------ |
| `src/app/`                  | 应用路由和页面      |
| `src/components/pdf/`       | PDF 处理组件     |
| `src/components/editor/`    | 简历编辑器组件      |
| `src/components/templates/` | 9 种简历模板      |
| `src/utils/`                | 工具函数         |
| `src/store/`                | Zustand 状态管理 |
| `src/config/`               | 配置文件         |

#

#

<br />

**pdfResumeParser** (`src/utils/pdfResumeParser.ts`)

- 从简历中提取结构化数据
- 支持中英文简历格式
- 解析个人信息、教育背景、工作经验、技能等

## 🎯 使用指南

### 创建简历

1. **导航到仪表盘**: 访问 `/app/dashboard/resumes`
2. **新建简历**: 点击"新建简历"按钮
3. **选择模板**: 选择你喜欢的模板
4. **编辑内容**: 填写个人信息、教育背景、工作经验等
5. **预览**: 在右侧查看实时预览
6. **导出**: 点击导出按钮下载为 PDF

### 导入 PDF

1. 在仪表盘点击"导入简历"
2. 选择"导入 PDF"选项
3. 选择你的 PDF 文件
4. 系统会自动解析并提取内容
5. 查看并编辑导入的内容

### AI 配置

1. 访问 `/app/dashboard/ai`
2. 选择你喜欢的 AI 提供商
3. 如需要，输入 API 密钥
4. 对于 Ollama（本地 AI）：
   - 安装 Ollama: `curl https://ollama.ai/install.sh | sh`
   - 拉取模型: `ollama pull llama3`
   - 启动服务: `ollama serve`
   - 配置端点: `http://localhost:11434`

## 🔧 配置

### 环境变量

```bash
# .env 文件
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### AI 提供商

应用支持以下 AI 提供商：

- **豆包** (百度)
- **DeepSeek**
- **OpenAI**
- **Google Gemini**
- **Ollama** (本地)

## 📝 许可证与商业使用

本项目基于 **Apache 2.0** 许可证开源，但有严格的商业限制：

- **个人使用**: 非商业个人使用免费（学习、个人简历创建）
- **商业使用**: 任何商业使用需要明确授权，包括 SaaS/PaaS 服务、企业使用或衍生商业产品

详情请参阅 [LICENSE](LICENSE) 文件。

## 🗺️ 路线图

- [x] AI 写作助手
- [x] 多语言支持
- [x] PDF 导入（含 OCR）
- [x] Ollama 本地 AI 支持
- [x] 自动单页模式
- [ ] 更多简历模板
- [ ] 额外导出格式
- [ ] 在线简历托管

## 📈 Star History

<a href="https://star-history.com/#JOYCEQL/magic-resume&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date" />
 </picture>
</a>
