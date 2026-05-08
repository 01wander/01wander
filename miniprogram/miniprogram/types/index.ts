const app = getApp<IAppOption>();

export interface IAppOption {
  globalData: {
    userInfo: userInfo | null;
    token: string;
    apiBaseUrl: string;
  };
  onLaunch?(): void;
  onShow?(): void;
  onHide?(): void;
}

export interface userInfo {
  id: string;
  nickname: string;
  avatar: string;
  level: number;
  title: string;
  exp: number;
}

export interface Recipe {
  _id: string;
  name: string;
  nameEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  cookTime: number;
  servings: number;
  images: string[];
  description: string;
  tags: string[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  recipeId?: string;
  recipeName?: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  liked: boolean;
  createdAt: string;
}
