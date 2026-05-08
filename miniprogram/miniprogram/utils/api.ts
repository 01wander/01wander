import type { Recipe, Post, userInfo } from '../types';

const API_BASE_URL = 'https://api.example.com';

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
}

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

async function request<T = any>(options: RequestOptions): Promise<T> {
  const app = getApp();
  const { token } = app.globalData;

  const header: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.header,
  };

  if (token) {
    header['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header,
      success: (res) => {
        if (res.statusCode === 200) {
          const response = res.data as ApiResponse<T>;
          if (response.code === 0) {
            resolve(response.data);
          } else {
            wx.showToast({
              title: response.message || '请求失败',
              icon: 'none',
            });
            reject(new Error(response.message));
          }
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
}

export const api = {
  recipe: {
    list: (params?: { page?: number; limit?: number; cuisine?: string; difficulty?: string }) =>
      request<{ data: Recipe[]; pagination: any }>({
        url: '/api/recipes',
        method: 'GET',
        data: params,
      }),
    detail: (id: string) =>
      request<Recipe>({
        url: `/api/recipes/${id}`,
        method: 'GET',
      }),
  },

  user: {
    login: (data: { email: string; password: string }) =>
      request<{ user: userInfo; token: string }>({
        url: '/api/users/login',
        method: 'POST',
        data,
      }),
    register: (data: { email: string; password: string; nickname: string }) =>
      request<{ user: userInfo; token: string }>({
        url: '/api/users/register',
        method: 'POST',
        data,
      }),
    profile: () =>
      request<userInfo>({
        url: '/api/users/profile',
        method: 'GET',
      }),
  },

  progress: {
    get: () =>
      request<any>({
        url: '/api/progress',
        method: 'GET',
      }),
    start: (recipeId: string) =>
      request({
        url: `/api/progress/cook/${recipeId}`,
        method: 'POST',
      }),
    completeStep: (stepNumber: number) =>
      request({
        url: `/api/progress/step/${stepNumber}`,
        method: 'PUT',
      }),
    complete: (recipeId: string, data?: { rating?: number; photoUrl?: string }) =>
      request({
        url: `/api/progress/complete/${recipeId}`,
        method: 'POST',
        data,
      }),
  },

  community: {
    posts: (params?: { page?: number; limit?: number }) =>
      request<{ data: Post[]; pagination: any }>({
        url: '/api/community/posts',
        method: 'GET',
        data: params,
      }),
    like: (postId: string) =>
      request({
        url: `/api/community/posts/${postId}/like`,
        method: 'POST',
      }),
  },
};

export function formatTime(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return d.toLocaleDateString();
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return '#4CAF50';
    case 'medium':
      return '#FF9800';
    case 'hard':
      return '#F44336';
    default:
      return '#999';
  }
}

export function getDifficultyText(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return '简单';
    case 'medium':
      return '中等';
    case 'hard':
      return '困难';
    default:
      return difficulty;
  }
}
