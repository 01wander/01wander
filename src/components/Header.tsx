import { useState } from 'react';
import { Search, Menu, X, User, ChefHat } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    if (location.pathname !== '/recipes') {
      navigate('/recipes');
    }
  };

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/recipes', label: '食谱' },
    { path: '/community', label: '社区' },
    { path: '/progress', label: '进度' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <ChefHat className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Global Flavor Kitchen
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-gray-600 hover:text-orange-500 transition-colors ${
                  location.pathname === item.path ? 'text-orange-500 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <input
                type="text"
                value={searchValue || searchQuery}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索食谱..."
                className="w-48 sm:w-64 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <button
              onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isLoggedIn && user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.nickname}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-left ${
                    location.pathname === item.path ? 'bg-orange-50 text-orange-500' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <form onSubmit={handleSearch} className="mt-4 px-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="搜索食谱..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-orange-500 text-white rounded-full"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
