import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';
import { RecipeCard } from '../components/RecipeCard';

const difficulties = [
  { id: '', label: '全部难度' },
  { id: 'easy', label: '新手入门' },
  { id: 'medium', label: '进阶厨艺' },
  { id: 'hard', label: '大厨挑战' },
];

const cuisines = [
  { id: '', label: '全部菜系' },
  { id: 'chinese', label: '中餐' },
  { id: 'japanese', label: '日料' },
  { id: 'korean', label: '韩式' },
  { id: 'italian', label: '意式' },
  { id: 'french', label: '法式' },
  { id: 'thai', label: '泰式' },
  { id: 'western', label: '西餐' },
  { id: 'indian', label: '印度' },
];

export const RecipeList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const filteredRecipes = useStore((state) => state.filteredRecipes());
  const selectedDifficulty = useStore((state) => state.selectedDifficulty);
  const selectedCuisine = useStore((state) => state.selectedCuisine);
  const setSelectedDifficulty = useStore((state) => state.setSelectedDifficulty);
  const setSelectedCuisine = useStore((state) => state.setSelectedCuisine);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">食谱大全</h1>
            <p className="text-gray-500 mt-2">
              共找到 {filteredRecipes.length} 道美味食谱
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>筛选</span>
            {selectedDifficulty || selectedCuisine ? (
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
            ) : null}
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <SlidersHorizontal className="w-4 h-4" />
                  难度等级
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => handleDifficultyChange(diff.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedDifficulty === diff.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  菜系分类
                </label>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map((cuisine) => (
                    <button
                      key={cuisine.id}
                      onClick={() => handleCuisineChange(cuisine.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        selectedCuisine === cuisine.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cuisine.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {(selectedDifficulty || selectedCuisine) && (
              <button
                onClick={() => {
                  setSelectedDifficulty('');
                  setSelectedCuisine('');
                }}
                className="mt-4 text-orange-500 hover:text-orange-600 text-sm"
              >
                清除筛选
              </button>
            )}
          </div>
        )}

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🍳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">暂无匹配的食谱</h3>
            <p className="text-gray-500">试试调整筛选条件或搜索其他关键词</p>
          </div>
        )}
      </div>
    </div>
  );
};
