import type { IPageOption } from '../../../types/index';
import { api, getDifficultyText, getDifficultyColor } from '../../utils/api';

interface RecipeDetailData {
  recipe: any | null;
  loading: boolean;
  servings: number;
  currentStep: number;
}

interface RecipeDetailOption extends IPageOption {
  data: RecipeDetailData;
  onLoad(options: { id: string }): void;
}

Page<RecipeDetailData, RecipeDetailOption>({
  data: {
    recipe: null,
    loading: true,
    servings: 4,
    currentStep: 1,
  },

  onLoad(options) {
    if (options.id) {
      this.loadRecipe(options.id);
    }
  },

  async loadRecipe(id: string) {
    try {
      const recipe = await api.recipe.detail(id);
      this.setData({ recipe, loading: false });
      wx.setNavigationBarTitle({ title: recipe.name });
    } catch (error) {
      console.error('加载食谱失败:', error);
      wx.showToast({ title: '加载失败', icon: 'none' });
      this.setData({ loading: false });
    }
  },

  adjustServings(delta: number) {
    const newServings = this.data.servings + delta;
    if (newServings >= 1 && newServings <= 20) {
      this.setData({ servings: newServings });
    }
  },

  calculateQuantity(original: string): string {
    const ratio = this.data.servings / (this.data.recipe?.servings || 4);
    const num = parseFloat(original);
    if (!isNaN(num)) {
      return (num * ratio).toFixed(1);
    }
    return original;
  },

  startCooking() {
    const { recipe } = this.data;
    if (!recipe) return;

    api.progress.start(recipe._id).then(() => {
      wx.navigateTo({
        url: `/pages/cooking/index?id=${recipe._id}`,
      });
    }).catch(() => {
      wx.navigateTo({
        url: `/pages/cooking/index?id=${recipe._id}`,
      });
    });
  },

  goToUserProfile() {
    wx.navigateTo({
      url: '/pages/profile/index',
    });
  },

  previewImage(e: WechatMiniprogram.TouchEvent) {
    const urls = e.currentTarget.dataset.urls as string[];
    wx.previewImage({
      current: e.currentTarget.dataset.current as string,
      urls: urls,
    });
  },
});
