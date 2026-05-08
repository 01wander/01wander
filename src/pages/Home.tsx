import { ArrowRight, Clock, Users, ChefHat, Flame } from 'lucide-react';
import { useStore } from '../store/useStore';
import { RecipeCard } from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=delicious%20international%20cuisine%20feast%20on%20table%20food%20photography%20warm%20lighting&image_size=landscape_16_9',
  'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=asian%20food%20spread%20with%20various%20dishes%20beautiful%20presentation&image_size=landscape_16_9',
  'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=homemade%20cooking%20in%20modern%20kitchen%20warm%20atmosphere&image_size=landscape_16_9',
];

const cuisines = [
  { id: 'chinese', name: '中餐', icon: '🥢', color: 'bg-red-500' },
  { id: 'japanese', name: '日料', icon: '🍣', color: 'bg-pink-500' },
  { id: 'korean', name: '韩式', icon: '🥘', color: 'bg-yellow-500' },
  { id: 'italian', name: '意式', icon: '🍝', color: 'bg-green-500' },
  { id: 'french', name: '法式', icon: '🥐', color: 'bg-blue-500' },
  { id: 'thai', name: '泰式', icon: '🍛', color: 'bg-orange-500' },
];

const stats = [
  { icon: ChefHat, value: '500+', label: '精选食谱' },
  { icon: Flame, value: '50K+', label: '活跃用户' },
  { icon: Clock, value: '10M+', label: '烹饪次数' },
];

export const Home = () => {
  const recipes = useStore((state) => state.recipes);
  const progressStats = useStore((state) => state.progressStats);
  const navigate = useNavigate();
  const featuredRecipes = recipes.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages[0]}
            alt="美食盛宴"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              探索全球美味
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              从新手到大厨，让烹饪变得简单有趣
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/recipes')}
                className="px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                探索食谱
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/community')}
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                加入社区
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">按菜系浏览</h2>
              <p className="text-gray-500 mt-2">探索世界各地的美食文化</p>
            </div>
            <button
              onClick={() => navigate('/recipes')}
              className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine.id}
                onClick={() => navigate(`/recipes?cuisine=${cuisine.id}`)}
                className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${cuisine.color} rounded-full flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 transition-transform`}>
                  {cuisine.icon}
                </div>
                <span className="font-semibold text-gray-700">{cuisine.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">热门食谱</h2>
              <p className="text-gray-500 mt-2">最受欢迎的美味佳肴</p>
            </div>
            <button
              onClick={() => navigate('/recipes')}
              className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2"
            >
              查看更多
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            今天就开始烹饪之旅
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            无论你是厨房小白还是烹饪达人，这里都有适合你的食谱。
            加入我们，一起探索美食的无限可能。
          </p>
          <button
            onClick={() => navigate('/recipes')}
            className="px-8 py-4 bg-white text-orange-500 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            开始探索
          </button>
        </div>
      </section>

      {progressStats.totalCooked > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">我的烹饪成就</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{progressStats.streak}</div>
                    <div className="text-gray-500">连续打卡天数</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{progressStats.totalCooked}</div>
                    <div className="text-gray-500">已完成食谱</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">中餐</div>
                    <div className="text-gray-500">最常做的菜系</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
