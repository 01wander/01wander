import type { IPageOption } from '../../../types/index';
import { api, formatTime } from '../../utils/api';

interface CommunityData {
  posts: any[];
  loading: boolean;
  page: number;
  hasMore: boolean;
}

interface CommunityOption extends IPageOption {
  data: CommunityData;
  onLoad(): void;
  onPullDownRefresh(): void;
  onReachBottom(): void;
}

Page<CommunityData, CommunityOption>({
  data: {
    posts: [],
    loading: true,
    page: 1,
    hasMore: true,
  },

  onLoad() {
    this.loadPosts();
  },

  onPullDownRefresh() {
    this.setData({ page: 1, posts: [], hasMore: true });
    this.loadPosts().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.setData({ page: this.data.page + 1 });
      this.loadPosts(true);
    }
  },

  async loadPosts(append = false) {
    try {
      this.setData({ loading: true });
      const res = await api.community.posts({ page: this.data.page, limit: 10 });
      const posts = append ? [...this.data.posts, ...res.data] : res.data;
      this.setData({ posts, loading: false, hasMore: res.data.length >= 10 });
    } catch (error) {
      console.error('加载帖子失败:', error);
      this.setData({ loading: false });
    }
  },

  likePost(e: WechatMiniprogram.TouchEvent) {
    const postId = e.currentTarget.dataset.id;
    const posts = this.data.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });
    this.setData({ posts });
    api.community.like(postId).catch(console.error);
  },

  goToRecipe(e: WechatMiniprogram.TouchEvent) {
    const recipeId = e.currentTarget.dataset.recipeid;
    if (recipeId) {
      wx.navigateTo({
        url: `/pages/recipeDetail/index?id=${recipeId}`,
      });
    }
  },

  previewImages(e: WechatMiniprogram.TouchEvent) {
    const urls = e.currentTarget.dataset.urls as string[];
    wx.previewImage({
      current: e.currentTarget.dataset.current as string,
      urls: urls,
    });
  },

  goToProfile(e: WechatMiniprogram.TouchEvent) {
    const userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: `/pages/profile/index?userId=${userId}`,
    });
  },
});
