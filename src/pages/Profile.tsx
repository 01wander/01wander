import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Camera, Award, ChefHat, Heart, LogOut, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { RecipeCard } from '../components/RecipeCard';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'badges' | 'photos'>('recipes');
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const completedRecipes = useStore((state) => state.completedRecipes);
  const badges = useStore((state) => state.badges);
  const recipes = useStore((state) => state.recipes);
  const navigate = useNavigate();

  const completedRecipeDetails = completedRecipes.map((cr) => 
    recipes.find((r) => r._id === cr.recipeId)
  ).filter(Boolean);

  const unlockedBadges = badges.filter((b) => b.unlockedAt);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.nickname} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-orange-500" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{user.nickname}</h1>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Lv.{user.level}</span>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                  {user.title}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <span className="text-2xl font-bold">{completedRecipes.length}</span>
                  <span className="text-white/70 ml-1">完成食谱</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{unlockedBadges.length}</span>
                  <span className="text-white/70 ml-1">获得勋章</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{user.exp}</span>
                  <span className="text-white/70 ml-1">经验值</span>
                </div>
              </div>
              <div className="mt-3 w-64 h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${(user.exp % 1000) / 10}%` }} />
              </div>
              <div className="text-sm text-white/70 mt-1">
                距离下一级还需 {1000 - (user.exp % 1000)} 经验
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'recipes' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ChefHat className="w-5 h-5" />
              拿手菜
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'badges' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Award className="w-5 h-5" />
              勋章墙
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors ${
                activeTab === 'photos' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="w-5 h-5" />
              美食相册
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'recipes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedRecipeDetails.length > 0 ? (
                  completedRecipeDetails.map((recipe) => recipe && <RecipeCard key={recipe._id} recipe={recipe} />)
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ChefHat className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">还没有完成任何食谱</p>
                    <button
                      onClick={() => navigate('/recipes')}
                      className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                    >
                      探索食谱
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`text-center p-4 rounded-xl ${badge.unlockedAt ? 'bg-orange-50' : 'bg-gray-50'}`}
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${badge.unlockedAt ? 'bg-orange-100' : 'bg-gray-200'}`}>
                      {badge.unlockedAt ? '🏆' : '🔒'}
                    </div>
                    <div className={`font-semibold ${badge.unlockedAt ? 'text-gray-800' : 'text-gray-400'}`}>
                      {badge.name}
                    </div>
                    <div className={`text-sm mt-1 ${badge.unlockedAt ? 'text-gray-500' : 'text-gray-400'}`}>
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="grid grid-cols-3 gap-3">
                {completedRecipeDetails.slice(0, 9).map((recipe, index) => (
                  recipe && (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={recipe.images[0]}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                ))}
                {completedRecipeDetails.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">还没有上传美食照片</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
