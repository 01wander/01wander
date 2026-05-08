-- =====================================================
-- 全球风味厨房数据库初始化脚本
-- Global Kitchen Database Initialization Script
-- MySQL 8.x
-- =====================================================

CREATE DATABASE IF NOT EXISTS global_kitchen
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE global_kitchen;

-- =====================================================
-- 用户相关表
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY COMMENT '用户唯一标识(UUID)',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT '用户邮箱(唯一)',
    phone VARCHAR(20) UNIQUE COMMENT '用户手机号(唯一)',
    password_hash VARCHAR(255) COMMENT '密码哈希值(bcrypt加密)',
    nickname VARCHAR(50) NOT NULL COMMENT '用户昵称',
    avatar VARCHAR(255) COMMENT '用户头像URL',
    level INT DEFAULT 1 COMMENT '用户等级',
    exp INT DEFAULT 0 COMMENT '用户经验值',
    title VARCHAR(50) DEFAULT '厨房小白' COMMENT '用户称号',
    preferences JSON COMMENT '用户偏好设置(JSON格式)',
    language VARCHAR(10) DEFAULT 'zh' COMMENT '语言设置(zh/en/ja/ko)',
    status INT DEFAULT 1 COMMENT '账号状态(1:正常,0:禁用)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '食谱ID',
    completed_at DATETIME COMMENT '完成时间',
    rating INT COMMENT '用户评分(1-5星)',
    photo_url VARCHAR(255) COMMENT '成品照片URL',
    notes TEXT COMMENT '用户备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_completed_at (completed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户进度表';

