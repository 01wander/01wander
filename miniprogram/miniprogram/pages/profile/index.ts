import type { IPageOption } from '../../../types/index';
import { api } from '../../utils/api';

interface ProfileData {
  user: any | null;
  badges: any[];
  loading: boolean;
}

interface ProfileOption extends IPageOption {
  data: ProfileData;
  onLoad(): void;
}

const app = getApp();

Page<ProfileData, ProfileOption>({
  data: {
    user: null,
    badges: [],
    loading: true,
  },

  onLoad() {
    if (!app.globalData.token) {
      setTimeout(() => {
        wx.navigateTo({ url: '/pages/login/index' });
      }, 100);
      return;
    }
    this.loadProfile();
  },

  async loadProfile() {
    try {
      const user = await api.user.profile();
      this.setData({ user, loading: false });
    } catch (error) {
      console.error('加载用户信息失败:', error);
      this.setData({ loading: false });
    }
  },

  goToLogin() {
    wx.navigateTo({ url: '/pages/login/index' });
  },

  goToSettings() {
    wx.showToast({ title: '设置功能开发中', icon: 'none' });
  },

  goToFavorites() {
    wx.showToast({ title: '收藏功能开发中', icon: 'none' });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          app.globalData.token = '';
          app.globalData.userInfo = null;
          wx.navigateTo({ url: '/pages/login/index' });
        }
      },
    });
  },
});
