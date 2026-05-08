import { create } from 'zustand';
import { Recipe, User, Post, Badge, Challenge, CompletedRecipe, CookingSession, ProgressStats } from '../types';
import { mockRecipes, mockUser, mockPosts, mockBadges, mockChallenges } from '../data/mockData';

interface Store {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  user: User | null;
  posts: Post[];
  badges: Badge[];
  challenges: Challenge[];
  completedRecipes: CompletedRecipe[];
  cookingSession: CookingSession | null;
  progressStats: ProgressStats;
  isLoggedIn: boolean;
  searchQuery: string;
  selectedDifficulty: string;
  selectedCuisine: string;
  cookingStep: number;
  completedSteps: number[];
  timers: { id: string; remaining: number; running: boolean }[];

  setCurrentRecipe: (recipe: Recipe | null) => void;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addCompletedRecipe: (recipeId: string, recipeName: string, photoUrl?: string) => void;
  startCooking: (recipeId: string) => void;
  completeStep: (stepNumber: number) => void;
  completeCooking: (recipeId: string, photoUrl?: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedCuisine: (cuisine: string) => void;
  setCookingStep: (step: number) => void;
  startTimer: (id: string, duration: number) => void;
  stopTimer: (id: string) => void;
  updateTimer: (id: string, remaining: number) => void;
  toggleLike: (postId: string) => void;
  filteredRecipes: () => Recipe[];
}

const generateHeatmap = () => {
  const heatmap = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
    heatmap.push({ date: dateStr, count });
  }
  return heatmap;
};

export const useStore = create<Store>((set, get) => ({
  recipes: mockRecipes,
  currentRecipe: null,
  user: mockUser,
  posts: mockPosts,
  badges: mockBadges,
  challenges: mockChallenges,
  completedRecipes: [
    { recipeId: '1', recipeName: '番茄炒蛋', completedAt: '2024-01-10', rating: 5 },
    { recipeId: '3', recipeName: '日式咖喱饭', completedAt: '2024-01-12', rating: 4 },
    { recipeId: '9', recipeName: '简易拌面', completedAt: '2024-01-14', rating: 5 },
  ],
  cookingSession: null,
  progressStats: {
    totalCooked: 15,
    streak: 7,
    favoriteCuisine: 'chinese',
    heatmap: generateHeatmap(),
  },
  isLoggedIn: true,
  searchQuery: '',
  selectedDifficulty: '',
  selectedCuisine: '',
  cookingStep: 0,
  completedSteps: [],
  timers: [],

  setCurrentRecipe: (recipe) => set({ currentRecipe: recipe }),

  setUser: (user) => set({ user }),

  login: (email, password) => {
    if (email === 'user@example.com' && password === '123456') {
      set({ user: mockUser, isLoggedIn: true });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null, isLoggedIn: false, cookingSession: null }),

  addCompletedRecipe: (recipeId, recipeName, photoUrl) => {
    const newCompleted: CompletedRecipe = {
      recipeId,
      recipeName,
      completedAt: new Date().toISOString().split('T')[0],
      photoUrl,
    };
    set((state) => ({
      completedRecipes: [...state.completedRecipes, newCompleted],
    }));
  },

  startCooking: (recipeId) => {
    const session: CookingSession = {
      recipeId,
      currentStep: 1,
      startedAt: new Date().toISOString(),
      completedSteps: [],
    };
    set({ cookingSession: session, cookingStep: 1, completedSteps: [] });
  },

  completeStep: (stepNumber) => {
    set((state) => {
      const newCompletedSteps = [...state.completedSteps, stepNumber];
      const newCookingSession = state.cookingSession
        ? {
            ...state.cookingSession,
            currentStep: stepNumber + 1,
            completedSteps: newCompletedSteps,
          }
        : undefined;
      return {
        completedSteps: newCompletedSteps,
        cookingStep: stepNumber + 1,
        cookingSession: newCookingSession,
      };
    });
  },

  completeCooking: (recipeId, photoUrl) => {
    const recipe = get().recipes.find((r) => r._id === recipeId);
    if (recipe) {
      get().addCompletedRecipe(recipeId, recipe.name, photoUrl);
    }
    set({
      cookingSession: null,
      cookingStep: 0,
      completedSteps: [],
      progressStats: {
        ...get().progressStats,
        totalCooked: get().progressStats.totalCooked + 1,
      },
    });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),

  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine }),

  setCookingStep: (step) => set({ cookingStep: step }),

  startTimer: (id, duration) => {
    set((state) => ({
      timers: [...state.timers, { id, remaining: duration, running: true }],
    }));
  },

  stopTimer: (id) => {
    set((state) => ({
      timers: state.timers.map((t) => (t.id === id ? { ...t, running: false } : t)),
    }));
  },

  updateTimer: (id, remaining) => {
    set((state) => ({
      timers: state.timers.map((t) => (t.id === id ? { ...t, remaining } : t)),
    }));
  },

  toggleLike: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      ),
    }));
  },

  filteredRecipes: () => {
    const { recipes, searchQuery, selectedDifficulty, selectedCuisine } = get();
    return recipes.filter((recipe) => {
      const matchesSearch =
        !searchQuery ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
      const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine;
      return matchesSearch && matchesDifficulty && matchesCuisine;
    });
  },
}));