CREATE TABLE IF NOT EXISTS user_badges (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    badge_id VARCHAR(50) NOT NULL COMMENT '徽章ID',
    progress INT DEFAULT 0 COMMENT '当前进度',
    unlocked_at DATETIME COMMENT '解锁时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户成就表';

CREATE TABLE IF NOT EXISTS badges (
    id VARCHAR(50) PRIMARY KEY COMMENT '徽章ID',
    name VARCHAR(100) NOT NULL COMMENT '徽章名称(中文)',
    name_en VARCHAR(100) NOT NULL COMMENT '徽章名称(英文)',
    description TEXT COMMENT '徽章描述(中文)',
    description_en TEXT COMMENT '徽章描述(英文)',
    icon VARCHAR(50) COMMENT '徽章图标',
    type VARCHAR(50) COMMENT '徽章类型(cooking/streak/social等)',
    requirement INT NOT NULL COMMENT '解锁条件(数值)',
    exp INT DEFAULT 0 COMMENT '获得经验值',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='徽章表';

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '食谱ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_recipe (user_id, recipe_id),
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';

-- =====================================================
-- 食谱相关表
-- =====================================================

CREATE TABLE IF NOT EXISTS recipes (
    id VARCHAR(36) PRIMARY KEY COMMENT '食谱唯一标识(UUID)',
    name VARCHAR(100) NOT NULL COMMENT '食谱名称(中文)',
    name_en VARCHAR(100) NOT NULL COMMENT '食谱名称(英文)',
    difficulty VARCHAR(20) NOT NULL COMMENT '难度等级(easy/medium/hard)',
    cuisine VARCHAR(50) NOT NULL COMMENT '菜系分类',
    cook_time INT NOT NULL COMMENT '烹饪时长(分钟)',
    servings INT DEFAULT 4 COMMENT '推荐份数',
    description TEXT COMMENT '食谱简介(中文)',
    description_en TEXT COMMENT '食谱简介(英文)',
    images JSON NOT NULL COMMENT '食谱图片URL数组',
    video_url VARCHAR(255) COMMENT '视频教程URL',
    tags JSON COMMENT '标签数组',
    view_count INT DEFAULT 0 COMMENT '浏览次数',
    favorite_count INT DEFAULT 0 COMMENT '收藏次数',
    share_count INT DEFAULT 0 COMMENT '分享次数',
    status INT DEFAULT 1 COMMENT '状态(1:上架,0:下架)',
    author_id VARCHAR(36) COMMENT '作者ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_cuisine (cuisine),
    INDEX idx_difficulty (difficulty),
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    FULLTEXT idx_search (name, name_en, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食谱表';

CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '食材ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '所属食谱ID',
    name VARCHAR(100) NOT NULL COMMENT '食材名称(中文)',
    name_en VARCHAR(100) NOT NULL COMMENT '食材名称(英文)',
    quantity VARCHAR(50) NOT NULL COMMENT '用量',
    unit VARCHAR(20) NOT NULL COMMENT '单位(克/毫升/个等)',
    substitutes JSON COMMENT '替代食材数组',
    description TEXT COMMENT '食材说明(中文)',
    description_en TEXT COMMENT '食材说明(英文)',
    nutrition JSON COMMENT '营养成分信息',
    is_optional BOOLEAN DEFAULT FALSE COMMENT '是否可选',
    sort_order INT DEFAULT 0 COMMENT '排序顺序',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_recipe_id (recipe_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食材表';

-- 食材百科表：存储常见食材的详细信息
CREATE TABLE IF NOT EXISTS ingredient_encyclopedia (
    id VARCHAR(36) PRIMARY KEY COMMENT '百科ID(UUID)',
    name VARCHAR(100) NOT NULL COMMENT '食材名称(中文)',
    name_en VARCHAR(100) NOT NULL COMMENT '食材名称(英文)',
    name_ja VARCHAR(100) COMMENT '食材名称(日文)',
    name_ko VARCHAR(100) COMMENT '食材名称(韩文)',
    category VARCHAR(50) NOT NULL COMMENT '食材分类',
    description TEXT COMMENT '食材描述(中文)',
    description_en TEXT COMMENT '食材描述(英文)',
    substitutes JSON DEFAULT '[]' COMMENT '替代食材数组',
    nutrition JSON COMMENT '营养成分信息',
    purchase_tips TEXT COMMENT '购买建议',
    storage_tips TEXT COMMENT '储存建议',
    image VARCHAR(255) COMMENT '食材图片',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category (category),
    INDEX idx_name (name),
    FULLTEXT idx_search (name, name_en, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食材百科表';

CREATE TABLE IF NOT EXISTS steps (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '步骤ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '所属食谱ID',
    number INT NOT NULL COMMENT '步骤序号',
    title VARCHAR(200) NOT NULL COMMENT '步骤标题(中文)',
    title_en VARCHAR(200) COMMENT '步骤标题(英文)',
    description TEXT NOT NULL COMMENT '步骤详细说明(中文)',
    description_en TEXT COMMENT '步骤详细说明(英文)',
    image VARCHAR(255) COMMENT '步骤图片URL',
    video_url VARCHAR(255) COMMENT '步骤视频URL',
    tips TEXT COMMENT '小技巧提示(中文)',
    tips_en TEXT COMMENT '小技巧提示(英文)',
    duration INT COMMENT '该步骤预计时长(秒)',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_number (number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='步骤表';

CREATE TABLE IF NOT EXISTS timers (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '计时器ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '所属食谱ID',
    name VARCHAR(100) NOT NULL COMMENT '计时器名称(中文)',
    name_en VARCHAR(100) COMMENT '计时器名称(英文)',
    duration INT NOT NULL COMMENT '时长(秒)',
    step_number INT NOT NULL COMMENT '关联步骤序号',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_step_number (step_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='计时器表';

CREATE TABLE IF NOT EXISTS cooking_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '会话ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '食谱ID',
    current_step INT DEFAULT 1 COMMENT '当前步骤',
    completed_steps JSON DEFAULT '[]' COMMENT '已完成步骤数组',
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '开始时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id),
    UNIQUE KEY unique_user_cooking (user_id, recipe_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='烹饪会话表';

-- =====================================================
-- 社区相关表
-- =====================================================

CREATE TABLE IF NOT EXISTS community_posts (
    id VARCHAR(36) PRIMARY KEY COMMENT '帖子ID(UUID)',
    user_id VARCHAR(36) NOT NULL COMMENT '发布用户ID',
    recipe_id VARCHAR(36) COMMENT '关联食谱ID',
    content TEXT NOT NULL COMMENT '帖子内容',
    images JSON DEFAULT '[]' COMMENT '图片URL数组',
    likes INT DEFAULT 0 COMMENT '点赞数',
    comments INT DEFAULT 0 COMMENT '评论数',
    shares INT DEFAULT 0 COMMENT '分享数',
    status INT DEFAULT 1 COMMENT '状态(1:正常,0:删除)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='社区帖子表';

CREATE TABLE IF NOT EXISTS community_likes (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    post_id VARCHAR(36) NOT NULL COMMENT '帖子ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post_like (user_id, post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_post_id (post_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子点赞表';

-- 评论表：支持多级回复
CREATE TABLE IF NOT EXISTS community_comments (
    id VARCHAR(36) PRIMARY KEY COMMENT '评论ID(UUID)',
    user_id VARCHAR(36) NOT NULL COMMENT '评论用户ID',
    post_id VARCHAR(36) NOT NULL COMMENT '所属帖子ID',
    parent_id VARCHAR(36) COMMENT '父评论ID(回复功能，支持多级嵌套)',
    content TEXT NOT NULL COMMENT '评论内容',
    likes INT DEFAULT 0 COMMENT '点赞数',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES community_comments(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_post_id (post_id),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子评论表';

-- =====================================================
-- 挑战活动表
-- =====================================================

CREATE TABLE IF NOT EXISTS challenges (
    id VARCHAR(36) PRIMARY KEY COMMENT '挑战ID(UUID)',
    name VARCHAR(200) NOT NULL COMMENT '挑战名称(中文)',
    name_en VARCHAR(200) COMMENT '挑战名称(英文)',
    description TEXT COMMENT '挑战描述(中文)',
    description_en TEXT COMMENT '挑战描述(英文)',
    hashtag VARCHAR(100) NOT NULL COMMENT '话题标签',
    image VARCHAR(255) COMMENT '挑战封面图',
    start_date DATETIME NOT NULL COMMENT '开始时间',
    end_date DATETIME NOT NULL COMMENT '结束时间',
    participants INT DEFAULT 0 COMMENT '参与人数',
    featured BOOLEAN DEFAULT FALSE COMMENT '是否推荐',
    status INT DEFAULT 1 COMMENT '状态(1:进行中,0:已结束)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_end_date (end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='挑战活动表';

CREATE TABLE IF NOT EXISTS challenge_participants (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    challenge_id VARCHAR(36) NOT NULL COMMENT '挑战ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    post_id VARCHAR(36) COMMENT '投稿帖子ID',
    status INT DEFAULT 1 COMMENT '状态(1:有效,0:无效)',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '参与时间',
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_challenge_user (challenge_id, user_id),
    INDEX idx_challenge_id (challenge_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='挑战参与表';

-- =====================================================
-- 通知系统表
-- =====================================================

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY COMMENT '通知ID(UUID)',
    user_id VARCHAR(36) NOT NULL COMMENT '接收用户ID',
    type VARCHAR(50) NOT NULL COMMENT '通知类型(like/comment/follow/challenge等)',
    title VARCHAR(200) NOT NULL COMMENT '通知标题',
    content TEXT COMMENT '通知内容',
    data JSON COMMENT '扩展数据(JSON)',
    is_read BOOLEAN DEFAULT FALSE COMMENT '是否已读',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通知表';

-- =====================================================
-- 搜索历史表
-- =====================================================

CREATE TABLE IF NOT EXISTS search_history (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    keyword VARCHAR(200) NOT NULL COMMENT '搜索关键词',
    type VARCHAR(20) DEFAULT 'recipe' COMMENT '搜索类型(recipe/user/ingredient等)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '搜索时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='搜索历史表';

-- =====================================================
-- 私信系统表
-- =====================================================

CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(36) PRIMARY KEY COMMENT '消息ID(UUID)',
    sender_id VARCHAR(36) NOT NULL COMMENT '发送者ID',
    receiver_id VARCHAR(36) NOT NULL COMMENT '接收者ID',
    content TEXT NOT NULL COMMENT '消息内容',
    type VARCHAR(20) DEFAULT 'text' COMMENT '消息类型(text/image/system等)',
    is_read BOOLEAN DEFAULT FALSE COMMENT '是否已读',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='私信表';

-- =====================================================
-- 初始化数据
-- =====================================================

INSERT INTO badges (id, name, name_en, description, description_en, icon, type, requirement, exp) VALUES
('badge-first-cook', '初次下厨', 'First Cooking', '完成第一道菜的烹饪', 'Complete cooking your first dish', '🍳', 'cooking', 1, 10),
('badge-10-dishes', '小试牛刀', 'Getting Started', '累计完成10道菜', 'Complete 10 dishes', '👨‍🍳', 'cooking', 10, 50),
('badge-50-dishes', '厨房达人', 'Kitchen Expert', '累计完成50道菜', 'Complete 50 dishes', '⭐', 'cooking', 50, 200),
('badge-100-dishes', '烹饪大师', 'Master Chef', '累计完成100道菜', 'Complete 100 dishes', '🏆', 'cooking', 100, 500),
('badge-streak-3', '坚持不懈', 'Keep Going', '连续烹饪3天', 'Cook for 3 consecutive days', '🔥', 'streak', 3, 30),
('badge-streak-7', '一周打卡', 'Weekly Warrior', '连续烹饪7天', 'Cook for 7 consecutive days', '💪', 'streak', 7, 100),
('badge-streak-30', '月度坚持', 'Monthly Master', '连续烹饪30天', 'Cook for 30 consecutive days', '🌟', 'streak', 30, 500),
('badge-social-first', '社交达人', 'Social Starter', '发布第一篇帖子', 'Post your first content', '📝', 'social', 1, 10),
('badge-like-100', '人气博主', 'Popular Blogger', '获得100次点赞', 'Receive 100 likes', '❤️', 'social', 100, 100),
('badge-chinese-master', '中餐大师', 'Chinese Master', '完成10道中餐', 'Complete 10 Chinese dishes', '🥢', 'cuisine', 10, 100),
('badge-japanese-master', '日料达人', 'Japanese Expert', '完成10道日料', 'Complete 10 Japanese dishes', '🍣', 'cuisine', 10, 100);

INSERT INTO ingredient_encyclopedia (id, name, name_en, name_ja, name_ko, category, description, description_en, substitutes, nutrition, purchase_tips, storage_tips) VALUES
('ing五花肉', '五花肉', 'Pork Belly', '豚バラ肉', '삼겹살', 'meat', '猪腹部带有脂肪和瘦肉的部位，肥瘦相间，口感最佳', 'Cut of pork from the belly with alternating layers of fat and lean meat', '["里脊肉", "梅花肉"]', '{"calories": 395, "protein": 14.9, "fat": 37.3, "carbs": 0}', '选择肉色红润、脂肪层洁白的部位，避免购买颜色暗沉或脂肪发黄的', '冷藏可保存3-5天，冷冻可保存数月'),
('ing鸡蛋', '鸡蛋', 'Egg', '卵', '달걀', 'protein', '常见的禽蛋，营养丰富，蛋白质含量高', 'Common poultry egg, rich in nutrients and high in protein', '[]', '{"calories": 144, "protein": 13.3, "fat": 11.1, "carbs": 1.1}', '选择蛋壳完整、无裂纹、表面清洁的鸡蛋', '冷藏保存，尖头朝下放置可延长保鲜期'),
('ing番茄', '番茄', 'Tomato', 'トマト', '토마토', 'vegetable', '常见的蔬菜水果，富含维生素C和番茄红素', 'Common vegetable fruit, rich in vitamin C and lycopene', '["圣女果"]', '{"calories": 20, "protein": 0.9, "fat": 0.2, "carbs": 3.9}', '选择颜色鲜艳、饱满圆润、无斑点的番茄', '室温保存即可，冷藏会降低风味'),
('ing大米', '大米', 'Rice', '米', '쌀', 'grain', '主要粮食作物之一，稻谷脱壳后的成品', 'One of the main food crops, the product after rice hulling', '["糙米", "糯米"]', '{"calories": 346, "protein": 7.9, "fat": 0.6, "carbs": 77.2}', '选择米粒饱满、颜色均匀、无杂质的优质大米', '密封保存于阴凉干燥处，避免生虫');

INSERT INTO users (id, email, nickname, avatar, level, exp, title) VALUES
('user-001', 'demo@example.com', '美食达人', 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo', 5, 450, '厨房新星'),
('user-002', 'test@example.com', '吃货小王', 'https://api.dicebear.com/7.x/avataaars/svg?seed=test', 3, 200, '厨房学徒');

INSERT INTO challenges (id, name, name_en, description, description_en, hashtag, start_date, end_date, featured) VALUES
('challenge-001', '周末早餐挑战', 'Weekend Breakfast Challenge', '用早餐开启美好的一天，分享你的周末早餐作品', 'Start your day with a beautiful breakfast, share your weekend breakfast creations', '#周末早餐#', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), TRUE),
('challenge-002', '家乡味道', 'Hometown Flavor', '用美食传承家乡味道，分享你最爱的家乡菜', 'Pass on hometown flavors through food, share your favorite hometown dishes', '#家乡味道#', NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), FALSE);
