import { ChefHat, Mail, Github, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold">Global Flavor Kitchen</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              探索世界各地美食，从新手到大厨，让烹饪变得简单有趣。
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-orange-500 transition-colors">首页</a></li>
              <li><a href="/recipes" className="hover:text-orange-500 transition-colors">食谱大全</a></li>
              <li><a href="/community" className="hover:text-orange-500 transition-colors">美食社区</a></li>
              <li><a href="/progress" className="hover:text-orange-500 transition-colors">烹饪进度</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">菜系分类</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/recipes?cuisine=chinese" className="hover:text-orange-500 transition-colors">中餐</a></li>
              <li><a href="/recipes?cuisine=japanese" className="hover:text-orange-500 transition-colors">日料</a></li>
              <li><a href="/recipes?cuisine=korean" className="hover:text-orange-500 transition-colors">韩式</a></li>
              <li><a href="/recipes?cuisine=italian" className="hover:text-orange-500 transition-colors">意式</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Global Flavor Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
