import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Play, ArrowRight, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import { IngredientModal } from '../components/IngredientModal';
import { TimerCard } from '../components/TimerCard';
import { Ingredient, Step } from '../types';

const difficultyConfig = {
  easy: { label: '新手入门', color: 'bg-green-100 text-green-700', icon: '🌱' },
  medium: { label: '进阶厨艺', color: 'bg-yellow-100 text-yellow-700', icon: '🔥' },
  hard: { label: '大厨挑战', color: 'bg-red-100 text-red-700', icon: '👑' },
};

const cuisineLabels: Record<string, string> = {
  chinese: '中餐',
  western: '西餐',
  japanese: '日料',
  korean: '韩式',
  thai: '泰式',
  italian: '意式',
  french: '法式',
  indian: '印度',
};

export const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipes = useStore((state) => state.recipes);
  const startCooking = useStore((state) => state.startCooking);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [servings, setServings] = useState(2);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const recipe = recipes.find((r) => r._id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="text-center">
          <p className="text-gray-500">食谱不存在</p>
          <button
            onClick={() => navigate('/recipes')}
            className="mt-4 text-orange-500 hover:text-orange-600"
          >
            返回食谱列表
          </button>
        </div>
      </div>
    );
  }

  const difficulty = difficultyConfig[recipe.difficulty];
  const scaleFactor = servings / recipe.servings;

  const handleStartCooking = () => {
    startCooking(recipe._id);
    navigate(`/cooking/${recipe._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="relative aspect-video">
            <img
              src={recipe.images[0]}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficulty.color}`}>
                  {difficulty.icon} {difficulty.label}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-700">
                  {cuisineLabels[recipe.cuisine] || recipe.cuisine}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{recipe.name}</h1>
              <p className="text-white/80">{recipe.nameEn}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-orange-500" />
                <span>{recipe.cookTime}分钟</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-orange-500" />
                <span>
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="mx-2 font-semibold">{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                  人份
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ChefHat className="w-5 h-5 text-orange-500" />
                <span>{recipe.difficulty === 'easy' ? '简单' : recipe.difficulty === 'medium' ? '中等' : '困难'}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <div className="flex gap-2 mb-6">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-orange-500" />
                食材清单
              </h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => {
                  const scaledQuantity = parseFloat(ingredient.quantity) * scaleFactor;
                  const displayQuantity = scaledQuantity % 1 === 0 ? scaledQuantity.toString() : scaledQuantity.toFixed(1);
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedIngredient(ingredient)}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-lg">
                          🥬
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{ingredient.name}</div>
                          <div className="text-sm text-gray-400">{ingredient.nameEn}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-700">
                          {displayQuantity} {ingredient.unit}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-gray-500">点击食材查看详情和替代方案</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Play className="w-6 h-6 text-orange-500" />
                烹饪步骤
              </h2>
              <div className="space-y-4">
                {recipe.steps.map((step: Step) => (
                  <div
                    key={step.number}
                    className={`relative pl-12 pb-6 ${step.number !== recipe.steps.length ? 'border-b border-gray-100' : ''}`}
                    onClick={() => setActiveStep(activeStep === step.number ? null : step.number)}
                  >
                    <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      activeStep === step.number ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.number}
                    </div>
                    <div className="cursor-pointer">
                      <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                      {step.image && (
                        <div className="mt-3 rounded-xl overflow-hidden">
                          <img
                            src={step.image}
                            alt={`步骤${step.number}`}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {recipe.timers.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">智能计时器</h2>
                <div className="space-y-4">
                  {recipe.timers.map((timer) => (
                    <TimerCard
                      key={timer.id}
                      id={timer.id}
                      name={timer.name}
                      duration={timer.duration}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">准备好挑战了吗？</h3>
              <p className="text-white/80 mb-4">跟着步骤一步步来，你一定可以！</p>
              <button
                onClick={handleStartCooking}
                className="w-full py-3 bg-white text-orange-500 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                开始烹饪
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <IngredientModal
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
      />
    </div>
  );
};
