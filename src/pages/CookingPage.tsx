import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Play, Pause, ChevronLeft, ChevronRight, Clock, Camera, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TimerCard } from '../components/TimerCard';

export const CookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipes = useStore((state) => state.recipes);
  const completedSteps = useStore((state) => state.completedSteps);
  const cookingStep = useStore((state) => state.cookingStep);
  const completeStep = useStore((state) => state.completeStep);
  const completeCooking = useStore((state) => state.completeCooking);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const recipe = recipes.find((r) => r._id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="text-center">
          <p className="text-gray-500">食谱不存在</p>
        </div>
      </div>
    );
  }

  const currentStep = recipe.steps.find((s) => s.number === cookingStep);
  const progress = (completedSteps.length / recipe.steps.length) * 100;

  const handleCompleteStep = () => {
    if (cookingStep <= recipe.steps.length) {
      completeStep(cookingStep);
    }
  };

  const handlePreviousStep = () => {
    if (cookingStep > 1) {
      useStore.getState().setCookingStep(cookingStep - 1);
    }
  };

  const handleCompleteCooking = () => {
    if (photoUrl) {
      completeCooking(recipe._id, photoUrl);
    } else {
      completeCooking(recipe._id);
    }
    navigate('/progress');
  };

  useEffect(() => {
    const timer = recipe.timers.find((t) => t.stepNumber === cookingStep);
    if (timer) {
      const existingTimer = useStore.getState().timers.find((t) => t.id === timer.id);
      if (!existingTimer) {
        useStore.getState().startTimer(timer.id, timer.duration);
      }
    }
  }, [cookingStep, recipe.timers]);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative aspect-video">
            <img
              src={recipe.images[0]}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{recipe.name}</h1>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">烹饪进度</span>
                <span className="text-sm font-medium text-orange-500">
                  {completedSteps.length}/{recipe.steps.length}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePreviousStep}
                disabled={cookingStep <= 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                上一步
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">当前步骤</span>
                <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                  {cookingStep}
                </span>
              </div>
              <button
                onClick={() => navigate(`/recipes/${id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                返回食谱
              </button>
            </div>

            {currentStep ? (
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentStep.number}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{currentStep.title}</h2>
                    <p className="text-gray-500">
                      步骤 {currentStep.number} / {recipe.steps.length}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{currentStep.description}</p>
                {currentStep.image && (
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={currentStep.image}
                      alt={`步骤${currentStep.number}`}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                )}
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.timers.map((timer) => (
                <TimerCard
                  key={timer.id}
                  id={timer.id}
                  name={timer.name}
                  duration={timer.duration}
                />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">步骤列表</h3>
              <div className="space-y-2">
                {recipe.steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      completedSteps.includes(step.number)
                        ? 'bg-green-50 border border-green-200'
                        : step.number === cookingStep
                        ? 'bg-orange-50 border border-orange-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      completedSteps.includes(step.number)
                        ? 'bg-green-500 text-white'
                        : step.number === cookingStep
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {completedSteps.includes(step.number) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className={`font-medium ${
                      completedSteps.includes(step.number)
                        ? 'text-green-700'
                        : step.number === cookingStep
                        ? 'text-orange-700'
                        : 'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {cookingStep <= recipe.steps.length ? (
                <button
                  onClick={handleCompleteStep}
                  className="flex-1 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  标记完成
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    上传成品图
                  </button>
                  <button
                    onClick={handleCompleteCooking}
                    className="flex-1 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    完成烹饪
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">上传成品照片</h3>
            <p className="text-gray-500 mb-4">拍摄或上传你制作的美食照片</p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">点击或拖拽上传图片</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setPhotoUrl('mock-photo-url');
                  setShowPhotoModal(false);
                }}
                className="flex-1 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600"
              >
                确认上传
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
