import type { IPageOption } from '../../../types/index';
import { api } from '../../utils/api';

interface LoginData {
  email: string;
  password: string;
  nickname: string;
  mode: 'login' | 'register';
  loading: boolean;
}

interface LoginOption extends IPageOption {
  data: LoginData;
}

const app = getApp();

Page<LoginData, LoginOption>({
  data: {
    email: '',
    password: '',
    nickname: '',
    mode: 'login',
    loading: false,
  },

  onLoad() {
    if (app.globalData.token) {
      wx.navigateBack();
    }
  },

  switchMode() {
    this.setData({
      mode: this.data.mode === 'login' ? 'register' : 'login',
    });
  },

  onEmailInput(e: WechatMiniprogram.InputInputDetail) {
    this.setData({ email: e.detail.value });
  },

  onPasswordInput(e: WechatMiniprogram.InputInputDetail) {
    this.setData({ password: e.detail.value });
  },

  onNicknameInput(e: WechatMiniprogram.InputInputDetail) {
    this.setData({ nickname: e.detail.value });
  },

  validateForm(): boolean {
    const { email, password, mode, nickname } = this.data;

    if (!email || !password) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      wx.showToast({ title: '请输入有效的邮箱', icon: 'none' });
      return false;
    }

    if (password.length < 6) {
      wx.showToast({ title: '密码至少6位', icon: 'none' });
      return false;
    }

    if (mode === 'register' && !nickname) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return false;
    }

    return true;
  },

  handleSubmit() {
    if (!this.validateForm()) return;

    this.setData({ loading: true });

    const { email, password, mode, nickname } = this.data;

    if (mode === 'login') {
      api.user
        .login({ email, password })
        .then((res) => {
          this.handleLoginSuccess(res);
        })
        .catch(() => {
          this.setData({ loading: false });
        });
    } else {
      api.user
        .register({ email, password, nickname })
        .then((res) => {
          this.handleLoginSuccess(res);
        })
        .catch(() => {
          this.setData({ loading: false });
        });
    }
  },

  handleLoginSuccess(res: any) {
    const { user, token } = res;

    app.globalData.token = token;
    app.globalData.userInfo = user;

    wx.setStorageSync('token', token);
    wx.setStorageSync('userInfo', user);

    wx.showToast({
      title: '登录成功',
      icon: 'success',
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },

  handleWechatLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('微信授权成功:', res);
        wx.showToast({ title: '微信登录开发中', icon: 'none' });
      },
      fail: () => {
        wx.showToast({ title: '授权失败', icon: 'none' });
      },
    });
  },

  goBack() {
    wx.navigateBack();
  },
});
