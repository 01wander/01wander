-- =====================================================
-- 食谱种子数据
-- Recipe Seed Data
-- =====================================================

USE global_kitchen;

-- =====================================================
-- 中餐食谱
-- =====================================================

INSERT INTO recipes (id, name, name_en, difficulty, cuisine, cook_time, servings, description, images, video_url, tags, view_count, favorite_count) VALUES
('recipe-001', '红烧肉', 'Braised Pork Belly', 'medium', 'chinese', 90, 4, '经典中式红烧肉，肥而不腻，入口即化，是一道非常下饭的家常菜。', '["https://picsum.photos/800/600?random=101"]', NULL, '["下饭菜", "硬菜", "宴客"]', 15230, 892),
('recipe-002', '宫保鸡丁', 'Kung Pao Chicken', 'easy', 'chinese', 30, 2, '川菜经典，鸡肉嫩滑，花生酥脆，酸甜微辣，口感丰富。', '["https://picsum.photos/800/600?random=102"]', NULL, '["川菜", "快手菜", "下酒"]', 12890, 654),
('recipe-003', '麻婆豆腐', 'Mapo Tofu', 'easy', 'chinese', 25, 3, '四川名菜，豆腐嫩滑，麻辣鲜香，是一道非常下饭的川味家常菜。', '["https://picsum.photos/800/600?random=103"]', NULL, '["川菜", "素菜", "快手"]', 9834, 432),
('recipe-004', '清蒸鲈鱼', 'Steamed Sea Bass', 'medium', 'chinese', 40, 4, '粤菜经典，保留了鱼肉最鲜美的味道，清淡爽口，营养丰富。', '["https://picsum.photos/800/600?random=104"]', NULL, '["粤菜", "海鲜", "清淡"]', 7654, 321),
('recipe-005', '番茄炒蛋', 'Scrambled Eggs with Tomato', 'easy', 'chinese', 15, 2, '家常菜中的经典，酸甜可口，简单易学，是很多人的入门菜。', '["https://picsum.photos/800/600?random=105"]', NULL, '["家常菜", "快手菜", "下饭"]', 25678, 1234);

-- =====================================================
-- 日料食谱
-- =====================================================

INSERT INTO recipes (id, name, name_en, difficulty, cuisine, cook_time, servings, description, images, video_url, tags, view_count, favorite_count) VALUES
('recipe-101', '日式味噌汤', 'Miso Soup', 'easy', 'japanese', 20, 4, '日本传统汤品，味道鲜美，营养丰富，是日式料理的经典配角。', '["https://picsum.photos/800/600?random=201"]', NULL, '["日料", "汤品", "健康"]', 8765, 543),
('recipe-102', '寿司', 'Sushi', 'hard', 'japanese', 60, 4, '日本代表性美食，米饭与海鲜的完美结合，制作讲究，需要耐心。', '["https://picsum.photos/800/600?random=202"]', NULL, '["日料", "特色", "宴客"]', 15432, 987),
('recipe-103', '照烧鸡腿', 'Teriyaki Chicken', 'easy', 'japanese', 35, 3, '日式照烧风味，鸡肉鲜嫩多汁，酱汁浓郁，非常下饭。', '["https://picsum.photos/800/600?random=203"]', NULL, '["日料", "快手菜", "下饭"]', 11234, 765),
('recipe-104', '日式咖喱饭', 'Japanese Curry Rice', 'easy', 'japanese', 45, 4, '日式风味咖喱，口感温和，蔬菜丰富，是很受欢迎的家常菜。', '["https://picsum.photos/800/600?random=204"]', NULL, '["日料", "主食", "快手"]', 9876, 654);

-- =====================================================
-- 意大利料理
-- =====================================================

INSERT INTO recipes (id, name, name_en, difficulty, cuisine, cook_time, servings, description, images, video_url, tags, view_count, favorite_count) VALUES
('recipe-201', '意式番茄面', 'Spaghetti with Tomato Sauce', 'easy', 'italian', 30, 2, '经典的意大利面料理，番茄酱汁酸甜开胃，简单却美味。', '["https://picsum.photos/800/600?random=301"]', NULL, '["意式", "主食", "快手"]', 13456, 876),
('recipe-202', '玛格丽特披萨', 'Margherita Pizza', 'medium', 'italian', 90, 4, '经典的意式披萨，饼底薄脆，配料简单却完美，是披萨的鼻祖。', '["https://picsum.photos/800/600?random=302"]', NULL, '["意式", "聚会", "特色"]', 16789, 1098),
('recipe-203', '奶油培根意面', 'Carbonara', 'medium', 'italian', 35, 2, '罗马经典意面，奶油与培根的完美结合，浓郁奶香让人回味无穷。', '["https://picsum.photos/800/600?random=303"]', NULL, '["意式", "主食", "经典"]', 12345, 789);

