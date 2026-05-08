import { Flame, ChefHat, Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Progress = () => {
  const completedRecipes = useStore((state) => state.completedRecipes);
  const progressStats = useStore((state) => state.progressStats);
  const badges = useStore((state) => state.badges);

  const getHeatmapData = () => {
    const weeks = [];
    const today = new Date();
    for (let i = 51; i >= 0; i--) {
      const weekData = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7 + (6 - j)));
        const dateStr = date.toISOString().split('T')[0];
        const heatmapDay = progressStats.heatmap.find((h) => h.date === dateStr);
        weekData.push({
          date: dateStr,
          count: heatmapDay?.count || 0,
        });
      }
      weeks.push(weekData);
    }
    return weeks;
  };

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-green-200';
    if (count === 2) return 'bg-green-300';
    if (count === 3) return 'bg-green-400';
    return 'bg-green-500';
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const unlockedBadges = badges.filter((b) => b.unlockedAt);
  const lockedBadges = badges.filter((b) => !b.unlockedAt);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">烹饪进度</h1>
            <p className="text-gray-500 mt-2">追踪你的烹饪旅程</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{progressStats.streak}</div>
                <div className="text-sm text-gray-500">连续打卡</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{progressStats.totalCooked}</div>
                <div className="text-sm text-gray-500">完成食谱</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">中餐</div>
                <div className="text-sm text-gray-500">最爱菜系</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{unlockedBadges.length}</div>
                <div className="text-sm text-gray-500">获得勋章</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            烹饪热力图
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="flex gap-1 mb-1 ml-8">
                {['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'].map((month, idx) => (
                  <div key={month} className="text-xs text-gray-400" style={{ width: `${(52 / 12) * 100}%` }}>
                    {idx % 2 === 0 ? month : ''}
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 mr-2">
                  {weekDays.map((day) => (
                    <div key={day} className="text-xs text-gray-400 h-3 flex items-center">{day}</div>
                  ))}
                </div>
                <div className="flex gap-0.5">
                  {getHeatmapData().map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-0.5">
                      {week.map((day, dayIdx) => (
                        <div
                          key={dayIdx}
                          className={`w-3 h-3 rounded-sm ${getHeatmapColor(day.count)}`}
                          title={`${day.date}: ${day.count} 次烹饪`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <span>少</span>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((count) => (
                    <div key={count} className={`w-3 h-3 rounded-sm ${getHeatmapColor(count)}`} />
                  ))}
                </div>
                <span>多</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              成就勋章
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`text-center p-3 rounded-xl ${badge.unlockedAt ? 'bg-orange-50' : 'bg-gray-50'}`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${badge.unlockedAt ? 'bg-orange-100' : 'bg-gray-200'}`}>
                    {badge.unlockedAt ? '🏆' : '🔒'}
                  </div>
                  <div className={`font-semibold text-sm ${badge.unlockedAt ? 'text-gray-800' : 'text-gray-400'}`}>
                    {badge.name}
                  </div>
                  {!badge.unlockedAt && badge.progress !== undefined && badge.total !== undefined && (
                    <div className="mt-2">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500"
                          style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{badge.progress}/{badge.total}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">已完成食谱</h3>
            {completedRecipes.length > 0 ? (
              <div className="space-y-3">
                {completedRecipes.slice(0, 6).map((recipe, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{recipe.recipeName}</div>
                        <div className="text-sm text-gray-400">{recipe.completedAt}</div>
                      </div>
                    </div>
                    {recipe.rating && (
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < recipe.rating ? 'text-yellow-400' : 'text-gray-200'}>
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">还没有完成任何食谱</p>
                <p className="text-gray-400 text-sm">快去探索食谱开始烹饪吧！</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
