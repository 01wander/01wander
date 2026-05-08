import { useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

interface TimerCardProps {
  id: string;
  name: string;
  duration: number;
}

export const TimerCard = ({ id, name, duration }: TimerCardProps) => {
  const { timers, startTimer, pauseTimer, resetTimer, resumeTimer } = useTimer();
  const timer = timers.find((t) => t.id === id);
  const remaining = timer?.remaining ?? duration;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isRunning = timer?.running ?? false;
  const progress = ((duration - remaining) / duration) * 100;

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleToggle = () => {
    if (isRunning) {
      pauseTimer(id);
    } else {
      if (remaining === duration) {
        startTimer(id, duration);
      } else {
        resumeTimer(id);
      }
    }
  };

  const handleReset = () => {
    resetTimer(id, duration);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-gray-700">{name}</span>
        </div>
        <span className="text-2xl font-mono font-bold text-orange-500">
          {formatTime(remaining)}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full transition-all duration-1000 ${isRunning ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-orange-300'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
            isRunning
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              暂停
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {remaining === duration ? '开始' : '继续'}
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
