import { PrismaClient } from '@prisma/client';
import { VIPTier, VIP_TIER_LIMITS, SubscriptionData, SubscriptionStatus } from '../types/vip.types';

const prisma = new PrismaClient();

export class VIPService {
  // Kiểm tra user có quyền truy cập feature không
  static async checkFeatureAccess(
    userId: string,
    feature: keyof typeof VIP_TIER_LIMITS.FREE
  ): Promise<{ allowed: boolean; currentUsage?: number; limit?: number; tier: VIPTier }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { usageStats: true }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Kiểm tra VIP có hết hạn không
    const tier = await this.getCurrentTier(userId);
    const limits = VIP_TIER_LIMITS[tier];
    const featureLimit = limits[feature];

    // Nếu không có usage tracking (boolean features)
    if (typeof featureLimit === 'boolean') {
      return { allowed: featureLimit, tier };
    }

    // Nếu unlimited (-1)
    if (featureLimit === -1) {
      return { allowed: true, limit: -1, tier };
    }

    // Kiểm tra usage
    const stats = user.usageStats;
    if (!stats) {
      // Tạo mới usage stats
      await prisma.usageStats.create({
        data: { userId }
      });
      return { allowed: true, currentUsage: 0, limit: featureLimit, tier };
    }

    // Reset nếu qua ngày mới
    const today = new Date().toDateString();
    const lastReset = new Date(stats.lastResetDate).toDateString();
    
    let currentStats = stats;
    if (today !== lastReset) {
      currentStats = await prisma.usageStats.update({
        where: { userId },
        data: {
          tarotReadingsToday: 0,
          chatMessagesToday: 0,
          astrologyToday: 0,
          fortuneToday: 0,
          numerologyToday: 0,
          lastResetDate: new Date()
        }
      });
    }

    // Map feature name to usage stat
    const usageMap: Record<string, keyof typeof stats> = {
      tarotReadingsPerDay: 'tarotReadingsToday',
      chatMessagesPerDay: 'chatMessagesToday',
      astrologyAnalysisPerDay: 'astrologyToday',
      fortuneReadingsPerDay: 'fortuneToday',
      numerologyAnalysisPerDay: 'numerologyToday'
    };

    const usageField = usageMap[feature];
    if (!usageField) {
      return { allowed: true, tier }; // Feature không có usage tracking
    }

    const currentUsage = currentStats[usageField] as number;
    const allowed = currentUsage < featureLimit;

    return { allowed, currentUsage, limit: featureLimit, tier };
  }

  // Increment usage counter
  static async incrementUsage(userId: string, feature: string): Promise<void> {
    const usageMap: Record<string, string> = {
      tarot: 'tarotReadingsToday',
      chat: 'chatMessagesToday',
      astrology: 'astrologyToday',
      fortune: 'fortuneToday',
      numerology: 'numerologyToday'
    };

    const field = usageMap[feature];
    if (!field) return;

    const stats = await prisma.usageStats.findUnique({
      where: { userId }
    });

    if (!stats) {
      await prisma.usageStats.create({
        data: {
          userId,
          [field]: 1
        }
      });
    } else {
      await prisma.usageStats.update({
        where: { userId },
        data: {
          [field]: { increment: 1 }
        }
      });
    }
  }

  // Lấy tier hiện tại của user
  static async getCurrentTier(userId: string): Promise<VIPTier> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Kiểm tra hết hạn
    if (user.vipExpiresAt && new Date() > user.vipExpiresAt) {
      // Hết hạn -> downgrade về FREE
      await prisma.user.update({
        where: { id: userId },
        data: { vipTier: VIPTier.FREE, vipExpiresAt: null }
      });
      return VIPTier.FREE;
    }

    return user.vipTier as VIPTier;
  }

  // Lấy thông tin giới hạn của user
  static async getUserLimits(userId: string) {
    const tier = await this.getCurrentTier(userId);
    const limits = VIP_TIER_LIMITS[tier];
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { usageStats: true }
    });

    return {
      tier,
      limits,
      usage: user?.usageStats || null,
      expiresAt: user?.vipExpiresAt
    };
  }

  // Tạo subscription mới
  static async createSubscription(data: SubscriptionData) {
    const { userId, tier, price, durationMonths, paymentMethod, transactionId } = data;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    // Tạo subscription record
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        tier,
        price,
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE,
        paymentMethod,
        transactionId
      }
    });

    // Update user tier
    await prisma.user.update({
      where: { id: userId },
      data: {
        vipTier: tier,
        vipExpiresAt: endDate
      }
    });

    return subscription;
  }

  // Hủy subscription
  static async cancelSubscription(userId: string) {
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!activeSubscription) {
      throw new Error('No active subscription found');
    }

    await prisma.subscription.update({
      where: { id: activeSubscription.id },
      data: { status: SubscriptionStatus.CANCELLED }
    });

    // User vẫn dùng được đến hết hạn
    return activeSubscription;
  }

  // Lấy lịch sử subscription
  static async getSubscriptionHistory(userId: string) {
    return await prisma.subscription.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Kiểm tra và cập nhật subscriptions hết hạn (chạy định kỳ)
  static async checkExpiredSubscriptions() {
    const now = new Date();
    
    const expiredUsers = await prisma.user.findMany({
      where: {
        vipExpiresAt: {
          lte: now
        },
        vipTier: {
          not: VIPTier.FREE
        }
      }
    });

    for (const user of expiredUsers) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          vipTier: VIPTier.FREE,
          vipExpiresAt: null
        }
      });

      // Update subscription status
      await prisma.subscription.updateMany({
        where: {
          userId: user.id,
          status: SubscriptionStatus.ACTIVE,
          endDate: {
            lte: now
          }
        },
        data: {
          status: SubscriptionStatus.EXPIRED
        }
      });
    }

    return expiredUsers.length;
  }
}

