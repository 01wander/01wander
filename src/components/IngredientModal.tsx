import { X, Lightbulb } from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientModalProps {
  ingredient: Ingredient | null;
  onClose: () => void;
}

export const IngredientModal = ({ ingredient, onClose }: IngredientModalProps) => {
  if (!ingredient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto animate-fadeIn">
        <div className="relative">
          <img
            src={`https://neeko-copilot.bytedance.net/api/text_to_image?prompt=${encodeURIComponent(ingredient.name + ' food ingredient close up')}&image_size=landscape_4_3`}
            alt={ingredient.name}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{ingredient.name}</h3>
            <span className="text-gray-400">{ingredient.nameEn}</span>
          </div>
          {ingredient.description && (
            <p className="text-gray-600 mb-4">{ingredient.description}</p>
          )}
          {ingredient.substitutes && ingredient.substitutes.length > 0 && (
            <div className="bg-yellow-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-yellow-700">替代方案</span>
              </div>
              <ul className="text-sm text-yellow-800">
                {ingredient.substitutes.map((sub, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-700 mb-2">选购建议</h4>
            <p className="text-sm text-gray-500">
              建议选择新鲜、色泽鲜艳的{ingredient.name}，避免购买过于软烂或有异味的产品。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
