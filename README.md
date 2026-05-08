# 全球风味厨房 (Global Kitchen)

一款支持多语种的美食食谱在线平台，涵盖中餐、西餐、日料、韩式料理等全球主流菜系。打造沉浸式烹饪学习体验，帮助用户从零开始掌握世界各地美食的制作方法。

## 功能特性

- 🍳 **食谱浏览** - 全球美食食谱，分类筛选，搜索功能
- 👩‍🍳 **互动烹饪** - 分步图解指导，智能计时器，份量计算
- 📚 **食材百科** - 常见食材详解，营养成分，购买和储存建议
- 📊 **进度追踪** - 烹饪打卡，历史记录，数据统计
- 👥 **美食社区** - 作品分享，话题挑战，点赞评论，多级回复
- 🏆 **成就系统** - 徽章收集，等级提升，称号解锁
- 🔔 **通知系统** - 新消息提醒，互动通知
- 📜 **搜索历史** - 记录搜索关键词，快速回顾
- 💬 **私信系统** - 用户间一对一私信沟通
- 🌐 **多语言** - 中文、英文、日文、韩文界面切换
- 🔗 **分享功能** - 食谱/帖子分享到微信、朋友圈
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
│   ├── locales/            # 多语言文件
│   ├── types/             # TypeScript 类型定义
│   └── data/              # 模拟数据
├── api/                   # Express 后端 API
│   └── routes/            # API 路由
├── prisma/                # 数据库配置
│   ├── schema.prisma      # Prisma 数据模型
│   ├── init.sql           # MySQL 建表脚本
│   └── seed.sql          # 种子数据
├── miniprogram/           # 微信小程序
└── .trae/documents/       # 项目文档
```

## 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+
- MySQL 8+

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DATABASE_URL="mysql://user:password@localhost:3306/global_kitchen"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
PORT=3000
```

### 数据库初始化

```bash
# 创建数据库和表
mysql -u root -p < prisma/init.sql

# 导入种子数据（可选）
mysql -u root -p < prisma/seed.sql

# 或使用 Prisma
pnpm prisma generate
pnpm prisma db push
```

### 启动开发服务器

```bash
pnpm dev
```

## 数据库设计

### 数据表 (17张)

| 表名 | 说明 |
|------|------|
| users | 用户表 |
| recipes | 食谱表 |
| ingredients | 食材表 |
| ingredient_encyclopedia | 食材百科表 |
| steps | 步骤表 |
| timers | 计时器表 |
| user_progress | 用户进度表 |
| cooking_sessions | 烹饪会话表 |
| favorites | 收藏表 |
| community_posts | 社区帖子表 |
| community_likes | 帖子点赞表 |
| community_comments | 帖子评论表（支持多级回复） |
| badges | 成就徽章表 |
| user_badges | 用户成就表 |
| challenges | 挑战活动表 |
| challenge_participants | 挑战参与表 |
| notifications | 通知表 |
| search_history | 搜索历史表 |
| messages | 私信表 |

## API 文档

### 认证接口 `/api/auth`

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /register | 用户注册 |
| POST | /login | 用户登录 |
| POST | /logout | 用户退出 |
| GET | /profile | 获取用户信息 |

### 食谱接口 `/api/recipes`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取食谱列表（支持分页、筛选、搜索） |
| GET | /:id | 获取食谱详情 |

### 收藏接口 `/api/favorites`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取收藏列表 |
| POST | /:recipeId | 收藏/取消收藏食谱 |
| GET | /check/:recipeId | 检查收藏状态 |

### 进度接口 `/api/progress`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取烹饪进度和统计 |
| POST | /cook/:recipeId | 开始烹饪会话 |
| PUT | /step/:stepNumber | 标记步骤完成 |
| POST | /complete/:recipeId | 完成烹饪 |

### 社区接口 `/api/community`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /posts | 获取帖子列表 |
| POST | /posts | 发布帖子 |
| POST | /posts/:id/like | 点赞/取消点赞 |

### 评论接口 `/api/comments`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取评论列表（支持多级） |
| POST | / | 创建评论/回复 |
| DELETE | /:id | 删除评论 |
| POST | /:id/like | 点赞评论 |

### 成就接口 `/api/badges`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取所有成就徽章 |
| GET | /user | 获取用户成就进度 |

### 通知接口 `/api/notifications`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取通知列表 |
| PUT | /read/:id | 标记单条已读 |
| PUT | /read-all | 标记全部已读 |

### 挑战接口 `/api/challenges`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取挑战列表 |
| GET | /:id | 获取挑战详情 |
| POST | /:id/join | 参与挑战 |

### 搜索历史接口 `/api/search-history`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取搜索历史 |
| POST | / | 保存搜索记录 |
| DELETE | / | 清空搜索历史 |
| DELETE | /:id | 删除单条记录 |

### 私信接口 `/api/messages`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /conversations | 获取会话列表 |
| GET | /:userId | 获取与某用户的聊天记录 |
| POST | / | 发送私信 |
| PUT | /:id/read | 标记已读 |

### 食材百科接口 `/api/encyclopedia`

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | / | 获取食材百科列表 |
| GET | /:id | 获取食材详情 |
| GET | /categories/list | 获取分类列表 |

## 多语言支持

支持 4 种语言：中文(zh)、英文(en)、日文(ja)、韩文(ko)

语言文件位于 `src/locales/` 目录

## 徽章系统

| 徽章 ID | 名称 | 类型 | 条件 |
|---------|------|------|------|
| badge-first-cook | 初次下厨 | cooking | 完成1道菜 |
| badge-10-dishes | 小试牛刀 | cooking | 完成10道菜 |
| badge-50-dishes | 厨房达人 | cooking | 完成50道菜 |
| badge-100-dishes | 烹饪大师 | cooking | 完成100道菜 |
| badge-streak-3 | 坚持不懈 | streak | 连续3天 |
| badge-streak-7 | 一周打卡 | streak | 连续7天 |
| badge-streak-30 | 月度坚持 | streak | 连续30天 |
| badge-social-first | 社交达人 | social | 发布1篇帖子 |
| badge-like-100 | 人气博主 | social | 获得100次点赞 |
| badge-chinese-master | 中餐大师 | cuisine | 完成10道中餐 |
| badge-japanese-master | 日料达人 | cuisine | 完成10道日料 |

## 微信小程序

详见 [miniprogram/README.md](miniprogram/README.md)

## 部署

### Web 应用

推荐使用 Vercel 部署前端：

```bash
pnpm build
```

### 后端部署

Express 后端可部署到任意 Node.js 托管平台（Railway、Render、阿里云等）。

```bash
# 使用 PM2 部署
pm2 start api/server.ts --name global-kitchen-api
```

### 微信小程序

1. 打开微信开发者工具
2. 导入 `miniprogram` 目录
3. 修改 `project.config.json` 中的 `appid`
4. 修改 `miniprogram/utils/api.ts` 中的 API 地址
5. 上传代码审核发布

## License

MIT