-- =====================================================
-- 韩式料理
-- =====================================================

INSERT INTO recipes (id, name, name_en, difficulty, cuisine, cook_time, servings, description, images, video_url, tags, view_count, favorite_count) VALUES
('recipe-301', '韩式辣炒年糕', 'Korean Spicy Rice Cakes', 'easy', 'korean', 25, 3, '韩国街头小吃，软糯的年糕配以辣酱，甜辣可口。', '["https://picsum.photos/800/600?random=401"]', NULL, '["韩式", "小吃", "快手"]', 11234, 678),
('recipe-302', '韩式烤肉', 'Korean BBQ', 'medium', 'korean', 45, 4, '韩国经典美食，五花肉腌渍后烤制，包上生菜和酱料食用。', '["https://picsum.photos/800/600?random=402"]', NULL, '["韩式", "聚会", "特色"]', 18976, 1234),
('recipe-303', '韩式拌饭', 'Bibimbap', 'medium', 'korean', 40, 2, '韩国传统石锅拌饭，五彩缤纷的配菜与米饭混合，营养丰富。', '["https://picsum.photos/800/600?random=403"]', NULL, '["韩式", "主食", "健康"]', 14567, 987);

-- =====================================================
-- 法式料理
-- =====================================================

INSERT INTO recipes (id, name, name_en, difficulty, cuisine, cook_time, servings, description, images, video_url, tags, view_count, favorite_count) VALUES
('recipe-401', '法式洋葱汤', 'French Onion Soup', 'medium', 'french', 60, 4, '经典法式汤品，洋葱慢炒后加入高汤，顶层覆盖芝士焗烤。', '["https://picsum.photos/800/600?random=501"]', NULL, '["法式", "汤品", "暖胃"]', 8765, 543),
('recipe-402', '红酒炖牛肉', 'Beef Bourguignon', 'hard', 'french', 180, 6, '法国经典菜肴，用红酒慢炖牛肉，肉质软烂，汤汁浓郁。', '["https://picsum.photos/800/600?random=502"]', NULL, '["法式", "硬菜", "宴客"]', 9876, 765);

-- =====================================================
-- 泰国料理
-- =====================================================

INSERT INTO recipes (id, name, name_en, difficulty, cuisine, cook_time, servings, description, images, video_url, tags, view_count, favorite_count) VALUES
('recipe-501', '泰式绿咖喱', 'Thai Green Curry', 'medium', 'thai', 40, 4, '泰国经典咖喱，香气浓郁，椰奶的醇厚与绿咖喱的辣味完美结合。', '["https://picsum.photos/800/600?random=601"]', NULL, '["泰式", "咖喱", "辛辣"]', 7654, 432),
('recipe-502', '冬阴功汤', 'Tom Yum Soup', 'medium', 'thai', 35, 4, '泰国酸辣汤的代表，酸辣开胃，虾肉鲜嫩，充满异国风情。', '["https://picsum.photos/800/600?random=602"]', NULL, '["泰式", "汤品", "开胃"]', 13456, 876);

-- =====================================================
-- 食材数据
-- =====================================================

-- 红烧肉食材
INSERT INTO ingredients (recipe_id, name, name_en, quantity, unit, substitutes, description, is_optional) VALUES
('recipe-001', '五花肉', 'Pork Belly', '500', '克', '["里脊肉"]', '选用带皮的猪五花肉', FALSE),
('recipe-001', '冰糖', 'Rock Sugar', '30', '克', '["白砂糖"]', '用于炒糖色', FALSE),
('recipe-001', '生抽', 'Light Soy Sauce', '30', '毫升', '[]', '提鲜上色', FALSE),
('recipe-001', '老抽', 'Dark Soy Sauce', '15', '毫升', '[]', '主要用于上色', FALSE),
('recipe-001', '料酒', 'Cooking Wine', '20', '毫升', '["啤酒"]', '去腥增香', FALSE),
('recipe-001', '八角', 'Star Anise', '2', '个', '[]', '香料', FALSE),
('recipe-001', '桂皮', 'Cinnamon', '1', '小块', '[]', '香料', FALSE),
('recipe-001', '葱姜', 'Scallion and Ginger', '适量', '', '[]', '去腥', FALSE);

