
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
import { VIPTier } from '@/lib/vip-types';

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
  
  // Check if user is VIP
  const isVIP = user?.vipTier === VIPTier.VIP || user?.vipTier === 'VIP';
  const vipExpiresAt = user?.vipExpiresAt ? new Date(user.vipExpiresAt) : null;

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className={cn(
        "w-64 h-screen backdrop-blur-xl border-r flex flex-col shadow-2xl fixed left-0 top-0 z-50",
        isVIP 
          ? "bg-gradient-to-b from-gray-900/95 via-yellow-900/10 to-gray-900/95 border-yellow-500/30 shadow-yellow-500/20" 
          : "bg-gradient-to-b from-gray-900/90 via-gray-900/85 to-gray-900/90 border-gray-700/50"
      )}
      style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={cn(
          "p-5 border-b flex-shrink-0",
          isVIP ? "border-yellow-500/30" : "border-gray-700/50"
        )}
      >
        <Link href="/dashboard">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="flex items-center justify-between mb-1">
              <h1 className={cn(
                "text-xl font-bold bg-clip-text text-transparent cursor-pointer leading-tight",
                isVIP 
                  ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-400" 
                  : "bg-gradient-to-r from-red-500 via-red-600 to-orange-500"
              )}>
                SorcererXStreme
              </h1>
              {isVIP && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </motion.div>
              )}
            </div>
            <p className={cn(
              "text-xs",
              isVIP ? "text-yellow-300/80" : "text-gray-400"
            )}>
              Huyền thuật AI {isVIP && '• VIP Premium'}
            </p>
          </motion.div>
        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer",
                    isActive 
                      ? isVIP
                        ? "bg-gradient-to-r from-yellow-600/20 to-amber-700/20 text-yellow-100 border border-yellow-500/40 shadow-lg shadow-yellow-500/20"
                        : "bg-gradient-to-r from-red-600/30 to-red-700/30 text-white border border-red-500/30 shadow-lg shadow-red-500/10"
                      : isVIP
                        ? "text-yellow-200/70 hover:text-yellow-100 hover:bg-yellow-600/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={cn(
                        "ml-auto w-2 h-2 rounded-full",
                        isVIP ? "bg-yellow-400" : "bg-red-500"
                      )}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
          
          {/* VIP Status / Upgrade Button */}
          {isVIP ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-600/30 to-amber-700/30 border border-yellow-500/50 shadow-lg shadow-yellow-500/30"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-bold text-yellow-100">VIP Premium</span>
              </div>
              {vipExpiresAt && (
                <div className="text-xs text-yellow-300/70">
                  Hết hạn: {vipExpiresAt.toLocaleDateString('vi-VN')}
                </div>
              )}
              <div className="mt-2 text-xs text-yellow-200/60">
                Không giới hạn sử dụng
              </div>
            </motion.div>
          ) : (
            <Link href="/vip">
              <motion.div
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer bg-gradient-to-r from-yellow-600/20 to-amber-700/20 text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/50 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 mt-4"
              >
                <Crown className="w-5 h-5 fill-yellow-400" />
                <span className="font-bold">Nâng cấp VIP</span>
              </motion.div>
            </Link>
          )}
        </div>
      </nav>

      {/* User Section */}
      <div className={cn(
        "p-4 border-t flex-shrink-0",
        isVIP ? "border-yellow-500/30 bg-yellow-600/5" : "border-gray-700/50"
      )}>
        <div className="flex items-center space-x-3 mb-4">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 relative",
            isVIP 
              ? "bg-gradient-to-br from-yellow-500 to-amber-600" 
              : "bg-gradient-to-br from-red-600 to-red-700"
          )}>
            <User className="w-5 h-5 text-white" />
            {isVIP && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="w-2.5 h-2.5 text-gray-900 fill-gray-900" />
              </motion.div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-sm font-medium truncate",
                isVIP ? "text-yellow-100" : "text-white"
              )}>
                {user?.name || 'Người dùng'}
              </p>
              {isVIP && <VIPBadge tier={VIPTier.VIP} size="sm" animated={false} showText={false} />}
            </div>
            <p className={cn(
              "text-xs truncate",
              isVIP ? "text-yellow-300/70" : "text-gray-400"
            )}>
              {user?.email}
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ x: 4 }}
          onClick={handleLogout}
          className={cn(
            "flex items-center space-x-3 px-4 py-2 transition-colors w-full cursor-pointer rounded-lg",
            isVIP
              ? "text-yellow-300/70 hover:text-red-400 hover:bg-yellow-600/10"
              : "text-gray-400 hover:text-red-400 hover:bg-gray-800/30"
          )}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Đăng xuất</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
