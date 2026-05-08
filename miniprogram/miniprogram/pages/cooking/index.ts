import type { IPageOption } from '../../../types/index';
import { api } from '../../utils/api';

interface CookingData {
  recipe: any | null;
  currentStep: number;
  completedSteps: number[];
  timers: any[];
  loading: boolean;
  showPhotoModal: boolean;
}

interface CookingOption extends IPageOption {
  data: CookingData;
  onLoad(options: { id: string }): void;
  onUnload(): void;
}

const app = getApp();

Page<CookingData, CookingOption>({
  data: {
    recipe: null,
    currentStep: 1,
    completedSteps: [],
    timers: [],
    loading: true,
    showPhotoModal: false,
  },

  onLoad(options) {
    if (options.id) {
      this.loadRecipe(options.id);
      this.initCookingSession(options.id);
    }
  },

  onUnload() {
    this.data.timers.forEach((timer: any) => {
      if (timer.interval) {
        clearInterval(timer.interval);
      }
    });
  },

  async loadRecipe(id: string) {
    try {
      const recipe = await api.recipe.detail(id);
      this.setData({ recipe, loading: false });
      wx.setNavigationBarTitle({ title: recipe.name });
    } catch (error) {
      console.error('加载食谱失败:', error);
      wx.showToast({ title: '加载失败', icon: 'none' });
      this.setData({ loading: false });
    }
  },

  async initCookingSession(recipeId: string) {
    try {
      await api.progress.start(recipeId);
    } catch (error) {
      console.error('初始化烹饪会话失败:', error);
    }
  },

  prevStep() {
    const { currentStep } = this.data;
    if (currentStep > 1) {
      this.setData({ currentStep: currentStep - 1 });
      this.saveProgress();
    }
  },

  nextStep() {
    const { currentStep, recipe } = this.data;
    if (recipe && currentStep < recipe.steps.length) {
      this.setData({ currentStep: currentStep + 1 });
      this.checkTimer();
      this.saveProgress();
    }
  },

  checkTimer() {
    const { recipe, currentStep, timers } = this.data;
    if (!recipe) return;

    const stepTimer = recipe.timers.find((t: any) => t.stepNumber === currentStep);
    if (stepTimer) {
      const exists = timers.find((t: any) => t.id === stepTimer.id);
      if (!exists) {
        this.startTimer(stepTimer);
      }
    }
  },

  startTimer(timer: any) {
    const { timers } = this.data;
    const remaining = timer.duration;

    this.setData({
      timers: [...timers, { ...timer, remaining, running: true, interval: null }],
    });

    const timerIndex = this.data.timers.length - 1;
    const interval = setInterval(() => {
      const currentTimers = this.data.timers;
      if (currentTimers[timerIndex] && currentTimers[timerIndex].running) {
        if (currentTimers[timerIndex].remaining > 0) {
          currentTimers[timerIndex].remaining -= 1;
          this.setData({ timers: [...currentTimers] });
        } else {
          this.pauseTimer(timerIndex);
          wx.showToast({ title: `${timer.name} 时间到!`, icon: 'none' });
        }
      }
    }, 1000);

    this.data.timers[timerIndex].interval = interval;
  },

  pauseTimer(index: number) {
    const timers = this.data.timers;
    if (timers[index]) {
      if (timers[index].interval) {
        clearInterval(timers[index].interval);
      }
      timers[index].running = false;
      this.setData({ timers: [...timers] });
    }
  },

  resumeTimer(index: number) {
    const timers = this.data.timers;
    if (timers[index] && !timers[index].running) {
      timers[index].running = true;
      const interval = setInterval(() => {
        if (timers[index] && timers[index].running && timers[index].remaining > 0) {
          timers[index].remaining -= 1;
          this.setData({ timers: [...timers] });
        } else if (timers[index] && timers[index].remaining <= 0) {
          this.pauseTimer(index);
          wx.showToast({ title: `${timers[index].name} 时间到!`, icon: 'none' });
        }
      }, 1000);
      timers[index].interval = interval;
      this.setData({ timers: [...timers] });
    }
  },

  completeStep() {
    const { currentStep, completedSteps, recipe } = this.data;
    if (!recipe) return;

    if (!completedSteps.includes(currentStep)) {
      this.setData({ completedSteps: [...completedSteps, currentStep] });
      api.progress.completeStep(currentStep).catch(console.error);
    }

    if (currentStep >= recipe.steps.length) {
      this.showCompleteModal();
    } else {
      this.nextStep();
    }
  },

  showCompleteModal() {
    wx.showModal({
      title: '恭喜完成!',
      content: '恭喜你完成了这道菜的制作，快上传你的作品吧!',
      confirmText: '上传作品',
      cancelText: '稍后上传',
      success: (res) => {
        if (res.confirm) {
          this.setData({ showPhotoModal: true });
        } else {
          this.completeCooking();
        }
      },
    });
  },

  completeCooking(data?: any) {
    const { recipe } = this.data;
    if (!recipe) return;

    api.progress.complete(recipe._id, data).then(() => {
      wx.redirectTo({
        url: '/pages/progress/index',
      });
    }).catch(() => {
      wx.redirectTo({
        url: '/pages/progress/index',
      });
    });
  },

  saveProgress() {
    const { currentStep } = this.data;
    wx.setStorageSync('cooking_step', currentStep);
  },

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },
});
