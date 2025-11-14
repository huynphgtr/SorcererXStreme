'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Check, 
  Sparkles, 
  Zap, 
  Star, 
  Shield, 
  ArrowLeft,
  CreditCard,
  Gift,
  Infinity as InfinityIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sidebar } from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';
import { VIPBadge } from '@/components/ui/VIPBadge';
import { subscriptionApi } from '@/lib/api-client';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { VIPPlanInfo, VIPTier } from '@/lib/vip-types';

const VIP_PLANS_DISPLAY: (VIPPlanInfo & { badge?: string })[] = [
  {
    tier: VIPTier.FREE,
    name: 'Miễn phí',
    nameEn: 'Free Tier',
    price: 0,
    duration: 'mãi mãi',
    color: 'from-gray-500 to-gray-600',
    description: 'Trải nghiệm các tính năng cơ bản',
    icon: '✨',
    features: [
      '3 lượt xem Tarot/ngày',
      'Rút 3 lá bài',
      'Lưu lịch sử 7 ngày',
      '10 tin nhắn chat AI/ngày',
      '1 phân tích tử vi/ngày',
      '1 phân tích thần số học/ngày',
      'Không có biểu đồ 3D',
      
    ]
  },
  {
    tier: VIPTier.VIP,
    name: 'VIP',
    nameEn: 'VIP',
    price: 50000,
    duration: 'tháng',
    color: 'from-blue-500 to-cyan-500',
    description: 'Đầy đủ tính năng với giới hạn hợp lý',
    icon: '👑',
    badge: 'PHỔ BIẾN',
    popular: true,
    features: [
      '20 lượt xem Tarot/ngày',
      'Rút 3, 5, hoặc 7 lá bài',
      'Lưu lịch sử 30 ngày',
      '100 tin nhắn chat AI/ngày',
      '10 phân tích tử vi/ngày',
      '5 phân tích tử vi/ngày',
      '5 phân tích thần số học/ngày',
      'Biểu đồ 3D đầy đủ',
      'Giao diện tùy chỉnh',
      'Tử vi tổng quát'
    ]
  },
  {
    tier: VIPTier.SORCERER,
    name: 'Phù Thủy',
    nameEn: 'Sorcerer',
    price: 99000,
    duration: 'tháng',
    color: 'from-purple-500 to-pink-500',
    description: 'Không giới hạn + Ưu tiên tính năng mới',
    icon: '🔮',
    badge: 'ĐỈNH CAO',
    features: [
      '♾️ Xem Tarot không giới hạn',
      'Rút 3, 5, 7, 10 lá bài',
      'Lưu lịch sử vô hạn',
      '♾️ Chat AI không giới hạn',
      '♾️ Tử vi không giới hạn',
      '♾️ Thần số học không giới hạn',
      'Biểu đồ 3D cao cấp',
      'Giao diện tùy chỉnh cao cấp',
      'Tử vi tổng quát chi tiết',
      '🎯 Hỗ trợ ưu tiên',
      '🚀 Ưu tiên nhận tính năng mới',
      '💎 Huy hiệu Phù Thủy đặc biệt',
      '🎁 Nội dung độc quyền'
    ]
  }
];

const paymentMethods = [
  { name: 'Momo', logo: '📱' },
  { name: 'ZaloPay', logo: '💳' },
  { name: 'VNPay', logo: '🏦' },
  { name: 'Thẻ quốc tế', logo: '💳' }
];

