import { useState } from 'react';

interface ShareProps {
  title: string;
  text: string;
  url: string;
  image?: string;
}

export function useShare() {
  const [sharing, setSharing] = useState(false);

  const shareToWechat = async (data: ShareProps): Promise<boolean> => {
    setSharing(true);
    try {
      if (typeof wx !== 'undefined' && wx.miniProgram) {
        wx.miniProgram.navigateTo({
          url: '/pages/share/index',
        });
        return true;
      }

      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: data.url,
        });
        return true;
      }

      await navigator.clipboard.writeText(data.url);
      return true;
    } catch (error) {
      console.error('Share error:', error);
      return false;
    } finally {
      setSharing(false);
    }
  };

  const shareToMoments = async (data: ShareProps): Promise<boolean> => {
    setSharing(true);
    try {
      if (typeof wx !== 'undefined' && wx.updateAppMessageShareData) {
        wx.updateAppMessageShareData({
          title: data.title,
          desc: data.text,
          link: data.url,
          imgUrl: data.image,
        });
        return true;
      }

      await navigator.clipboard.writeText(data.url);
      return true;
    } catch (error) {
      console.error('Share to moments error:', error);
      return false;
    } finally {
      setSharing(false);
    }
  };

  const copyLink = async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Copy link error:', error);
      return false;
    }
  };

  return {
    sharing,
    shareToWechat,
    shareToMoments,
    copyLink,
  };
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareProps;
  onShare: (type: 'wechat' | 'moments' | 'copy') => void;
}

export function ShareModal({ isOpen, onClose, data, onShare }: ShareModalProps) {
  if (!isOpen) return null;

  const handleShare = (type: 'wechat' | 'moments' | 'copy') => {
    onShare(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-t-2xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-around mb-6">
          <button className="flex flex-col items-center" onClick={() => handleShare('wechat')}>
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89a5.718 5.718 0 0 0-.406-.032zm-1.834 2.994c.536 0 .97.44.97.983a.976.976 0 0 1-.97.983.976.976 0 0 1-.97-.983c0-.542.434-.983.97-.983zm4.857 0c.536 0 .97.44.97.983a.976.976 0 0 1-.97.983.976.976 0 0 1-.97-.983c0-.542.434-.983.97-.983z"/>
              </svg>
            </div>
            <span className="text-sm text-gray-600">微信好友</span>
          </button>

          <button className="flex flex-col items-center" onClick={() => handleShare('moments')}>
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
              </svg>
            </div>
            <span className="text-sm text-gray-600">朋友圈</span>
          </button>

          <button className="flex flex-col items-center" onClick={() => handleShare('copy')}>
            <div className="w-14 h-14 bg-gray-500 rounded-full flex items-center justify-center mb-2">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
              </svg>
            </div>
            <span className="text-sm text-gray-600">复制链接</span>
          </button>
        </div>

        <button className="w-full py-3 text-gray-500 border-t border-gray-200" onClick={onClose}>
          取消
        </button>
      </div>
    </div>
  );
}
