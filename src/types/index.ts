export interface Ingredient {
  name: string;
  nameEn: string;
  quantity: string;
  unit: string;
  substitutes?: string[];
  description?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
}

export interface Timer {
  id: string;
  name: string;
  duration: number;
  stepNumber: number;
}

export interface Recipe {
  _id: string;
  name: string;
  nameEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  timers: Timer[];
  images: string[];
  videoUrl?: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar?: string;
  level: number;
  exp: number;
  title: string;
}

export interface CompletedRecipe {
  recipeId: string;
  recipeName: string;
  completedAt: string;
  rating?: number;
  photoUrl?: string;
}

export interface CookingSession {
  recipeId: string;
  currentStep: number;
  startedAt: string;
  completedSteps: number[];
}

export interface ProgressStats {
  totalCooked: number;
  streak: number;
  favoriteCuisine: string;
  heatmap: { date: string; count: number }[];
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

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  hashtag: string;
  startDate: string;
  endDate: string;
  participants: number;
  featured: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Cuisine = 'chinese' | 'western' | 'japanese' | 'korean' | 'thai' | 'italian' | 'french' | 'indian';

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';
