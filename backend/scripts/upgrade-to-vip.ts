import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function upgradeToVIP() {
  try {
    // Lấy email từ command line argument
    const email = process.argv[2];
    
    if (!email) {
      console.error('❌ Vui lòng cung cấp email: npm run upgrade-vip <email>');
      process.exit(1);
    }

    // Tìm user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.error(`❌ Không tìm thấy user với email: ${email}`);
      process.exit(1);
    }

    console.log(`\n📧 Tìm thấy user: ${user.email} (${user.name || 'Chưa có tên'})`);
    console.log(`📊 Tier hiện tại: ${user.vipTier}`);

    // Set VIP expire date (1 year from now for testing)
    const vipExpiresAt = new Date();
    vipExpiresAt.setFullYear(vipExpiresAt.getFullYear() + 1);

    // Update user to VIP
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        vipTier: 'VIP',
        vipExpiresAt
      }
    });

    // Reset usage stats
    await prisma.usageStats.deleteMany({
      where: { userId: user.id }
    });

    await prisma.usageStats.create({
      data: {
        userId: user.id,
        tarotReadingsToday: 0,
        chatMessagesToday: 0,
        astrologyToday: 0,
        fortuneToday: 0,
        numerologyToday: 0,
        lastResetDate: new Date()
      }
    });

    console.log('\n✅ Nâng cấp VIP thành công!');
    console.log(`👑 Tier mới: ${updatedUser.vipTier}`);
    console.log(`⏰ Hết hạn: ${vipExpiresAt.toLocaleString('vi-VN')}`);
    console.log(`🔄 Đã reset usage stats`);
    console.log('\n💎 Bạn có thể sử dụng tất cả tính năng không giới hạn!');

  } catch (error) {
    console.error('❌ Lỗi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

upgradeToVIP();

