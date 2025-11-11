'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { VIPBadge, VIPGlow } from '@/components/ui/VIPBadge';
import { VIPUpgradePopup } from '@/components/vip/VIPUpgradePopup';
import { VIPFeatureLocked } from '@/components/vip/VIPFeatureLocked';
import { VIPOnlyLabel, VIPCardWrapper } from '@/components/vip/VIPComponents';
import { Button } from '@/components/ui/Button';
import { 
  Crown, 
  Sparkles, 
  Star, 
  Zap,
  Lock,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function VIPDemoPage() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto ml-64">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-10 h-10 text-yellow-400 fill-yellow-400" />
              <h1 className="text-4xl font-bold text-white">
                VIP UI Components Showcase
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Prototype các component UI cho hệ thống VIP
            </p>
          </motion.div>

          {/* VIP Badges Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              VIP Badges
            </h2>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">Size Variations</h3>
                  <div className="flex items-center gap-4 flex-wrap">
                    <VIPBadge size="sm" />
                    <VIPBadge size="md" />
                    <VIPBadge size="lg" />
                    <VIPBadge size="sm" showText={false} />
                    <VIPBadge size="md" showText={false} />
                    <VIPBadge size="lg" showText={false} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-4">With Glow Effect</h3>
                  <div className="flex items-center gap-6">
                    <VIPGlow>
                      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <p className="text-white font-medium">Premium Feature</p>
                      </div>
                    </VIPGlow>
                    <VIPOnlyLabel size="sm" />
                    <VIPOnlyLabel size="md" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VIP Card Wrapper */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              VIP Card Wrappers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Regular Card */}
              <VIPCardWrapper isVIP={false}>
                <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                  <Zap className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Tính năng thường</h3>
                  <p className="text-gray-400">Miễn phí cho tất cả người dùng</p>
                </div>
              </VIPCardWrapper>

              {/* VIP Card */}
              <VIPCardWrapper isVIP={true}>
                <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                  <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400 mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Tính năng VIP</h3>
                  <p className="text-gray-400">Dành riêng cho thành viên VIP</p>
                </div>
              </VIPCardWrapper>

              {/* VIP Card No Badge */}
              <VIPCardWrapper isVIP={true} showBadge={false}>
                <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                  <Shield className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">VIP không badge</h3>
                  <p className="text-gray-400">Hover để xem hiệu ứng</p>
                </div>
              </VIPCardWrapper>
            </div>
          </section>

          {/* VIP Feature Locked */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-yellow-400" />
              VIP Feature Locked Overlay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* With Content Blur */}
              <VIPFeatureLocked
                featureName="Biểu đồ chiêm tinh nâng cao"
                description="Nâng cấp VIP để xem biểu đồ chi tiết và phân tích sâu"
                blur={true}
              >
                <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
                  <div className="space-y-4">
                    <div className="h-40 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center">
                      <Star className="w-16 h-16 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Biểu đồ chi tiết</h3>
                    <p className="text-gray-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                  </div>
                </div>
              </VIPFeatureLocked>

              {/* Without Content */}
              <VIPFeatureLocked
                featureName="Chat AI không giới hạn"
                description="Trò chuyện với AI huyền bí không giới hạn lượt"
              />
            </div>
          </section>

          {/* Upgrade Popup Demo */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              VIP Upgrade Popup
            </h2>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
              <p className="text-gray-300 mb-6">
                Click nút bên dưới để xem popup nâng cấp VIP (xuất hiện khi user cố truy cập tính năng VIP)
              </p>
              <Button
                onClick={() => setShowPopup(true)}
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold border-2 border-yellow-300"
              >
                <Crown className="w-5 h-5 mr-2" />
                Mở Popup Nâng cấp
              </Button>
            </div>
          </section>

          {/* User Experience Flow */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              User Flow: Thường → VIP
            </h2>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center"
                >
                  <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Tài khoản thường</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      User sử dụng tính năng cơ bản, bị giới hạn lượt
                    </p>
                    <div className="inline-block px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs">
                      FREE
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center"
                >
                  <div className="bg-gray-800/60 rounded-2xl p-6 border border-yellow-500/30 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-gray-900">2</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Xem popup VIP</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Popup xuất hiện khi truy cập tính năng VIP
                    </p>
                    <Lock className="w-8 h-8 text-yellow-400 mx-auto" />
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-2xl p-6 border-2 border-yellow-500 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-8 h-8 text-gray-900 fill-gray-900" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Thành viên VIP</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Truy cập không giới hạn mọi tính năng
                    </p>
                    <VIPBadge size="md" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Design Specs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Design Specifications</h2>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">🎨 Color Palette</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                      <span>VIP Gold: yellow-400 → amber-500</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-900"></div>
                      <span>Background: gray-900/950</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded border border-yellow-500/30 bg-yellow-500/10"></div>
                      <span>VIP Highlight: yellow-500/30</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">✨ Key Features</h3>
                  <ul className="space-y-2 text-gray-300 list-disc list-inside">
                    <li>Dark theme với accent vàng sang trọng</li>
                    <li>Animations mượt mà với Framer Motion</li>
                    <li>Responsive design (mobile + desktop)</li>
                    <li>Glassmorphism backdrop-blur effects</li>
                    <li>Gradient overlays cho depth</li>
                    <li>Micro-interactions trên hover/tap</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Guide */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">📱 Navigation Guide</h2>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-4 text-gray-300">
                <p><strong className="text-yellow-400">/vip</strong> - Trang giới thiệu VIP (landing page)</p>
                <p><strong className="text-yellow-400">/vip/plans</strong> - Trang chọn gói VIP và thanh toán</p>
                <p><strong className="text-yellow-400">/vip/demo</strong> - Trang demo này (showcase components)</p>
                <hr className="border-gray-700" />
                <p className="text-sm text-gray-400">
                  💡 Tip: Check sidebar để thấy nút "Nâng cấp VIP" đã được thêm vào
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Demo Popup */}
      <VIPUpgradePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        featureName="tính năng demo"
      />
    </div>
  );
}
