import { Recipe, User, Post, Badge, Challenge } from '../types';

export const mockRecipes: Recipe[] = [
  {
    _id: '1',
    name: '番茄炒蛋',
    nameEn: 'Tomato Scrambled Eggs',
    difficulty: 'easy',
    cuisine: 'chinese',
    cookTime: 10,
    servings: 2,
    ingredients: [
      { name: '番茄', nameEn: 'Tomato', quantity: '2', unit: '个', description: '新鲜番茄，中等大小' },
      { name: '鸡蛋', nameEn: 'Egg', quantity: '3', unit: '个' },
      { name: '小葱', nameEn: 'Scallion', quantity: '1', unit: '根' },
      { name: '盐', nameEn: 'Salt', quantity: '1', unit: '小勺' },
      { name: '糖', nameEn: 'Sugar', quantity: '1/2', unit: '小勺' }
    ],
    steps: [
      {
        number: 1,
        title: '准备食材',
        description: '番茄洗净切块，鸡蛋打入碗中打散，小葱切葱花备用。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fresh%20tomatoes%20cut%20into%20chunks%20and%20beaten%20eggs%20in%20bowl%20on%20kitchen%20counter&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '炒鸡蛋',
        description: '热锅倒油，油热后倒入蛋液，快速翻炒至凝固盛出备用。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=scrambled%20eggs%20cooking%20in%20wok%20with%20golden%20color&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '炒番茄',
        description: '锅中留少许油，放入番茄块翻炒，加入盐和糖调味。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=tomatoes%20stir%20frying%20in%20wok%20with%20red%20juice&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '混合出锅',
        description: '倒入炒好的鸡蛋，翻炒均匀后撒入葱花即可出锅。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=tomato%20scrambled%20eggs%20dish%20on%20white%20plate%20with%20scallion%20garnish&image_size=landscape_4_3'
      }
    ],
    timers: [],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=delicious%20tomato%20scrambled%20eggs%20chinese%20dish%20on%20white%20plate%20food%20photography&image_size=landscape_4_3'
    ],
    description: '经典的家常快手菜，酸甜可口，营养丰富。',
    tags: ['家常', '快手', '素食'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    _id: '2',
    name: '红烧肉',
    nameEn: 'Braised Pork Belly',
    difficulty: 'medium',
    cuisine: 'chinese',
    cookTime: 45,
    servings: 4,
    ingredients: [
      { name: '五花肉', nameEn: 'Pork Belly', quantity: '500', unit: '克' },
      { name: '姜', nameEn: 'Ginger', quantity: '10', unit: '克' },
      { name: '葱', nameEn: 'Green Onion', quantity: '2', unit: '根' },
      { name: '八角', nameEn: 'Star Anise', quantity: '2', unit: '个' },
      { name: '桂皮', nameEn: 'Cinnamon', quantity: '1', unit: '小段' },
      { name: '冰糖', nameEn: 'Rock Sugar', quantity: '30', unit: '克' },
      { name: '生抽', nameEn: 'Soy Sauce', quantity: '2', unit: '大勺' },
      { name: '老抽', nameEn: 'Dark Soy Sauce', quantity: '1', unit: '小勺' },
      { name: '料酒', nameEn: 'Cooking Wine', quantity: '2', unit: '大勺' }
    ],
    steps: [
      {
        number: 1,
        title: '焯水',
        description: '五花肉切块，冷水下锅焯水，捞出沥干。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pork%20belly%20chunks%20boiling%20in%20pot%20for%20blanching&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '炒糖色',
        description: '锅中放少许油，小火融化冰糖至琥珀色。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sugar%20caramelizing%20in%20wok%20turning%20amber%20color&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '煎肉',
        description: '放入五花肉块翻炒，煎至表面金黄。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pork%20belly%20browning%20in%20wok%20with%20caramelized%20sugar&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '调味炖煮',
        description: '加入葱姜八角桂皮爆香，加料酒、生抽、老抽翻炒均匀。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=braised%20pork%20belly%20with%20spices%20and%20soy%20sauce%20in%20wok&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '慢炖',
        description: '加入开水没过肉，大火烧开转小火慢炖30分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=braised%20pork%20belly%20simmering%20in%20pot%20with%20braising%20liquid&image_size=landscape_4_3'
      },
      {
        number: 6,
        title: '收汁出锅',
        description: '大火收汁至浓稠，撒葱花即可出锅。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=braised%20pork%20belly%20with%20glossy%20sauce%20on%20white%20plate%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '慢炖', duration: 1800, stepNumber: 5 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20braised%20pork%20belly%20hong%20shao%20rou%20glossy%20dark%20sauce%20food%20photography&image_size=landscape_4_3'
    ],
    description: '色泽红亮，肥而不腻，入口即化的经典中式菜肴。',
    tags: ['经典', '宴客', '节日'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    _id: '3',
    name: '日式咖喱饭',
    nameEn: 'Japanese Curry Rice',
    difficulty: 'medium',
    cuisine: 'japanese',
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: '鸡肉', nameEn: 'Chicken', quantity: '300', unit: '克' },
      { name: '胡萝卜', nameEn: 'Carrot', quantity: '1', unit: '根' },
      { name: '土豆', nameEn: 'Potato', quantity: '1', unit: '个' },
      { name: '洋葱', nameEn: 'Onion', quantity: '1', unit: '个' },
      { name: '日式咖喱块', nameEn: 'Japanese Curry Cubes', quantity: '6', unit: '块' },
      { name: '米饭', nameEn: 'Rice', quantity: '4', unit: '碗' }
    ],
    steps: [
      {
        number: 1,
        title: '准备食材',
        description: '鸡肉切块，胡萝卜和土豆去皮切块，洋葱切丝。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chicken%20carrot%20potato%20onion%20cut%20into%20chunks%20for%20curry&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '炒香食材',
        description: '锅中倒油，先炒香洋葱，再加入鸡肉翻炒至变色。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=onions%20and%20chicken%20sauteing%20in%20pot%20for%20curry&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '炖煮蔬菜',
        description: '加入胡萝卜和土豆翻炒，加入开水没过食材，煮10分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=curry%20vegetables%20simmering%20in%20pot%20with%20broth&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '加入咖喱块',
        description: '关火，加入咖喱块搅拌至完全融化，再开小火煮5分钟至浓稠。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=japanese%20curry%20cubes%20melting%20into%20sauce%20in%20pot&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '装盘',
        description: '米饭盛入盘中，浇上咖喱酱汁即可。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=japanese%20curry%20rice%20with%20chicken%20and%20vegetables%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '煮蔬菜', duration: 600, stepNumber: 3 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=japanese%20curry%20rice%20with%20chicken%20carrot%20potato%20food%20photography&image_size=landscape_4_3'
    ],
    description: '浓郁香甜的日式咖喱，搭配米饭堪称完美。',
    tags: ['日式', '家常', '儿童'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    _id: '4',
    name: '韩式炸鸡',
    nameEn: 'Korean Fried Chicken',
    difficulty: 'hard',
    cuisine: 'korean',
    cookTime: 60,
    servings: 4,
    ingredients: [
      { name: '鸡腿肉', nameEn: 'Chicken Leg', quantity: '800', unit: '克' },
      { name: '面粉', nameEn: 'Flour', quantity: '150', unit: '克' },
      { name: '玉米淀粉', nameEn: 'Corn Starch', quantity: '150', unit: '克' },
      { name: '鸡蛋', nameEn: 'Egg', quantity: '2', unit: '个' },
      { name: '牛奶', nameEn: 'Milk', quantity: '100', unit: '毫升' },
      { name: '韩式辣酱', nameEn: 'Gochujang', quantity: '3', unit: '大勺' },
      { name: '蜂蜜', nameEn: 'Honey', quantity: '2', unit: '大勺' },
      { name: '酱油', nameEn: 'Soy Sauce', quantity: '1', unit: '大勺' },
      { name: '大蒜', nameEn: 'Garlic', quantity: '3', unit: '瓣' }
    ],
    steps: [
      {
        number: 1,
        title: '腌制鸡肉',
        description: '鸡肉切块，加入盐、胡椒粉、蒜末、少许酱油腌制30分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=raw%20chicken%20pieces%20marinating%20in%20bowl%20with%20garlic%20and%20soy%20sauce&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '调面糊',
        description: '面粉和玉米淀粉混合，加入鸡蛋和牛奶调成稠面糊。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=thick%20batter%20mixture%20in%20bowl%20for%20fried%20chicken&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '裹粉',
        description: '鸡肉块先裹一层干粉，再裹面糊，确保均匀覆盖。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chicken%20pieces%20coated%20in%20batter%20ready%20for%20frying&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '初炸',
        description: '油温170度，放入鸡块炸5-6分钟至金黄捞出。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chicken%20pieces%20frying%20in%20hot%20oil%20in%20wok&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '复炸',
        description: '油温升至190度，再次放入鸡块炸1-2分钟至酥脆。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20crispy%20fried%20chicken%20pieces%20being%20removed%20from%20oil&image_size=landscape_4_3'
      },
      {
        number: 6,
        title: '调酱汁',
        description: '韩式辣酱、蜂蜜、酱油、蒜末混合加热至浓稠。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=korean%20spicy%20sauce%20being%20mixed%20in%20small%20pan&image_size=landscape_4_3'
      },
      {
        number: 7,
        title: '裹酱',
        description: '炸好的鸡肉放入酱汁中拌匀，撒芝麻和葱花。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=korean%20fried%20chicken%20coated%20in%20spicy%20gochujang%20sauce&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '腌制', duration: 1800, stepNumber: 1 },
      { id: 't2', name: '初炸', duration: 360, stepNumber: 4 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=korean%20fried%20chicken%20with%20spicy%20sauce%20and%20sesame%20seeds%20food%20photography&image_size=landscape_4_3'
    ],
    description: '外酥里嫩的韩式炸鸡，配上甜辣酱汁，让人欲罢不能。',
    tags: ['韩式', '小吃', '派对'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    _id: '5',
    name: '意大利肉酱面',
    nameEn: 'Spaghetti Bolognese',
    difficulty: 'medium',
    cuisine: 'italian',
    cookTime: 40,
    servings: 4,
    ingredients: [
      { name: '意大利面', nameEn: 'Spaghetti', quantity: '200', unit: '克' },
      { name: '牛肉末', nameEn: 'Ground Beef', quantity: '300', unit: '克' },
      { name: '番茄', nameEn: 'Tomato', quantity: '2', unit: '个' },
      { name: '洋葱', nameEn: 'Onion', quantity: '1', unit: '个' },
      { name: '胡萝卜', nameEn: 'Carrot', quantity: '1', unit: '根' },
      { name: '芹菜', nameEn: 'Celery', quantity: '1', unit: '根' },
      { name: '番茄酱', nameEn: 'Tomato Sauce', quantity: '200', unit: '克' },
      { name: '红酒', nameEn: 'Red Wine', quantity: '100', unit: '毫升' },
      { name: '橄榄油', nameEn: 'Olive Oil', quantity: '2', unit: '大勺' }
    ],
    steps: [
      {
        number: 1,
        title: '准备食材',
        description: '洋葱、胡萝卜、芹菜切成小丁，番茄去皮切块。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=mirepoix%20vegetables%20onion%20carrot%20celery%20diced%20for%20bolognese&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '炒香底料',
        description: '锅中倒橄榄油，炒香洋葱、胡萝卜、芹菜丁至变软。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=vegetables%20sauteing%20in%20pan%20with%20olive%20oil%20for%20bolognese&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '炒牛肉',
        description: '加入牛肉末翻炒至变色，撒少许盐和胡椒调味。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ground%20beef%20browning%20in%20pan%20with%20vegetables&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '加番茄和红酒',
        description: '加入番茄块和番茄酱翻炒，倒入红酒煮至酒精挥发。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=bolognese%20sauce%20simmering%20with%20red%20wine%20and%20tomatoes&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '慢炖',
        description: '加水没过食材，小火慢炖20分钟至酱汁浓稠。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=bolognese%20sauce%20simmering%20in%20pan%20with%20rich%20color&image_size=landscape_4_3'
      },
      {
        number: 6,
        title: '煮面',
        description: '另起锅烧开水，加盐煮意大利面8-10分钟至弹牙。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=spaghetti%20cooking%20in%20boiling%20salted%20water&image_size=landscape_4_3'
      },
      {
        number: 7,
        title: '混合装盘',
        description: '捞出面条拌入肉酱，撒帕玛森芝士即可。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=spaghetti%20bolognese%20with%20parmesan%20cheese%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '慢炖酱汁', duration: 1200, stepNumber: 5 },
      { id: 't2', name: '煮面', duration: 540, stepNumber: 6 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=spaghetti%20bolognese%20with%20rich%20meat%20sauce%20food%20photography&image_size=landscape_4_3'
    ],
    description: '经典的意大利风味，浓郁的肉酱配上劲道的面条。',
    tags: ['意式', '经典', '西餐'],
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  },
  {
    _id: '6',
    name: '法式可颂',
    nameEn: 'French Croissant',
    difficulty: 'hard',
    cuisine: 'french',
    cookTime: 240,
    servings: 8,
    ingredients: [
      { name: '高筋面粉', nameEn: 'Bread Flour', quantity: '300', unit: '克' },
      { name: '低筋面粉', nameEn: 'Cake Flour', quantity: '100', unit: '克' },
      { name: '黄油', nameEn: 'Butter', quantity: '250', unit: '克' },
      { name: '细砂糖', nameEn: 'Sugar', quantity: '30', unit: '克' },
      { name: '盐', nameEn: 'Salt', quantity: '5', unit: '克' },
      { name: '酵母', nameEn: 'Yeast', quantity: '5', unit: '克' },
      { name: '牛奶', nameEn: 'Milk', quantity: '200', unit: '毫升' },
      { name: '鸡蛋', nameEn: 'Egg', quantity: '1', unit: '个' }
    ],
    steps: [
      {
        number: 1,
        title: '制作面团',
        description: '面粉、糖、盐、酵母混合，加入牛奶和鸡蛋揉成光滑面团，冷藏松弛1小时。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=smooth%20dough%20ball%20for%20croissant%20on%20floured%20surface&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '准备黄油块',
        description: '黄油整形成方块，冷藏至硬但可弯曲的状态。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=butter%20block%20prepared%20for%20croissant%20lamination&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '第一次折叠',
        description: '面团擀成长方形，放入黄油块，折叠成三层，冷藏30分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=croissant%20dough%20being%20folded%20with%20butter%20inside&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '第二次折叠',
        description: '取出面团擀长，再次折叠三层，冷藏30分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=croissant%20dough%20after%20second%20fold%20lamination&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '第三次折叠',
        description: '重复折叠步骤，完成第三次三层折叠，冷藏松弛1小时。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=croissant%20dough%20after%20third%20fold%20ready%20to%20shape&image_size=landscape_4_3'
      },
      {
        number: 6,
        title: '切割塑形',
        description: '面团擀成3mm厚，切成三角形，从宽边卷起塑形。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=croissant%20triangles%20cut%20from%20dough%20ready%20to%20roll&image_size=landscape_4_3'
      },
      {
        number: 7,
        title: '发酵',
        description: '可颂放入烤盘，温暖处发酵至两倍大，约1.5小时。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=croissant%20dough%20rising%20on%20baking%20sheet%20before%20baking&image_size=landscape_4_3'
      },
      {
        number: 8,
        title: '烘烤',
        description: '烤箱预热200度，刷蛋液，烤15-20分钟至金黄酥脆。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fresh%20golden%20croissants%20cooling%20on%20baking%20rack&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '面团松弛', duration: 3600, stepNumber: 1 },
      { id: 't2', name: '冷藏松弛', duration: 1800, stepNumber: 5 },
      { id: 't3', name: '发酵', duration: 5400, stepNumber: 7 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fresh%20french%20croissants%20golden%20flaky%20pastry%20food%20photography&image_size=landscape_4_3'
    ],
    description: '法式经典酥皮点心，层次分明，奶香浓郁。',
    tags: ['法式', '甜点', '烘焙'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '7',
    name: '泰式冬阴功汤',
    nameEn: 'Thai Tom Yum Soup',
    difficulty: 'medium',
    cuisine: 'thai',
    cookTime: 25,
    servings: 4,
    ingredients: [
      { name: '虾', nameEn: 'Shrimp', quantity: '500', unit: '克' },
      { name: '蘑菇', nameEn: 'Mushroom', quantity: '200', unit: '克' },
      { name: '番茄', nameEn: 'Tomato', quantity: '2', unit: '个' },
      { name: '柠檬草', nameEn: 'Lemongrass', quantity: '1', unit: '根' },
      { name: '南姜', nameEn: 'Galangal', quantity: '3', unit: '片' },
      { name: '青柠叶', nameEn: 'Kaffir Lime Leaves', quantity: '4', unit: '片' },
      { name: '红辣椒', nameEn: 'Red Chili', quantity: '3', unit: '个' },
      { name: '鱼露', nameEn: 'Fish Sauce', quantity: '2', unit: '大勺' },
      { name: '青柠汁', nameEn: 'Lime Juice', quantity: '2', unit: '大勺' },
      { name: '椰奶', nameEn: 'Coconut Milk', quantity: '100', unit: '毫升' }
    ],
    steps: [
      {
        number: 1,
        title: '准备食材',
        description: '虾去壳去虾线，蘑菇切片，番茄切块，柠檬草切段拍碎。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=thai%20tom%20yum%20ingredients%20shrimp%20mushrooms%20herbs%20arranged&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '煮香料',
        description: '锅中加水，放入柠檬草、南姜、青柠叶、辣椒煮10分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=thai%20herbs%20simmering%20in%20pot%20for%20tom%20yum%20broth&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '加食材',
        description: '加入蘑菇和番茄继续煮5分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=mushrooms%20and%20tomatoes%20cooking%20in%20tom%20yum%20broth&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '加虾',
        description: '放入虾煮至变色卷曲，约2-3分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=shrimp%20cooking%20in%20tom%20yum%20soup%20turning%20pink&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '调味',
        description: '加入鱼露、青柠汁和椰奶，煮1分钟即可出锅。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=thai%20tom%20yum%20soup%20with%20shrimp%20in%20bowl%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '煮香料', duration: 600, stepNumber: 2 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=thai%20tom%20yum%20soup%20with%20shrimp%20and%20mushrooms%20food%20photography&image_size=landscape_4_3'
    ],
    description: '酸辣鲜香的泰式经典汤品，让人胃口大开。',
    tags: ['泰式', '汤品', '酸辣'],
    createdAt: '2023-12-28',
    updatedAt: '2023-12-28'
  },
  {
    _id: '8',
    name: '印度黄油鸡',
    nameEn: 'Indian Butter Chicken',
    difficulty: 'medium',
    cuisine: 'indian',
    cookTime: 40,
    servings: 4,
    ingredients: [
      { name: '鸡胸肉', nameEn: 'Chicken Breast', quantity: '500', unit: '克' },
      { name: '酸奶', nameEn: 'Yogurt', quantity: '150', unit: '克' },
      { name: '黄油', nameEn: 'Butter', quantity: '50', unit: '克' },
      { name: '番茄', nameEn: 'Tomato', quantity: '4', unit: '个' },
      { name: '洋葱', nameEn: 'Onion', quantity: '1', unit: '个' },
      { name: '大蒜', nameEn: 'Garlic', quantity: '4', unit: '瓣' },
      { name: '姜', nameEn: 'Ginger', quantity: '1', unit: '小块' },
      { name: '咖喱粉', nameEn: 'Curry Powder', quantity: '2', unit: '小勺' },
      { name: '孜然粉', nameEn: 'Cumin', quantity: '1', unit: '小勺' },
      { name: '芫荽粉', nameEn: 'Coriander', quantity: '1', unit: '小勺' },
      { name: '红辣椒粉', nameEn: 'Red Chili Powder', quantity: '1/2', unit: '小勺' },
      { name: '鲜奶油', nameEn: 'Heavy Cream', quantity: '50', unit: '毫升' },
      { name: '米饭', nameEn: 'Rice', quantity: '4', unit: '碗' }
    ],
    steps: [
      {
        number: 1,
        title: '腌制鸡肉',
        description: '鸡肉切块，加入酸奶、姜蒜泥、咖喱粉、孜然粉腌制30分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chicken%20marinating%20in%20yogurt%20and%20indian%20spices&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '煎鸡肉',
        description: '黄油入锅融化，煎鸡肉块至金黄盛出。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chicken%20pieces%20browning%20in%20butter%20in%20pan&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '炒酱汁',
        description: '锅中留油，炒香洋葱至软，加入番茄块炒至出汁。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=onions%20and%20tomatoes%20cooking%20for%20butter%20chicken%20sauce&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '加香料',
        description: '加入咖喱粉、孜然粉、芫荽粉、红辣椒粉翻炒均匀。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=indian%20spices%20being%20added%20to%20tomato%20sauce&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '炖煮',
        description: '加水煮5分钟，加入煎好的鸡肉继续煮10分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=butter%20chicken%20simmering%20in%20rich%20tomato%20sauce&image_size=landscape_4_3'
      },
      {
        number: 6,
        title: '加奶油',
        description: '加入鲜奶油和剩余黄油，煮2分钟即可出锅。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=indian%20butter%20chicken%20with%20creamy%20sauce%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '腌制', duration: 1800, stepNumber: 1 },
      { id: 't2', name: '炖煮', duration: 600, stepNumber: 5 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=indian%20butter%20chicken%20with%20naan%20bread%20food%20photography&image_size=landscape_4_3'
    ],
    description: '浓郁奶香与印度香料完美融合的经典菜肴。',
    tags: ['印度', '咖喱', '经典'],
    createdAt: '2023-12-25',
    updatedAt: '2023-12-25'
  },
  {
    _id: '9',
    name: '简易拌面',
    nameEn: 'Simple Noodles',
    difficulty: 'easy',
    cuisine: 'chinese',
    cookTime: 8,
    servings: 2,
    ingredients: [
      { name: '面条', nameEn: 'Noodles', quantity: '200', unit: '克' },
      { name: '小葱', nameEn: 'Scallion', quantity: '2', unit: '根' },
      { name: '蒜', nameEn: 'Garlic', quantity: '2', unit: '瓣' },
      { name: '生抽', nameEn: 'Soy Sauce', quantity: '2', unit: '大勺' },
      { name: '香醋', nameEn: 'Vinegar', quantity: '1', unit: '大勺' },
      { name: '香油', nameEn: 'Sesame Oil', quantity: '1', unit: '小勺' },
      { name: '辣椒油', nameEn: 'Chili Oil', quantity: '1', unit: '小勺', substitutes: ['老干妈'] },
      { name: '花生碎', nameEn: 'Peanuts', quantity: '1', unit: '大勺' }
    ],
    steps: [
      {
        number: 1,
        title: '煮面',
        description: '锅中烧开水，放入面条煮3-4分钟至断生。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20noodles%20cooking%20in%20boiling%20water&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '准备调料',
        description: '小碗中加入生抽、香醋、香油、辣椒油混合均匀。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20noodle%20sauce%20ingredients%20in%20small%20bowl&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '拌制',
        description: '面条捞出沥干，倒入调料，撒葱花和花生碎拌匀。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20dry%20noodles%20with%20scallions%20and%20peanuts%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20simple%20noodles%20with%20chili%20oil%20food%20photography&image_size=landscape_4_3'
    ],
    description: '5分钟搞定的快手拌面，香辣开胃。',
    tags: ['快手', '家常', '素食'],
    createdAt: '2023-12-20',
    updatedAt: '2023-12-20'
  },
  {
    _id: '10',
    name: '烤三文鱼',
    nameEn: 'Baked Salmon',
    difficulty: 'easy',
    cuisine: 'western',
    cookTime: 20,
    servings: 2,
    ingredients: [
      { name: '三文鱼排', nameEn: 'Salmon Fillet', quantity: '400', unit: '克' },
      { name: '柠檬', nameEn: 'Lemon', quantity: '1', unit: '个' },
      { name: '橄榄油', nameEn: 'Olive Oil', quantity: '2', unit: '大勺' },
      { name: '大蒜', nameEn: 'Garlic', quantity: '2', unit: '瓣' },
      { name: '迷迭香', nameEn: 'Rosemary', quantity: '1', unit: '枝' },
      { name: '盐', nameEn: 'Salt', quantity: '1', unit: '小勺' },
      { name: '黑胡椒', nameEn: 'Black Pepper', quantity: '1/2', unit: '小勺' }
    ],
    steps: [
      {
        number: 1,
        title: '准备三文鱼',
        description: '三文鱼洗净擦干，用盐和黑胡椒涂抹均匀。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=raw%20salmon%20fillet%20seasoned%20with%20salt%20and%20pepper&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '调味',
        description: '淋上橄榄油，放上柠檬片、蒜末和迷迭香。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=salmon%20with%20olive%20oil%20lemon%20and%20rosemary%20ready%20to%20bake&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '烘烤',
        description: '烤箱预热200度，烤12-15分钟至三文鱼熟透。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=baked%20salmon%20with%20lemon%20and%20herbs%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [
      { id: 't1', name: '烘烤', duration: 720, stepNumber: 3 }
    ],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=baked%20salmon%20with%20lemon%20rosemary%20food%20photography&image_size=landscape_4_3'
    ],
    description: '简单健康的西式料理，保留三文鱼的鲜美。',
    tags: ['西式', '健康', '海鲜'],
    createdAt: '2023-12-18',
    updatedAt: '2023-12-18'
  },
  {
    _id: '11',
    name: '寿司',
    nameEn: 'Sushi',
    difficulty: 'hard',
    cuisine: 'japanese',
    cookTime: 60,
    servings: 4,
    ingredients: [
      { name: '寿司米', nameEn: 'Sushi Rice', quantity: '300', unit: '克' },
      { name: '海苔', nameEn: 'Nori', quantity: '4', unit: '张' },
      { name: '黄瓜', nameEn: 'Cucumber', quantity: '1', unit: '根' },
      { name: '胡萝卜', nameEn: 'Carrot', quantity: '1', unit: '根' },
      { name: '牛油果', nameEn: 'Avocado', quantity: '1', unit: '个' },
      { name: '三文鱼', nameEn: 'Salmon', quantity: '200', unit: '克' },
      { name: '蟹棒', nameEn: 'Crab Stick', quantity: '4', unit: '根' },
      { name: '寿司醋', nameEn: 'Sushi Vinegar', quantity: '3', unit: '大勺' },
      { name: '酱油', nameEn: 'Soy Sauce', quantity: '适量', unit: '' },
      { name: '芥末', nameEn: 'Wasabi', quantity: '适量', unit: '' }
    ],
    steps: [
      {
        number: 1,
        title: '煮寿司饭',
        description: '米淘洗干净，加水煮熟，趁热拌入寿司醋放凉。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sushi%20rice%20cooked%20and%20seasoned%20with%20vinegar&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '准备食材',
        description: '黄瓜、胡萝卜切条，牛油果切片，三文鱼切片。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sushi%20ingredients%20cucumber%20carrot%20avocado%20salmon%20prepared&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '铺米饭',
        description: '寿司帘上铺海苔，均匀铺上一层寿司饭。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sushi%20rice%20spread%20on%20nori%20sheet%20on%20bamboo%20mat&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '放馅料',
        description: '在米饭前端放上黄瓜、胡萝卜、蟹棒等馅料。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sushi%20fillings%20placed%20on%20rice%20before%20rolling&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '卷寿司',
        description: '用寿司帘将寿司紧紧卷起来，定型。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=sushi%20roll%20being%20formed%20with%20bamboo%20mat&image_size=landscape_4_3'
      },
      {
        number: 6,
        title: '切寿司',
        description: '寿司卷切成段，搭配酱油和芥末食用。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cut%20sushi%20rolls%20on%20plate%20with%20soy%20sauce%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=japanese%20sushi%20rolls%20assorted%20food%20photography&image_size=landscape_4_3'
    ],
    description: '日式经典料理，自己动手乐趣无穷。',
    tags: ['日式', '手工', '海鲜'],
    createdAt: '2023-12-15',
    updatedAt: '2023-12-15'
  },
  {
    _id: '12',
    name: '汉堡包',
    nameEn: 'Hamburger',
    difficulty: 'medium',
    cuisine: 'western',
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: '牛肉末', nameEn: 'Ground Beef', quantity: '400', unit: '克' },
      { name: '汉堡面包', nameEn: 'Hamburger Buns', quantity: '4', unit: '个' },
      { name: '生菜', nameEn: 'Lettuce', quantity: '4', unit: '片' },
      { name: '番茄', nameEn: 'Tomato', quantity: '1', unit: '个' },
      { name: '洋葱', nameEn: 'Onion', quantity: '1/2', unit: '个' },
      { name: '芝士片', nameEn: 'Cheese', quantity: '4', unit: '片' },
      { name: '酸黄瓜', nameEn: 'Pickles', quantity: '8', unit: '片' },
      { name: '番茄酱', nameEn: 'Ketchup', quantity: '适量', unit: '' },
      { name: '芥末酱', nameEn: 'Mustard', quantity: '适量', unit: '' },
      { name: '盐', nameEn: 'Salt', quantity: '1', unit: '小勺' },
      { name: '黑胡椒', nameEn: 'Black Pepper', quantity: '1/2', unit: '小勺' }
    ],
    steps: [
      {
        number: 1,
        title: '制作肉饼',
        description: '牛肉末加盐和黑胡椒调味，分成4份搓成圆饼。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=raw%20beef%20burger%20patties%20on%20plate&image_size=landscape_4_3'
      },
      {
        number: 2,
        title: '煎肉饼',
        description: '平底锅加热，放入肉饼煎至两面金黄，约每面3-4分钟。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=burger%20patty%20cooking%20on%20grill%20pan%20with%20grill%20marks&image_size=landscape_4_3'
      },
      {
        number: 3,
        title: '融化芝士',
        description: '肉饼快煎好时放上芝士片，盖锅盖焖1分钟至融化。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cheese%20melting%20on%20burger%20patty%20on%20grill&image_size=landscape_4_3'
      },
      {
        number: 4,
        title: '准备面包',
        description: '汉堡面包切开，放入平底锅烤至微焦。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=hamburger%20buns%20toasting%20on%20pan&image_size=landscape_4_3'
      },
      {
        number: 5,
        title: '组装汉堡',
        description: '依次放上生菜、番茄、肉饼、酸黄瓜，挤上酱料。',
        image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=homemade%20hamburger%20with%20cheese%20lettuce%20tomato%20food%20photography&image_size=landscape_4_3'
      }
    ],
    timers: [],
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=classic%20hamburger%20with%20cheese%20and%20vegetables%20food%20photography&image_size=landscape_4_3'
    ],
    description: '经典美式汉堡，自制更美味。',
    tags: ['西式', '快餐', '自制'],
    createdAt: '2023-12-10',
    updatedAt: '2023-12-10'
  }
];

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  nickname: '美食达人',
  avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=friendly%20food%20blogger%20avatar%20portrait%20smiling&image_size=square',
  level: 12,
  exp: 2350,
  title: '中级厨师'
};

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: '美食达人',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=friendly%20food%20blogger%20avatar%20portrait%20smiling&image_size=square',
    recipeId: '2',
    recipeName: '红烧肉',
    content: '今天做了红烧肉，色泽红亮，肥而不腻，太成功了！',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=homemade%20chinese%20braised%20pork%20belly%20hong%20shao%20rou%20close%20up&image_size=square'
    ],
    likes: 128,
    comments: 23,
    liked: false,
    createdAt: '2024-01-15T12:30:00'
  },
  {
    id: '2',
    userId: '2',
    userName: '厨房小白',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beginner%20cook%20avatar%20portrait&image_size=square',
    recipeId: '1',
    recipeName: '番茄炒蛋',
    content: '第一次做番茄炒蛋，没想到这么简单又好吃！',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=homemade%20tomato%20scrambled%20eggs%20on%20plate&image_size=square'
    ],
    likes: 45,
    comments: 8,
    liked: true,
    createdAt: '2024-01-14T18:20:00'
  },
  {
    id: '3',
    userId: '3',
    userName: '烘焙爱好者',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=baking%20enthusiast%20avatar%20portrait%20with%20apron&image_size=square',
    recipeId: '6',
    recipeName: '法式可颂',
    content: '挑战可颂成功！层次分明，酥脆可口～',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fresh%20homemade%20french%20croissants%20close%20up&image_size=square'
    ],
    likes: 256,
    comments: 42,
    liked: false,
    createdAt: '2024-01-13T10:15:00'
  },
  {
    id: '4',
    userId: '4',
    userName: '健康生活',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=healthy%20lifestyle%20avatar%20portrait%20fit&image_size=square',
    content: '今日份减脂餐：烤三文鱼配蔬菜沙拉',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=healthy%20salmon%20salad%20bowl%20with%20vegetables&image_size=square'
    ],
    likes: 89,
    comments: 15,
    liked: false,
    createdAt: '2024-01-12T19:45:00'
  },
  {
    id: '5',
    userId: '5',
    userName: '美食旅行家',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=food%20traveler%20avatar%20portrait%20adventurous&image_size=square',
    recipeId: '7',
    recipeName: '泰式冬阴功汤',
    content: '去泰国学的正宗冬阴功汤做法，酸辣开胃！',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=thai%20tom%20yum%20soup%20close%20up%20with%20shrimp&image_size=square'
    ],
    likes: 167,
    comments: 31,
    liked: true,
    createdAt: '2024-01-11T14:00:00'
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: '初入厨房',
    description: '完成第一道菜肴',
    icon: 'ChefHat',
    unlockedAt: '2024-01-01',
    progress: 1,
    total: 1
  },
  {
    id: '2',
    name: '连续7天',
    description: '连续7天每天做饭',
    icon: 'Flame',
    unlockedAt: '2024-01-10',
    progress: 7,
    total: 7
  },
  {
    id: '3',
    name: '全能厨师',
    description: '解锁5种不同菜系',
    icon: 'Globe',
    unlockedAt: '2024-01-15',
    progress: 5,
    total: 5
  },
  {
    id: '4',
    name: '快手达人',
    description: '完成10道easy难度食谱',
    icon: 'Zap',
    progress: 6,
    total: 10
  },
  {
    id: '5',
    name: '大厨之路',
    description: '完成5道hard难度食谱',
    icon: 'Award',
    progress: 2,
    total: 5
  },
  {
    id: '6',
    name: '社区明星',
    description: '获得100个点赞',
    icon: 'Star',
    unlockedAt: '2024-01-14',
    progress: 128,
    total: 100
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: '减脂餐挑战',
    description: '一周健康减脂餐计划，告别油腻',
    hashtag: '#减脂餐挑战',
    startDate: '2024-01-15',
    endDate: '2024-01-21',
    participants: 256,
    featured: true
  },
  {
    id: '2',
    name: '一人食计划',
    description: '一个人也要好好吃饭，分享你的单人餐',
    hashtag: '#一人食',
    startDate: '2024-01-10',
    endDate: '2024-01-25',
    participants: 189,
    featured: true
  },
  {
    id: '3',
    name: '春节家宴',
    description: '准备一桌丰盛的年夜饭',
    hashtag: '#春节家宴',
    startDate: '2024-01-20',
    endDate: '2024-02-10',
    participants: 320,
    featured: false
  }
];