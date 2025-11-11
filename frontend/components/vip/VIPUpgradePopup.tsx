'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface VIPUpgradePopupProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const vipBenefits = [
  { icon: Zap, text: 'Không giới hạn lượt xem Tarot' },
  { icon: Sparkles, text: 'Truy cập các bài giải chi tiết' },
  { icon: Crown, text: 'Ưu tiên hỗ trợ 24/7' },
  { icon: Check, text: 'Biểu đồ chiêm tinh nâng cao' },
  { icon: Check, text: 'Chat AI không giới hạn' },
  { icon: Check, text: 'Lưu lịch sử không giới hạn' },
];

export const VIPUpgradePopup = ({ isOpen, onClose, featureName = 'tính năng này' }: VIPUpgradePopupProps) => {
  const router = useRouter();

  const handleUpgrade = () => {
    onClose();
    router.push('/vip/plans');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900 rounded-3xl border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative p-8 pb-6 bg-gradient-to-br from-yellow-500/10 to-amber-600/10 border-b border-yellow-500/20">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-4"
                >
                  <div className="relative">
                    <Crown className="w-20 h-20 text-yellow-400 fill-yellow-400" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="w-8 h-8 text-yellow-300" />
                    </motion.div>
                  </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
                  Nâng cấp lên VIP
                </h2>
                <p className="text-center text-gray-300 text-lg">
                  Để truy cập <span className="text-yellow-400 font-semibold">{featureName}</span>
                </p>
              </div>

              {/* Benefits */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Quyền lợi độc quyền dành cho VIP
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {vipBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-yellow-500/30 transition-all"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-900" />
                        </div>
                        <p className="text-gray-300 text-sm pt-1">{benefit.text}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Special Offer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 rounded-2xl p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 font-bold text-lg">🎉 Ưu đãi đặc biệt</span>
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                      -30%
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Chỉ <span className="text-yellow-400 font-bold text-xl">199.000đ</span> cho tháng đầu tiên!
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleUpgrade}
                    className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all border-2 border-yellow-300"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Nâng cấp ngay
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="secondary"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 py-4 rounded-xl"
                  >
                    Để sau
                  </Button>
                </div>

                <p className="text-center text-gray-500 text-xs mt-4">
                  Hủy bất cứ lúc nào • Hoàn tiền trong 7 ngày
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
