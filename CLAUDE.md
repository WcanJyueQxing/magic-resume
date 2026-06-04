# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（端口 3000） |
| `pnpm build` | 生产构建 |
| `pnpm preview` | 预览构建结果 |
| `pnpm release` | 版本发布（使用 bumpp） |
| `pnpm generate:template-snapshots` | 生成模板预览截图（需先 `pnpm install:playwright`） |
| `pnpm install:playwright` | 安装 Playwright Chromium |

## 技术栈

- **框架**: TanStack Start（基于 Vite 的 React 全栈框架）
- **路由**: TanStack Router（文件路由，路由定义在 `src/routes/`）
- **状态管理**: Zustand（带 persist 中间件，持久化到 localStorage）
- **样式**: Tailwind CSS 3 + HeroUI + shadcn/ui 组件
- **富文本编辑器**: Tiptap 3
- **动画**: Framer Motion
- **国际化**: 自定义 i18n 实现（支持 zh/en，默认 zh）

## 架构概览

### 路由结构（TanStack Router 文件路由）

路由文件在 `src/routes/` 下，自动生成 `src/routeTree.gen.ts`：

- `/` — 首页（公开页面，在 `src/app/(public)/`）
- `/app/` — 重定向到 `/app/dashboard/resumes`
- `/app/dashboard/` — 仪表板布局（侧边栏 + 子路由）
  - `resumes` — 简历列表
  - `templates` — 模板选择
  - `ai` — AI 配置
  - `settings` — 设置
- `/app/workbench/$id` — 简历编辑工作台（核心页面）
- `/api/grammar` — 语法检查 API
- `/api/polish` — 内容润色 API（流式响应）
- `/api/proxy/image` — 图片代理

### 状态管理（Zustand Stores）

三个核心 store，均在 `src/store/`：

- **useResumeStore** — 简历数据核心 store，管理所有简历 CRUD、section 编辑、模板切换、主题色等。使用 `persist` 中间件持久化。支持文件系统同步（File System Access API）。
- **useAIConfigStore** — AI 模型配置 store，管理多种 AI 模型（doubao/deepseek/openai/gemini/ollama）的 API Key 和端点。
- **useGrammarStore** — 语法检查 store，调用 `/api/grammar` 检查错别字和标点错误。

### 模板系统

模板注册在 `src/components/templates/registry.ts`，采用注册表模式：

- 每个模板是一个独立目录（`classic/`、`modern/` 等），包含 `config.ts`（配置）和 `index.tsx`（组件）
- `TEMPLATE_REGISTRY` 统一注册所有模板，`DEFAULT_TEMPLATES` 导出配置数组
- `getTemplateComponent(layout)` 根据 layout id 查找模板组件
- 添加新模板只需：创建目录 → 在 `registry.ts` 添加一行

当前 9 个模板：classic、modern、left-right、timeline、minimalist、elegant、creative、editorial、swiss

### 工作台布局（Workbench）

`src/app/app/workbench/[id]/page.tsx` 是核心编辑页面，三栏布局：

- **SidePanel**（左侧）— section 列表和排序
- **EditPanel**（中间）— 对应 section 的编辑表单
- **PreviewPanel**（右侧）— 实时简历预览

使用 `react-resizable-panels` 实现可拖拽调整面板大小。

### AI 功能

支持 5 种 AI 模型（配置在 `src/config/ai.ts`）：

- **doubao**（豆包）、**deepseek**、**openai**、**gemini**、**ollama**（本地）

API 端点通过 TanStack Router 的 server handlers 实现（`src/routes/api/`）：

- `/api/grammar` — 语法检查（非流式）
- `/api/polish` — 内容润色（SSE 流式响应）

### 导出功能

PDF 导出通过远程服务端渲染（`PDF_EXPORT_CONFIG.SERVER_URL`），客户端克隆 DOM、收集样式后发送到服务端生成 PDF。也支持浏览器原生打印导出。

### i18n

- 配置：`src/i18n/config.ts`（zh/en 双语）
- 语言文件：`src/i18n/locales/zh.json`、`en.json`
- 语言切换通过 URL 路径前缀（`/zh/...` 或 `/en/...`）
- 使用 cookie `NEXT_LOCALE` 持久化语言偏好

## 路径别名

`@/*` 映射到 `./src/*`（在 `tsconfig.json` 配置，通过 `vite-tsconfig-paths` 插件生效）。

## 数据持久化

- 简历数据通过 Zustand persist 存储在 localStorage（key: `resume-storage`）
- 支持 File System Access API 将简历同步到本地文件夹（在设置页面配置目录）
- 文件同步使用防抖（1.5 秒）避免高频写入

## 类型定义

核心类型在 `src/types/resume.ts`：

- `ResumeData` — 简历完整数据结构
- `BasicInfo`、`Education`、`Experience`、`Project`、`Certificate`、`CustomItem` — 各 section 数据
- `GlobalSettings` — 全局样式设置（字体、间距、主题色等）
- `MenuSection` — section 元数据（排序、可见性）
