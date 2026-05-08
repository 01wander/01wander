import { useState } from 'react';
import { Heart, MessageCircle, Share2, Camera, ChevronRight, Hash } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Community = () => {
  const posts = useStore((state) => state.posts);
  const toggleLike = useStore((state) => state.toggleLike);
  const challenges = useStore((state) => state.challenges);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState('');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">美食社区</h1>
            <p className="text-gray-500 mt-2">分享你的烹饪成果，与美食爱好者互动</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                  🧑
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="分享你的美食故事..."
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
                      <Camera className="w-5 h-5" />
                      <span>上传图片</span>
                    </button>
                    <button
                      onClick={() => setNewPostContent('')}
                      className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                    >
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.userAvatar}
                          alt={post.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">{post.userName}</div>
                          <div className="text-sm text-gray-400">{formatDate(post.createdAt)}</div>
                        </div>
                      </div>
                      {post.recipeId && (
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-full">
                          {post.recipeName}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-gray-600">{post.content}</p>
                    {post.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {post.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="美食图片"
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>分享</span>
                    </button>
                  </div>
                  {selectedPost === post.id && (
                    <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="写下你的评论..."
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600">
                          发送
                        </button>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            U
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-xl p-3">
                            <div className="font-medium text-gray-800">用户1</div>
                            <div className="text-gray-600 text-sm">看起来真不错！</div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            U
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-xl p-3">
                            <div className="font-medium text-gray-800">用户2</div>
                            <div className="text-gray-600 text-sm">教程在哪里？想学！</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">热门挑战</h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-gray-800">{challenge.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{challenge.participants}人参与</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">加入挑战</h3>
              <p className="text-white/80 text-sm mb-4">参与每周话题挑战，赢取专属勋章</p>
              <button className="w-full py-2 bg-white text-orange-500 rounded-full font-medium hover:bg-gray-100 transition-colors">
                查看所有挑战
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
