import type { IPageOption } from '../../../types/index';
import { api } from '../../utils/api';

interface ProgressData {
  completedRecipes: any[];
  statistics: any;
  loading: boolean;
}

interface ProgressOption extends IPageOption {
  data: ProgressData;
  onLoad(): void;
}

const app = getApp();

Page<ProgressData, ProgressOption>({
  data: {
    completedRecipes: [],
    statistics: null,
    loading: true,
  },

  onLoad() {
    if (!app.globalData.token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/login/index' });
      }, 1500);
      return;
    }
    this.loadProgress();
  },

  async loadProgress() {
    try {
      const res = await api.progress.get();
      this.setData({
        completedRecipes: res.completedRecipes || [],
        statistics: res.statistics,
        loading: false,
      });
    } catch (error) {
      console.error('加载进度失败:', error);
      this.setData({ loading: false });
    }
  },

  goToRecipe(e: WechatMiniprogram.TouchEvent) {
    const recipeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/recipeDetail/index?id=${recipeId}`,
    });
  },

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  },
});