-- 宫保鸡丁食材
INSERT INTO ingredients (recipe_id, name, name_en, quantity, unit, substitutes, description, is_optional) VALUES
('recipe-002', '鸡胸肉', 'Chicken Breast', '300', '克', '["鸡腿肉"]', '切成丁状', FALSE),
('recipe-002', '花生米', 'Peanuts', '50', '克', '["腰果"]', '炸香备用', FALSE),
('recipe-002', '干辣椒', 'Dried Chilies', '10', '个', '[]', '剪成段', FALSE),
('recipe-002', '花椒', 'Sichuan Peppercorn', '5', '克', '[]', '提麻', FALSE),
('recipe-002', '葱姜蒜', 'Green Onion, Ginger, Garlic', '适量', '', '[]', '切碎', FALSE);

-- 番茄炒蛋食材
INSERT INTO ingredients (recipe_id, name, name_en, quantity, unit, substitutes, description, is_optional) VALUES
('recipe-005', '番茄', 'Tomato', '3', '个', '[]', '切成块状', FALSE),
('recipe-005', '鸡蛋', 'Eggs', '3', '个', '[]', '打散备用', FALSE),
('recipe-005', '白糖', 'Sugar', '10', '克', '[]', '中和酸味', FALSE),
('recipe-005', '盐', 'Salt', '3', '克', '[]', '调味', FALSE),
('recipe-005', '葱花', 'Scallion', '适量', '', '[]', '装饰', TRUE);

-- =====================================================
-- 步骤数据
-- =====================================================

-- 红烧肉步骤
INSERT INTO steps (recipe_id, number, title, description, tips, duration) VALUES
('recipe-001', 1, '处理五花肉', '将五花肉切成3厘米见方的块，冷水下锅焯水去血沫，捞出洗净备用。', '焯水时加几片姜和料酒效果更好', 15),
('recipe-001', 2, '炒糖色', '锅中放少许油，加入冰糖，小火慢慢炒至糖色变深并起泡。', '糖色不要炒过头，会发苦', 10),
('recipe-001', 3, '煸炒五花肉', '下入五花肉块翻炒均匀，让每块肉都裹上糖色。', '火候不要太大', 5),
('recipe-001', 4, '加入调料', '加入料酒、生抽、老抽、八角、桂皮和葱姜，翻炒均匀。', '可根据口味调整酱油用量', 3),
('recipe-001', 5, '炖煮', '加入适量开水没过肉块，大火烧开后转小火炖煮60分钟。', '中途不要掀锅盖', 60),
('recipe-001', 6, '收汁', '打开锅盖，大火收汁至汤汁浓稠即可出锅。', '收到喜欢的浓稠度即可', 10);

-- 番茄炒蛋步骤
INSERT INTO steps (recipe_id, number, title, description, tips, duration) VALUES
('recipe-005', 1, '打散鸡蛋', '将鸡蛋打入碗中，加少许盐搅拌均匀。', '可以加几滴料酒去腥', 2),
('recipe-005', 2, '炒鸡蛋', '热锅凉油，倒入蛋液，快速翻炒至凝固，盛出备用。', '鸡蛋不要炒太老', 3),
('recipe-005', 3, '炒番茄', '锅中再加少许油，放入番茄块翻炒出汁。', '可以加少许水帮助出汁', 5),
('recipe-005', 4, '调味', '加入白糖和盐调味，翻炒均匀。', '糖可以中和番茄的酸味', 2),
('recipe-005', 5, '混合出锅', '倒入炒好的鸡蛋，翻炒均匀后撒上葱花即可出锅。', '快速翻炒几下即可', 2);

-- =====================================================
-- 计时器数据
-- =====================================================

-- 照烧鸡腿计时器
INSERT INTO timers (recipe_id, name, duration, step_number) VALUES
('recipe-103', '煎制第一面', 180, 3),
('recipe-103', '煎制第二面', 150, 3),
('recipe-103', '焖煮', 600, 4);

-- 红酒炖牛肉计时器
INSERT INTO timers (recipe_id, name, duration, step_number) VALUES
('recipe-402', '煸炒牛肉', 300, 2),
('recipe-402', '慢炖时间', 7200, 5);
