import { useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';

export const useTimer = () => {
  const timers = useStore((state) => state.timers);
  const updateTimer = useStore((state) => state.updateTimer);
  const stopTimer = useStore((state) => state.stopTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach((timer) => {
        if (timer.running && timer.remaining > 0) {
          updateTimer(timer.id, timer.remaining - 1);
        } else if (timer.running && timer.remaining === 0) {
          stopTimer(timer.id);
          if (Notification.permission === 'granted') {
            new Notification('计时器提醒', {
              body: `${timers.find((t) => t.id === timer.id)?.id} 时间到！`,
            });
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, updateTimer, stopTimer]);

  const startTimer = useCallback((id: string, duration: number) => {
    useStore.getState().startTimer(id, duration);
  }, []);

  const pauseTimer = useCallback((id: string) => {
    stopTimer(id);
  }, [stopTimer]);

  const resetTimer = useCallback((id: string, duration: number) => {
    updateTimer(id, duration);
    stopTimer(id);
  }, [updateTimer, stopTimer]);

  const resumeTimer = useCallback((id: string) => {
    const timer = timers.find((t) => t.id === id);
    if (timer && timer.remaining > 0) {
      useStore.getState().startTimer(id, timer.remaining);
    }
  }, [timers]);

  return {
    timers,
    startTimer,
    pauseTimer,
    resetTimer,
    resumeTimer,
  };
};
