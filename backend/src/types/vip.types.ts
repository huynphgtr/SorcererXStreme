export enum VIPTier {
  FREE = 'FREE',
  VIP = 'VIP',
  SORCERER = 'SORCERER'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export interface VIPFeatureLimits {
  // Tarot
  tarotReadingsPerDay: number;
  tarotCardOptions: number[]; // [3, 5, 7] cards
  tarotHistoryDays: number;
  
  // Chat
  chatMessagesPerDay: number;
  chatHistoryDays: number;
  
  // Astrology
  astrologyAnalysisPerDay: number;
  astrology3DVisualization: boolean;
  
  // Fortune
  fortuneReadingsPerDay: number;
  comprehensiveFortune: boolean;
  
  // Numerology
  numerologyAnalysisPerDay: number;
  
  // Other
  prioritySupport: boolean;
  earlyAccess: boolean;
  adFree: boolean;
  customThemes: boolean;
}

export const VIP_TIER_LIMITS: Record<VIPTier, VIPFeatureLimits> = {
  [VIPTier.FREE]: {
    tarotReadingsPerDay: 3,
    tarotCardOptions: [3],
    tarotHistoryDays: 7,
    chatMessagesPerDay: 10,
    chatHistoryDays: 3,
    astrologyAnalysisPerDay: 1,
    astrology3DVisualization: false,
    fortuneReadingsPerDay: 1,
    comprehensiveFortune: false,
    numerologyAnalysisPerDay: 1,
    prioritySupport: false,
    earlyAccess: false,
    adFree: false,
    customThemes: false,
  },
  [VIPTier.VIP]: {
    tarotReadingsPerDay: 20,
    tarotCardOptions: [3, 5, 7],
    tarotHistoryDays: 30,
    chatMessagesPerDay: 100,
    chatHistoryDays: 30,
    astrologyAnalysisPerDay: 10,
    astrology3DVisualization: true,
    fortuneReadingsPerDay: 5,
    comprehensiveFortune: true,
    numerologyAnalysisPerDay: 5,
    prioritySupport: false,
    earlyAccess: false,
    adFree: true,
    customThemes: true,
  },
  [VIPTier.SORCERER]: {
    tarotReadingsPerDay: -1, // unlimited
    tarotCardOptions: [3, 5, 7, 10],
    tarotHistoryDays: -1, // unlimited
    chatMessagesPerDay: -1, // unlimited
    chatHistoryDays: -1, // unlimited
    astrologyAnalysisPerDay: -1, // unlimited
    astrology3DVisualization: true,
    fortuneReadingsPerDay: -1, // unlimited
    comprehensiveFortune: true,
    numerologyAnalysisPerDay: -1, // unlimited
    prioritySupport: true,
    earlyAccess: true,
    adFree: true,
    customThemes: true,
  },
};

export interface VIPPlanInfo {
  tier: VIPTier;
  name: string;
  nameEn: string;
  price: number;
  duration: string;
  color: string;
  description: string;
  features: string[];
  icon: string;
}

export const VIP_PLANS: VIPPlanInfo[] = [
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
      'Có quảng cáo'
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
    features: [
      '20 lượt xem Tarot/ngày',
      'Rút 3, 5, hoặc 7 lá bài',
      'Lưu lịch sử 30 ngày',
      '100 tin nhắn chat AI/ngày',
      '10 phân tích tử vi/ngày',
      '5 phân tích tử vi/ngày',
      '5 phân tích thần số học/ngày',
      'Biểu đồ 3D đầy đủ',
      'Không quảng cáo',
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
    features: [
      '♾️ Xem Tarot không giới hạn',
      'Rút 3, 5, 7, 10 lá bài',
      'Lưu lịch sử vô hạn',
      '♾️ Chat AI không giới hạn',
      '♾️ Tử vi không giới hạn',
      '♾️ Thần số học không giới hạn',
      'Biểu đồ 3D cao cấp',
      'Không quảng cáo',
      'Giao diện tùy chỉnh cao cấp',
      'Tử vi tổng quát chi tiết',
      '🎯 Hỗ trợ ưu tiên',
      '🚀 Ưu tiên nhận tính năng mới',
      '💎 Huy hiệu Phù Thủy đặc biệt',
      '🎁 Nội dung độc quyền'
    ]
  }
];

export interface SubscriptionData {
  userId: string;
  tier: VIPTier;
  price: number;
  durationMonths: number;
  paymentMethod?: string;
  transactionId?: string;
}

