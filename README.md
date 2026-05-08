# 全球风味厨房 (Global Kitchen)

一款支持多语种的美食食谱在线平台，涵盖中餐、西餐、日料、韩式料理等全球主流菜系。打造沉浸式烹饪学习体验，帮助用户从零开始掌握世界各地美食的制作方法。

## 功能特性

- 🍳 **食谱浏览** - 全球美食食谱，分类筛选，搜索功能
- 👩‍🍳 **互动烹饪** - 分步图解指导，智能计时器，份量计算
- 📊 **进度追踪** - 烹饪打卡，历史记录，数据统计
- 👥 **美食社区** - 作品分享，话题挑战，点赞评论
- 📱 **多端支持** - Web 应用 + 微信小程序

## 技术栈

### 前端
- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3
- Zustand (状态管理)
- React Router DOM 6
- Lucide React (图标)

### 后端
- Express 4
- TypeScript
- Prisma ORM
- MySQL 8

### 小程序
- 微信小程序原生框架
- TypeScript

## 项目结构

```
workspace/
├── src/                    # React 前端源码
│   ├── components/         # React 组件
│   ├── pages/             # 页面组件
│   ├── hooks/             # 自定义 Hooks
│   ├── store/             # Zustand 状态管理
│   ├── types/             # TypeScript 类型定义
│   └── data/              # 模拟数据
├── api/                   # Express 后端 API
│   ├── routes/            # API 路由
│   ├── app.ts             # Express 应用入口
│   └── server.ts          # 服务器启动文件
├── prisma/                # 数据库配置
│   ├── schema.prisma      # Prisma 数据模型
│   └── init.sql           # MySQL 建表脚本
├── miniprogram/           # 微信小程序
│   └── miniprogram/       # 小程序源码
└── .trae/documents/       # 项目文档
```

## 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+
- MySQL 8+ (可选，使用模拟数据)

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接信息
```

### 数据库初始化

**方式一：使用 Prisma**

```bash
pnpm prisma generate   # 生成 Prisma Client
pnpm prisma db push    # 同步数据库结构
```

**方式二：使用 SQL 脚本**

```bash
mysql -u root -p < prisma/init.sql
```

### 启动开发服务器

```bash
# 仅启动前端
pnpm client:dev

# 仅启动后端
pnpm server:dev

# 同时启动前后端
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 微信小程序

详见 [miniprogram/README.md](miniprogram/README.md)

## API 文档

### 认证接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/auth/register | 用户注册 |
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/logout | 用户退出 |
| GET | /api/auth/profile | 获取用户信息 |

### 食谱接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/recipes | 获取食谱列表 |
| GET | /api/recipes/:id | 获取食谱详情 |

### 进度接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/progress | 获取烹饪进度 |
| POST | /api/progress/cook/:recipeId | 开始烹饪 |
| PUT | /api/progress/step/:stepNumber | 标记步骤完成 |
| POST | /api/progress/complete/:recipeId | 完成烹饪 |

### 社区接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/community/posts | 获取帖子列表 |
| POST | /api/community/posts | 发布帖子 |
| POST | /api/community/posts/:id/like | 点赞帖子 |

## 部署

### Web 应用

推荐使用 Vercel 部署前端，Express 后端可部署到任意 Node.js 托管平台。

```bash
# 构建前端
pnpm build

# 构建后端
pnpm --filter api build
```

### 微信小程序

1. 打开微信开发者工具
2. 导入 `miniprogram` 目录
3. 修改 `project.config.json` 中的 `appid`
4. 修改 `miniprogram/utils/api.ts` 中的 API 地址
5. 上传代码审核发布

## 环境变量

| 变量名 | 描述 | 示例 |
|--------|------|------|
| DATABASE_URL | MySQL 数据库连接地址 | mysql://user:pass@localhost:3306/global_kitchen |
| JWT_SECRET | JWT 密钥 | your-super-secret-key |
| JWT_EXPIRES_IN | JWT 过期时间 | 7d |
| CORS_ORIGIN | CORS 允许的源 | http://localhost:5173 |
| PORT | 服务器端口 | 3000 |

## 开发指南

### 代码规范

- 使用 ESLint 进行代码检查
- 使用 TypeScript 严格模式
- 遵循 React Hooks 规范

### 提交规范

使用 Conventional Commits 格式：

```
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

## License

MIT
