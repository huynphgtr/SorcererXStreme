
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  MessageCircle, 
  Sparkles, 
  Star, 
  Moon, 
  Hash,
  LogOut,
  User,
  Settings,
  Crown
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { VIPBadge } from '@/components/ui/VIPBadge';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'AI Chat',
    href: '/chat',
    icon: MessageCircle
  },
  {
    name: 'Tarot',
    href: '/tarot',
    icon: Sparkles
  },
  {
    name: 'Chiêm Tinh',
    href: '/astrology',
    icon: Star
  },
  {
    name: 'Tử Vi',
    href: '/fortune',
    icon: Moon
  },
  {
    name: 'Thần Số Học',
    href: '/numerology',
    icon: Hash
  },
  {
    name: 'Hồ Sơ',
    href: '/profile',
    icon: Settings
  }
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 h-screen bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 flex flex-col shadow-2xl fixed left-0 top-0 z-50"
      style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50 flex-shrink-0">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent cursor-pointer">
            SorcererXStreme
          </h1>
        </Link>
        <p className="text-sm text-gray-400 mt-1">Huyền thuật AI</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive 
                      ? "bg-gradient-to-r from-red-600/30 to-red-700/30 text-white border border-red-500/30 shadow-lg shadow-red-500/10" 
                      : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
          
          {/* VIP Upgrade Button */}
          <Link href="/vip">
            <motion.div
              whileHover={{ x: 4, scale: 1.02 }}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer bg-gradient-to-r from-yellow-600/20 to-amber-700/20 text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/50 shadow-lg shadow-yellow-500/10 mt-4"
            >
              <Crown className="w-5 h-5 fill-yellow-400" />
              <span className="font-bold">Nâng cấp VIP</span>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700/50 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Người dùng'}</p>
              {/* Show VIP badge if user is VIP */}
              {/* <VIPBadge size="sm" animated={false} /> */}
            </div>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ x: 4 }}
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors w-full cursor-pointer rounded-lg hover:bg-gray-800/30"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Đăng xuất</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
