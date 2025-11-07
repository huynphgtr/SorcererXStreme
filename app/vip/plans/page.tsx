'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Check, 
  Sparkles, 
  Zap, 
  Star, 
  Shield, 
  TrendingUp,
  ArrowLeft,
  CreditCard,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sidebar } from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';
import { VIPBadge } from '@/components/ui/VIPBadge';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  color: string;
  icon: any;
}

const plans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'VIP Tháng',
    price: 36000,
    originalPrice: 108000,
    duration: '/tháng',
    badge: '-30%',
    features: [
      'Không giới hạn lượt xem Tarot',
      'Chat AI không giới hạn',
      'Biểu đồ chiêm tinh 3D',
      'Tử vi tổng quát hàng ngày',
      'Phân tích thần số học',
      'Lưu lịch sử 30 ngày',
      'Hỗ trợ ưu tiên',
      'Không quảng cáo'
    ],
    color: 'from-blue-500 to-cyan-500',
    icon: Star
  },
  {
    id: 'yearly',
    name: 'VIP Năm',
    price: 360000,
    originalPrice: 888000,
    duration: '/năm',
    badge: 'TIẾT KIỆM 45%',
    popular: true,
    features: [
      '✨ TẤT CẢ tính năng VIP Tháng',
      '🎁 2 tháng miễn phí',
      '💎 Nội dung độc quyền hàng tuần',
      '🔮 Tư vấn huyền học 1-1',
      '📊 Báo cáo vận mệnh chi tiết',
      '🎯 Dự đoán tương lai nâng cao',
      '👑 Huy hiệu VIP vàng đặc biệt',
      '🎨 Giao diện cao cấp',
      '📱 Ưu tiên tính năng mới',
      '🏆 Quà tặng đặc biệt mỗi tháng'
    ],
    color: 'from-yellow-400 to-amber-500',
    icon: Crown
  },
  {
    id: 'lifetime',
    name: 'VIP Trọn Đời',
    price: 3600000,
    originalPrice: 9990000,
    duration: '/mãi mãi',
    badge: 'BEST VALUE',
    features: [
      '⭐ TẤT CẢ tính năng VIP Năm',
      '♾️ Truy cập trọn đời',
      '🌟 Không cần gia hạn',
      '👑 Huy hiệu VIP Kim Cương',
      '🎁 Quà tặng giá trị cao',
      '💼 Tư vấn chuyên sâu',
      '🔐 Dữ liệu không giới hạn',
      '🎯 Ưu tiên tối đa',
      '🚀 Tính năng Beta sớm nhất',
      '💝 Chương trình khách hàng thân thiết'
    ],
    color: 'from-purple-500 to-pink-500',
    icon: Sparkles
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
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [showPayment, setShowPayment] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

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
                  Chọn gói VIP phù hợp
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Đầu tư vào hành trình khám phá bản thân
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Dùng thử 7 ngày miễn phí</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Hoàn tiền trong 7 ngày</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border-2 border-yellow-500 shadow-2xl shadow-yellow-500/30'
                      : 'bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-yellow-500/30'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                    >
                      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        PHỔ BIẾN NHẤT
                      </div>
                    </motion.div>
                  )}

                  {/* Discount Badge */}
                  {plan.badge && !plan.popular && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${plan.color} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <div className="text-gray-500 line-through text-lg mb-1">
                        {plan.originalPrice.toLocaleString('vi-VN')}đ
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-yellow-200 to-amber-400 bg-clip-text text-transparent">
                        {plan.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-gray-400">{plan.duration}</span>
                    </div>
                    {plan.id === 'yearly' && (
                      <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        Chỉ ~{Math.round(plan.price / 12).toLocaleString('vi-VN')}đ/tháng
                      </p>
                    )}
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
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-4 font-bold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 border-2 border-yellow-300 shadow-lg shadow-yellow-500/30'
                        : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Đã chọn
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Chọn gói này
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
                        <p className="font-semibold text-white">{selectedPlanData.name}</p>
                        <p className="text-sm text-gray-400">{selectedPlanData.duration}</p>
                      </div>
                      <VIPBadge size="sm" />
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4 space-y-2">
                      {selectedPlanData.originalPrice && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Giá gốc:</span>
                          <span className="text-gray-500 line-through">
                            {selectedPlanData.originalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Giảm giá:</span>
                        <span className="text-green-400">
                          -{((selectedPlanData.originalPrice! - selectedPlanData.price) || 0).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-700">
                        <span className="text-white">Tổng cộng:</span>
                        <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                          {selectedPlanData.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-sm text-yellow-400 flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Dùng thử 7 ngày miễn phí - Hủy bất cứ lúc nào
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
                    className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-4 border-2 border-yellow-300 shadow-lg shadow-yellow-500/30"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Tiến hành thanh toán
                  </Button>

                  <p className="text-center text-gray-500 text-xs mt-4">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Thanh toán được bảo mật bởi SSL 256-bit
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Câu hỏi thường gặp</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: 'Tôi có thể hủy bất cứ lúc nào không?',
                  a: 'Có, bạn có thể hủy bất cứ lúc nào mà không mất phí.'
                },
                {
                  q: 'Có hoàn tiền không?',
                  a: 'Có, chúng tôi hoàn tiền 100% trong vòng 7 ngày nếu không hài lòng.'
                },
                {
                  q: 'Dùng thử miễn phí như thế nào?',
                  a: 'Bạn được dùng thử 7 ngày miễn phí, sau đó mới bị tính phí.'
                },
                {
                  q: 'Thanh toán có an toàn không?',
                  a: 'Hoàn toàn an toàn với mã hóa SSL 256-bit và các cổng thanh toán uy tín.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-800/40 rounded-xl p-6 text-left border border-gray-700/30">
                  <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
