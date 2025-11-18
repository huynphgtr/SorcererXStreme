
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Star, 
  Moon, 
  Hash, 
  MessageCircle,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { Sidebar } from '@/components/layout/Sidebar';
import { BreakupStatusBanner } from '@/components/ui/BreakupStatusBanner';
import Link from 'next/link';

const tools = [
  {
    name: 'AI Chat',
    description: 'Trò chuyện với AI huyền thuật',
    icon: MessageCircle,
    href: '/chat',
    color: 'from-blue-600 to-blue-700'
  },
  {
    name: 'Tarot',
    description: 'Xem bài Tarot dự đoán tương lai',
    icon: Sparkles,
    href: '/tarot',
    color: 'from-purple-600 to-purple-700'
  },
  {
    name: 'Chiêm Tinh',
    description: 'Khám phá vận mệnh qua sao',
    icon: Star,
    href: '/astrology',
    color: 'from-yellow-600 to-yellow-700'
  },
  {
    name: 'Tử Vi',
    description: 'Xem tử vi theo ngày sinh',
    icon: Moon,
    href: '/fortune',
    color: 'from-indigo-600 to-indigo-700'
  },
  {
    name: 'Thần Số Học',
    description: 'Khám phá ý nghĩa con số',
    icon: Hash,
    href: '/numerology',
    color: 'from-green-600 to-green-700'
  }
];

const stats = [
  {
    label: 'Lượt sử dụng hôm nay',
    value: '12',
    icon: TrendingUp,
    color: 'text-green-400'
  },
  {
    label: 'Công cụ yêu thích',
    value: 'Tarot',
    icon: Sparkles,
    color: 'text-purple-400'
  },
  {
    label: 'Lần cuối truy cập',
    value: 'Hôm nay',
    icon: Clock,
    color: 'text-blue-400'
  }
];

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.isProfileComplete) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.isProfileComplete) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-950" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Chào mừng trở lại, {user.name}! 🌟
            </h1>
            <p className="text-gray-400">
              Khám phá thế giới huyền bí với các công cụ AI tiên tiến
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-red-500/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                      <motion.p 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        className="text-2xl font-bold text-white"
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tools Grid */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-white mb-6"
            >
              Công cụ huyền thuật
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.href} href={tool.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-br from-gray-800/70 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 shadow-lg hover:shadow-red-500/30 cursor-pointer group transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-lg relative z-10`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{tool.name}</h3>
                      <p className="text-gray-400 text-sm">{tool.description}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="text-xl font-bold text-white mb-6"
            >
              Hoạt động gần đây
            </motion.h2>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30 shadow-lg"
            >
              <div className="text-center py-12">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-gray-400 mb-2"
                >
                  Chưa có hoạt động nào
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-sm text-gray-500"
                >
                  Bắt đầu khám phá các công cụ huyền thuật để xem lịch sử tại đây
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
