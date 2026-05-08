# 全球风味厨房 - 微信小程序

基于全球风味厨房 Web 应用的微信小程序版本，提供移动端原生体验。

## 功能特性

- 🍳 **首页** - 热门食谱推荐、菜系分类导航
- 📖 **食谱列表** - 按菜系筛选、搜索食谱
- 👩‍🍳 **食谱详情** - 食材列表、步骤说明、份量计算
- 🔥 **互动烹饪** - 步骤导航、计时器、进度追踪
- 👥 **美食社区** - 作品分享、点赞评论
- 📊 **烹饪进度** - 完成记录、数据统计
- 👤 **个人中心** - 用户信息、成就徽章

## 技术栈

- 微信小程序原生框架
- TypeScript
- WXML/WXSS
- 微信小程序 API

## 项目结构

```
miniprogram/
├── miniprogram/
│   ├── app.ts          # 应用入口
│   ├── app.json        # 应用配置
│   ├── app.wxss        # 全局样式
│   ├── pages/          # 页面文件
│   │   ├── home/       # 首页
│   │   ├── recipeList/ # 食谱列表
│   │   ├── recipeDetail/ # 食谱详情
│   │   ├── cooking/     # 互动烹饪
│   │   ├── community/   # 美食社区
│   │   ├── progress/    # 烹饪进度
│   │   ├── profile/     # 个人中心
│   │   └── login/       # 登录注册
│   ├── utils/          # 工具函数
│   └── types/          # 类型定义
└── project.config.json # 项目配置
```

## 开发指南

### 环境要求

- 微信开发者工具
- Node.js 16+

### 安装依赖

```bash
npm install
```

### 运行项目

1. 打开微信开发者工具
2. 导入项目根目录
3. 选择 `miniprogram` 作为项目目录
4. 编译运行

### 配置 API

在 `miniprogram/utils/api.ts` 中修改 `API_BASE_URL` 为你的后端 API 地址：

```typescript
const API_BASE_URL = 'https://your-api-domain.com';
```

## 页面说明

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | /pages/home/index | 展示推荐食谱和分类导航 |
| 食谱列表 | /pages/recipeList/index | 食谱筛选和搜索 |
| 食谱详情 | /pages/recipeDetail/index | 食谱完整信息和开始烹饪入口 |
| 互动烹饪 | /pages/cooking/index | 分步指导、计时器 |
| 美食社区 | /pages/community/index | 用户作品展示 |
| 烹饪进度 | /pages/progress/index | 完成记录统计 |
| 个人中心 | /pages/profile/index | 用户信息和设置 |
| 登录 | /pages/login/index | 用户登录注册 |

## 与 Web 版对比

| 功能 | Web 版 | 小程序版 |
|------|--------|----------|
| 平台 | React + Vite | 微信小程序 |
| 部署 | Vercel | 微信小程序 |
| 分享 | 链接分享 | 小程序卡片 |
| 推送 | Web Push | 微信订阅消息 |
| 登录 | 邮箱/第三方 | 微信授权 |

## License

MIT
