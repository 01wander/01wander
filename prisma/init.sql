-- =====================================================
-- 全球风味厨房数据库初始化脚本
-- Global Kitchen Database Initialization Script
-- MySQL 8.x
-- =====================================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS global_kitchen
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE global_kitchen;

-- =====================================================
-- 用户相关表
-- =====================================================

-- 用户表：存储用户基本信息
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
    status INT DEFAULT 1 COMMENT '账号状态(1:正常,0:禁用)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 用户进度表：记录用户完成的食谱
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '食谱ID',
    completed_at DATETIME COMMENT '完成时间',
    rating INT COMMENT '用户评分(1-5星)',
    photo_url VARCHAR(255) COMMENT '成品照片URL',
    notes TEXT COMMENT '用户备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除用户进度',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE COMMENT '级联删除食谱进度',
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_completed_at (completed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户进度表';

-- 用户成就表：记录用户获得的成就徽章
CREATE TABLE IF NOT EXISTS user_badges (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    badge_id VARCHAR(50) NOT NULL COMMENT '徽章ID',
    progress INT DEFAULT 0 COMMENT '当前进度',
    unlocked_at DATETIME COMMENT '解锁时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    UNIQUE KEY unique_user_badge (user_id, badge_id) COMMENT '用户-徽章唯一约束',
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户成就表';

-- 徽章表：定义所有成就徽章
CREATE TABLE IF NOT EXISTS badges (
    id VARCHAR(50) PRIMARY KEY COMMENT '徽章ID',
    name VARCHAR(100) NOT NULL COMMENT '徽章名称',
    description TEXT COMMENT '徽章描述',
    icon VARCHAR(50) COMMENT '徽章图标',
    type VARCHAR(50) COMMENT '徽章类型(cooking/streak/social等)',
    requirement INT NOT NULL COMMENT '解锁条件(数值)',
    exp INT DEFAULT 0 COMMENT '获得经验值',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='徽章表';

-- 收藏表：用户收藏的食谱
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '食谱ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE COMMENT '级联删除',
    UNIQUE KEY unique_user_recipe (user_id, recipe_id) COMMENT '用户-食谱唯一约束',
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';

-- =====================================================
-- 食谱相关表
-- =====================================================

-- 食谱表：存储食谱基本信息
CREATE TABLE IF NOT EXISTS recipes (
    id VARCHAR(36) PRIMARY KEY COMMENT '食谱唯一标识(UUID)',
    name VARCHAR(100) NOT NULL COMMENT '食谱名称(中文)',
    name_en VARCHAR(100) NOT NULL COMMENT '食谱名称(英文)',
    difficulty VARCHAR(20) NOT NULL COMMENT '难度等级(easy/medium/hard)',
    cuisine VARCHAR(50) NOT NULL COMMENT '菜系分类',
    cook_time INT NOT NULL COMMENT '烹饪时长(分钟)',
    servings INT DEFAULT 4 COMMENT '推荐份数',
    description TEXT COMMENT '食谱简介',
    images JSON NOT NULL COMMENT '食谱图片URL数组',
    video_url VARCHAR(255) COMMENT '视频教程URL',
    tags JSON COMMENT '标签数组',
    view_count INT DEFAULT 0 COMMENT '浏览次数',
    favorite_count INT DEFAULT 0 COMMENT '收藏次数',
    status INT DEFAULT 1 COMMENT '状态(1:上架,0:下架)',
    author_id VARCHAR(36) COMMENT '作者ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_cuisine (cuisine),
    INDEX idx_difficulty (difficulty),
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_view_count (view_count),
    FULLTEXT idx_search (name, name_en, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食谱表';

-- 食材表：食谱的食材列表
CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '食材ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '所属食谱ID',
    name VARCHAR(100) NOT NULL COMMENT '食材名称(中文)',
    name_en VARCHAR(100) NOT NULL COMMENT '食材名称(英文)',
    quantity VARCHAR(50) NOT NULL COMMENT '用量',
    unit VARCHAR(20) NOT NULL COMMENT '单位(克/毫升/个等)',
    substitutes JSON COMMENT '替代食材数组',
    description TEXT COMMENT '食材说明',
    is_optional BOOLEAN DEFAULT FALSE COMMENT '是否可选',
    sort_order INT DEFAULT 0 COMMENT '排序顺序',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE COMMENT '级联删除',
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='食材表';

-- 步骤表：食谱的制作步骤
CREATE TABLE IF NOT EXISTS steps (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '步骤ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '所属食谱ID',
    number INT NOT NULL COMMENT '步骤序号',
    title VARCHAR(200) NOT NULL COMMENT '步骤标题',
    description TEXT NOT NULL COMMENT '步骤详细说明',
    image VARCHAR(255) COMMENT '步骤图片URL',
    video_url VARCHAR(255) COMMENT '步骤视频URL',
    tips TEXT COMMENT '小技巧提示',
    duration INT COMMENT '该步骤预计时长(秒)',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE COMMENT '级联删除',
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_number (number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='步骤表';

-- 计时器表：食谱中的计时器配置
CREATE TABLE IF NOT EXISTS timers (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '计时器ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '所属食谱ID',
    name VARCHAR(100) NOT NULL COMMENT '计时器名称',
    duration INT NOT NULL COMMENT '时长(秒)',
    step_number INT NOT NULL COMMENT '关联步骤序号',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE COMMENT '级联删除',
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_step_number (step_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='计时器表';

-- 烹饪会话表：记录用户当前烹饪状态
CREATE TABLE IF NOT EXISTS cooking_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '会话ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    recipe_id VARCHAR(36) NOT NULL COMMENT '食谱ID',
    current_step INT DEFAULT 1 COMMENT '当前步骤',
    completed_steps JSON DEFAULT '[]' COMMENT '已完成步骤数组',
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '开始时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE COMMENT '级联删除',
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id),
    UNIQUE KEY unique_user_cooking (user_id, recipe_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='烹饪会话表';

-- =====================================================
-- 社区相关表
-- =====================================================

-- 社区帖子表：用户发布的美食动态
CREATE TABLE IF NOT EXISTS community_posts (
    id VARCHAR(36) PRIMARY KEY COMMENT '帖子ID(UUID)',
    user_id VARCHAR(36) NOT NULL COMMENT '发布用户ID',
    recipe_id VARCHAR(36) COMMENT '关联食谱ID',
    content TEXT NOT NULL COMMENT '帖子内容',
    images JSON DEFAULT '[]' COMMENT '图片URL数组',
    likes INT DEFAULT 0 COMMENT '点赞数',
    comments INT DEFAULT 0 COMMENT '评论数',
    status INT DEFAULT 1 COMMENT '状态(1:正常,0:删除)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL COMMENT '食谱删除时置空',
    INDEX idx_user_id (user_id),
    INDEX idx_recipe_id (recipe_id),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='社区帖子表';

-- 帖子点赞表：记录用户点赞关系
CREATE TABLE IF NOT EXISTS community_likes (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    post_id VARCHAR(36) NOT NULL COMMENT '帖子ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE COMMENT '级联删除',
    UNIQUE KEY unique_user_post_like (user_id, post_id) COMMENT '用户-帖子唯一约束',
    INDEX idx_user_id (user_id),
    INDEX idx_post_id (post_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子点赞表';

-- 帖子评论表：用户对帖子的评论
CREATE TABLE IF NOT EXISTS community_comments (
    id VARCHAR(36) PRIMARY KEY COMMENT '评论ID(UUID)',
    user_id VARCHAR(36) NOT NULL COMMENT '评论用户ID',
    post_id VARCHAR(36) NOT NULL COMMENT '所属帖子ID',
    content TEXT NOT NULL COMMENT '评论内容',
    parent_id VARCHAR(36) COMMENT '父评论ID(回复功能)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE COMMENT '级联删除',
    INDEX idx_user_id (user_id),
    INDEX idx_post_id (post_id),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='帖子评论表';

-- =====================================================
-- 挑战活动表
-- =====================================================

-- 挑战活动表：每周话题挑战
CREATE TABLE IF NOT EXISTS challenges (
    id VARCHAR(36) PRIMARY KEY COMMENT '挑战ID(UUID)',
    name VARCHAR(200) NOT NULL COMMENT '挑战名称',
    description TEXT COMMENT '挑战描述',
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

-- 挑战参与表：记录用户参与挑战
CREATE TABLE IF NOT EXISTS challenge_participants (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    challenge_id VARCHAR(36) NOT NULL COMMENT '挑战ID',
    user_id VARCHAR(36) NOT NULL COMMENT '用户ID',
    post_id VARCHAR(36) COMMENT '投稿帖子ID',
    status INT DEFAULT 1 COMMENT '状态(1:有效,0:无效)',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '参与时间',
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE COMMENT '级联删除',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    UNIQUE KEY unique_challenge_user (challenge_id, user_id) COMMENT '挑战-用户唯一约束',
    INDEX idx_challenge_id (challenge_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='挑战参与表';

-- =====================================================
-- 通知系统表
-- =====================================================

-- 通知表：用户通知消息
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY COMMENT '通知ID(UUID)',
    user_id VARCHAR(36) NOT NULL COMMENT '接收用户ID',
    type VARCHAR(50) NOT NULL COMMENT '通知类型',
    title VARCHAR(200) NOT NULL COMMENT '通知标题',
    content TEXT COMMENT '通知内容',
    data JSON COMMENT '扩展数据(JSON)',
    is_read BOOLEAN DEFAULT FALSE COMMENT '是否已读',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '级联删除',
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通知表';

-- =====================================================
-- 初始化数据
-- =====================================================

-- 插入示例徽章数据
INSERT INTO badges (id, name, description, icon, type, requirement, exp) VALUES
    ('badge-first-cook', '初次下厨', '完成第一道菜的烹饪', '🍳', 'cooking', 1, 10),
    ('badge-10-dishes', '小试牛刀', '累计完成10道菜', '👨‍🍳', 'cooking', 10, 50),
    ('badge-50-dishes', '厨房达人', '累计完成50道菜', '⭐', 'cooking', 50, 200),
    ('badge-100-dishes', '烹饪大师', '累计完成100道菜', '🏆', 'cooking', 100, 500),
    ('badge-streak-3', '坚持不懈', '连续烹饪3天', '🔥', 'streak', 3, 30),
    ('badge-streak-7', '一周打卡', '连续烹饪7天', '💪', 'streak', 7, 100),
    ('badge-streak-30', '月度坚持', '连续烹饪30天', '🌟', 'streak', 30, 500),
    ('badge-social-first', '社交达人', '发布第一篇帖子', '📝', 'social', 1, 10),
    ('badge-like-100', '人气博主', '获得100次点赞', '❤️', 'social', 100, 100),
    ('badge-chinese-master', '中餐大师', '完成10道中餐', '🥢', 'cuisine', 10, 100),
    ('badge-japanese-master', '日料达人', '完成10道日料', '🍣', 'cuisine', 10, 100);

-- 插入示例用户数据
INSERT INTO users (id, email, nickname, avatar, level, exp, title) VALUES
    ('user-001', 'demo@example.com', '美食达人', 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo', 5, 450, '厨房新星'),
    ('user-002', 'test@example.com', '吃货小王', 'https://api.dicebear.com/7.x/avataaars/svg?seed=test', 3, 200, '厨房学徒');

-- 插入示例进度数据
INSERT INTO user_progress (user_id, recipe_id, rating, completed_at) VALUES
    ('user-001', 'recipe-001', 5, NOW()),
    ('user-001', 'recipe-002', 4, NOW()),
    ('user-002', 'recipe-001', 5, NOW());

-- 插入示例社区帖子
INSERT INTO community_posts (id, user_id, content, images, likes, comments) VALUES
    ('post-001', 'user-001', '今天尝试做了红烧肉，味道超棒！推荐给大家试试～', '["https://picsum.photos/400/300?random=1"]', 128, 32),
    ('post-002', 'user-002', '周末做了披萨，卖相还不错吧？', '["https://picsum.photos/400/300?random=2"]', 89, 15),
    ('post-003', 'user-001', '第一次尝试做日式味噌汤，成功！🥣', '["https://picsum.photos/400/300?random=3"]', 256, 45);

-- 插入示例挑战
INSERT INTO challenges (id, name, description, hashtag, start_date, end_date, featured) VALUES
    ('challenge-001', '周末早餐挑战', '用早餐开启美好的一天，分享你的周末早餐作品', '#周末早餐#', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), TRUE),
    ('challenge-002', '家乡味道', '用美食传承家乡味道，分享你最爱的家乡菜', '#家乡味道#', NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), FALSE);

-- =====================================================
-- 存储过程：更新食谱统计
-- =====================================================

DELIMITER //

-- 更新食谱浏览次数
CREATE PROCEDURE IF NOT EXISTS sp_update_recipe_views(IN p_recipe_id VARCHAR(36))
BEGIN
    UPDATE recipes SET view_count = view_count + 1 WHERE id = p_recipe_id;
END //

-- 更新食谱收藏次数
CREATE PROCEDURE IF NOT EXISTS sp_update_recipe_favorites(IN p_recipe_id VARCHAR(36), IN p_delta INT)
BEGIN
    UPDATE recipes SET favorite_count = favorite_count + p_delta WHERE id = p_recipe_id;
END //

-- 更新挑战参与人数
CREATE PROCEDURE IF NOT EXISTS sp_update_challenge_participants(IN p_challenge_id VARCHAR(36))
BEGIN
    UPDATE challenges
    SET participants = (SELECT COUNT(*) FROM challenge_participants WHERE challenge_id = p_challenge_id AND status = 1)
    WHERE id = p_challenge_id;
END //

-- 更新帖子统计
CREATE PROCEDURE IF NOT EXISTS sp_update_post_stats(IN p_post_id VARCHAR(36))
BEGIN
    UPDATE community_posts p SET
        likes = (SELECT COUNT(*) FROM community_likes WHERE post_id = p_post_id),
        comments = (SELECT COUNT(*) FROM community_comments WHERE post_id = p_post_id)
    WHERE p.id = p_post_id;
END //

DELIMITER ;

-- =====================================================
-- 视图定义
-- =====================================================

-- 用户成就视图
CREATE OR REPLACE VIEW v_user_achievements AS
SELECT
    u.id AS user_id,
    u.nickname,
    u.level,
    u.exp,
    COUNT(up.id) AS completed_recipes,
    COUNT(DISTINCT CASE WHEN ub.unlocked_at IS NOT NULL THEN ub.badge_id END) AS earned_badges
FROM users u
LEFT JOIN user_progress up ON u.id = up.user_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
GROUP BY u.id;

-- 热门食谱视图
CREATE OR REPLACE VIEW v_popular_recipes AS
SELECT
    r.*,
    (r.view_count + r.favorite_count * 5) AS hot_score
FROM recipes r
WHERE r.status = 1
ORDER BY hot_score DESC;

-- 用户活跃度视图
CREATE OR REPLACE VIEW v_user_activity AS
SELECT
    u.id AS user_id,
    u.nickname,
    COUNT(DISTINCT cp.id) AS posts_count,
    SUM(cp.likes) AS total_likes,
    COUNT(DISTINCT up.recipe_id) AS recipes_completed
FROM users u
LEFT JOIN community_posts cp ON u.id = cp.user_id
LEFT JOIN user_progress up ON u.id = up.user_id
GROUP BY u.id;

-- =====================================================
-- 事件定义 (可选，需开启事件调度器)
-- =====================================================

-- SET GLOBAL event_scheduler = ON;

-- 每日清理过期挑战参与记录
-- CREATE EVENT IF NOT EXISTS evt_cleanup_expired_challenges
-- ON SCHEDULE EVERY 1 DAY
-- DO
-- BEGIN
--     UPDATE challenges SET status = 0 WHERE end_date < NOW() AND status = 1;
-- END //