export default function VIPPlansPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<VIPTier | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTier, setCurrentTier] = useState<VIPTier>(VIPTier.FREE);

  useEffect(() => {
    loadCurrentSubscription();
  }, []);

  const loadCurrentSubscription = async () => {
    if (!token) return;
    try {
      const data = await subscriptionApi.getCurrentSubscription(token);
      setCurrentTier(data.tier);
    } catch (error) {
      console.error('Failed to load subscription:', error);
    }
  };

  const handleSelectPlan = (tier: VIPTier) => {
    if (tier === VIPTier.FREE) {
      toast.error('Bạn đang dùng gói miễn phí');
      return;
    }
    setSelectedPlan(tier);
    setShowPayment(true);
  };

  const handleSubscribe = async () => {
    if (!token || !selectedPlan) return;

    setLoading(true);
    try {
      // Mock payment - thực tế sẽ redirect đến payment gateway
      await subscriptionApi.subscribe({
        tier: selectedPlan,
        durationMonths: 1,
        paymentMethod: 'Momo',
        transactionId: `MOCK_${Date.now()}`
      }, token);

      toast.success('Nâng cấp thành công! 🎉');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = VIP_PLANS_DISPLAY.find(p => p.tier === selectedPlan);

  return (
    <div className="flex min-h-screen bg-gray-950" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
      <Sidebar />
      
      <main className="flex-1 overflow-auto ml-64">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-b border-yellow-500/20 p-8">
          <div className="max-w-6xl mx-auto">
            <Button
              onClick={() => router.push('/vip')}
              variant="ghost"
              className="mb-6 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex justify-center mb-4"
              >
                <Crown className="w-16 h-16 text-yellow-400 fill-yellow-400" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Chọn gói phù hợp với bạn
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Đầu tư vào hành trình khám phá bản thân
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Thanh toán an toàn</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Hỗ trợ 24/7</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Kích hoạt ngay lập tức</span>
                </div>
              </div>

              {currentTier !== VIPTier.FREE && (
                <div className="mt-4 inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    Gói hiện tại: <strong>{VIP_PLANS_DISPLAY.find(p => p.tier === currentTier)?.name}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {VIP_PLANS_DISPLAY.map((plan, index) => {
              const isCurrentPlan = currentTier === plan.tier;
              const isFree = plan.tier === VIPTier.FREE;
              
              return (
                <motion.div
                  key={plan.tier}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isFree ? { y: -8 } : {}}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-2 border-yellow-500 shadow-2xl shadow-yellow-500/30'
                      : isFree
                      ? 'bg-gray-900/40 backdrop-blur-xl border border-gray-700/30'
                      : 'bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30'
                  } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
                >
                  {/* Current Plan Badge */}
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-green-500 text-white px-4 py-1 rounded-full font-bold text-xs">
                        ĐÃ KÍCH HOẠT
                      </div>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {plan.popular && !isCurrentPlan && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                    >
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        {plan.badge}
                      </div>
                    </motion.div>
                  )}

                  {/* Badge for Sorcerer */}
                  {plan.tier === VIPTier.SORCERER && !isCurrentPlan && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${plan.color} mb-6 text-4xl`}>
                    {plan.icon}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${
                        isFree ? 'text-gray-400' : 'bg-gradient-to-r from-yellow-200 to-amber-400 bg-clip-text text-transparent'
                      }`}>
                        {plan.price === 0 ? 'Miễn phí' : `${plan.price.toLocaleString('vi-VN')}đ`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400">/{plan.duration}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                          isFree ? 'bg-gray-600' : 'bg-gradient-to-br from-green-400 to-emerald-500'
                        } flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan.tier)}
                    disabled={isCurrentPlan || isFree}
                    className={`w-full py-4 font-bold ${
                      isCurrentPlan
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : isFree
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 border-2 border-yellow-300 shadow-lg shadow-yellow-500/30'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    }`}
                  >
                    {isCurrentPlan ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Đang sử dụng
                      </>
                    ) : isFree ? (
                      'Gói hiện tại'
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Nâng cấp ngay
                      </>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Payment Section */}
          {showPayment && selectedPlanData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Thanh toán</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Thông tin đơn hàng</h4>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-white text-lg">{selectedPlanData.name}</p>
                        <p className="text-sm text-gray-400">{selectedPlanData.description}</p>
                      </div>
                      <div className="text-3xl">{selectedPlanData.icon}</div>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Tổng cộng:</span>
                        <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                          {selectedPlanData.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Kích hoạt ngay sau khi thanh toán thành công
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Phương thức thanh toán</h4>
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4 }}
                        className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-yellow-500/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-2xl">
                            {method.logo}
                          </div>
                          <span className="text-white font-medium">{method.name}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-4 border-2 border-yellow-300 shadow-lg shadow-yellow-500/30"
                  >
                    {loading ? (
                      'Đang xử lý...'
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Tiến hành thanh toán
                      </>
                    )}
                  </Button>

                  <p className="text-center text-gray-500 text-xs mt-4">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Thanh toán được bảo mật bởi SSL 256-bit
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">So sánh chi tiết các gói</h3>
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left p-4 text-gray-300">Tính năng</th>
                      <th className="text-center p-4 text-gray-300">Miễn phí</th>
                      <th className="text-center p-4 text-yellow-400">VIP</th>
                      <th className="text-center p-4 text-purple-400">Phù Thủy</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-700/30">
                      <td className="p-4">Xem Tarot/ngày</td>
                      <td className="text-center p-4">3</td>
                      <td className="text-center p-4">20</td>
                      <td className="text-center p-4"><InfinityIcon className="w-5 h-5 inline text-purple-400" /></td>
                    </tr>
                    <tr className="border-t border-gray-700/30 bg-gray-800/20">
                      <td className="p-4">Chat AI/ngày</td>
                      <td className="text-center p-4">10</td>
                      <td className="text-center p-4">100</td>
                      <td className="text-center p-4"><InfinityIcon className="w-5 h-5 inline text-purple-400" /></td>
                    </tr>
                    <tr className="border-t border-gray-700/30">
                      <td className="p-4">Biểu đồ 3D</td>
                      <td className="text-center p-4">❌</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                    </tr>
                    <tr className="border-t border-gray-700/30 bg-gray-800/20">
                      <td className="p-4">Hỗ trợ ưu tiên</td>
                      <td className="text-center p-4">❌</td>
                      <td className="text-center p-4">❌</td>
                      <td className="text-center p-4">✅</td>
                    </tr>
                    <tr className="border-t border-gray-700/30">
                      <td className="p-4">Ưu tiên tính năng mới</td>
                      <td className="text-center p-4">❌</td>
                      <td className="text-center p-4">❌</td>
                      <td className="text-center p-4">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

