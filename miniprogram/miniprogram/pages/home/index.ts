import type { IPageOption } from '../../../types/index';
import { api, getDifficultyText, getDifficultyColor } from '../../utils/api';

interface HomePageData {
  recipes: any[];
  cuisines: any[];
  userStats: any;
  loading: boolean;
}

interface HomePageOption extends IPageOption {
  data: HomePageData;
  onLoad(): void;
  onPullDownRefresh(): void;
  onReachBottom(): void;
}

const app = getApp();

Page<HomePageData, HomePageOption>({
  data: {
    recipes: [],
    cuisines: [
      { id: 'chinese', name: '中餐', icon: '🥢' },
      { id: 'japanese', name: '日料', icon: '🍣' },
      { id: 'korean', name: '韩式', icon: '🥘' },
      { id: 'italian', name: '意式', icon: '🍝' },
      { id: 'french', name: '法式', icon: '🥐' },
      { id: 'thai', name: '泰式', icon: '🍛' },
    ],
    userStats: null,
    loading: true,
  },

  onLoad() {
    this.loadRecipes();
    this.loadUserStats();
  },

  onPullDownRefresh() {
    Promise.all([this.loadRecipes(), this.loadUserStats()]).finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  async loadRecipes() {
    try {
      const res = await api.recipe.list({ limit: 10 });
      this.setData({ recipes: res.data, loading: false });
    } catch (error) {
      console.error('加载食谱失败:', error);
      this.setData({ loading: false });
    }
  },

  async loadUserStats() {
    if (!app.globalData.token) return;
    try {
      const res = await api.progress.get();
      this.setData({ userStats: res.statistics });
    } catch (error) {
      console.error('加载用户统计失败:', error);
    }
  },

  goToRecipeList(e: WechatMiniprogram.TouchEvent) {
    const cuisine = e.currentTarget.dataset.cuisine || '';
    wx.navigateTo({
      url: `/pages/recipeList/index?cuisine=${cuisine}`,
    });
  },

  goToRecipeDetail(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/recipeDetail/index?id=${id}`,
    });
  },

  goToSearch() {
    wx.navigateTo({
      url: '/pages/recipeList/index',
    });
  },
});
