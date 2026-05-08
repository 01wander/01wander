import type { IPageOption } from '../../../types/index';
import { api, getDifficultyText, getDifficultyColor } from '../../utils/api';

interface RecipeListData {
  recipes: any[];
  cuisines: any[];
  selectedCuisine: string;
  loading: boolean;
  page: number;
  hasMore: boolean;
}

interface RecipeListOption extends IPageOption {
  data: RecipeListData;
  onLoad(options: { cuisine?: string }): void;
  onPullDownRefresh(): void;
  onReachBottom(): void;
}

Page<RecipeListData, RecipeListOption>({
  data: {
    recipes: [],
    cuisines: [
      { id: '', name: '全部' },
      { id: 'chinese', name: '中餐' },
      { id: 'japanese', name: '日料' },
      { id: 'korean', name: '韩式' },
      { id: 'italian', name: '意式' },
      { id: 'french', name: '法式' },
      { id: 'thai', name: '泰式' },
    ],
    selectedCuisine: '',
    loading: true,
    page: 1,
    hasMore: true,
  },

  onLoad(options) {
    if (options.cuisine) {
      this.setData({ selectedCuisine: options.cuisine });
    }
    this.loadRecipes();
  },

  onPullDownRefresh() {
    this.setData({ page: 1, recipes: [], hasMore: true });
    this.loadRecipes().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.setData({ page: this.data.page + 1 });
      this.loadRecipes(true);
    }
  },

  async loadRecipes(append = false) {
    try {
      this.setData({ loading: true });
      const res = await api.recipe.list({
        page: this.data.page,
        limit: 10,
        cuisine: this.data.selectedCuisine || undefined,
      });

      const recipes = append ? [...this.data.recipes, ...res.data] : res.data;
      const hasMore = res.data.length >= 10;

      this.setData({ recipes, loading: false, hasMore });
    } catch (error) {
      console.error('加载食谱失败:', error);
      this.setData({ loading: false });
    }
  },

  selectCuisine(e: WechatMiniprogram.TouchEvent) {
    const cuisine = e.currentTarget.dataset.cuisine as string;
    this.setData({ selectedCuisine: cuisine, page: 1, recipes: [], hasMore: true });
    this.loadRecipes();
  },

  goToRecipeDetail(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/recipeDetail/index?id=${id}`,
    });
  },
});
