import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const email = process.argv[2];
    
    if (!email) {
      console.log('\n📋 Danh sách tất cả users:\n');
      const users = await prisma.user.findMany({
        include: {
          usageStats: true
        }
      });

      if (users.length === 0) {
        console.log('❌ Không có user nào trong database');
        process.exit(0);
      }

      for (const user of users) {
        console.log(`\n📧 Email: ${user.email}`);
        console.log(`👤 Tên: ${user.name || 'Chưa có'}`);
        console.log(`👑 Tier: ${user.vipTier}`);
        console.log(`⏰ VIP hết hạn: ${user.vipExpiresAt ? user.vipExpiresAt.toLocaleString('vi-VN') : 'N/A'}`);
        
        if (user.usageStats) {
          console.log(`📊 Usage hôm nay:`);
          console.log(`   - Tarot: ${user.usageStats.tarotReadingsToday}`);
          console.log(`   - Chat: ${user.usageStats.chatMessagesToday}`);
          console.log(`   - Chiêm tinh: ${user.usageStats.astrologyToday}`);
          console.log(`   - Tử vi: ${user.usageStats.fortuneToday}`);
          console.log(`   - Thần số học: ${user.usageStats.numerologyToday}`);
          console.log(`   - Reset lần cuối: ${user.usageStats.lastResetDate.toLocaleString('vi-VN')}`);
        } else {
          console.log(`📊 Chưa có usage stats`);
        }
        console.log('─'.repeat(50));
      }
    } else {
      // Tìm user cụ thể
      const user = await prisma.user.findUnique({
        where: { email },
        include: { usageStats: true }
      });

      if (!user) {
        console.error(`❌ Không tìm thấy user với email: ${email}`);
        process.exit(1);
      }

      console.log(`\n📧 Email: ${user.email}`);
      console.log(`👤 Tên: ${user.name || 'Chưa có'}`);
      console.log(`👑 Tier: ${user.vipTier}`);
      console.log(`⏰ VIP hết hạn: ${user.vipExpiresAt ? user.vipExpiresAt.toLocaleString('vi-VN') : 'N/A'}`);
      
      if (user.usageStats) {
        console.log(`\n📊 Usage hôm nay:`);
        console.log(`   - Tarot: ${user.usageStats.tarotReadingsToday}`);
        console.log(`   - Chat: ${user.usageStats.chatMessagesToday}`);
        console.log(`   - Chiêm tinh: ${user.usageStats.astrologyToday}`);
        console.log(`   - Tử vi: ${user.usageStats.fortuneToday}`);
        console.log(`   - Thần số học: ${user.usageStats.numerologyToday}`);
        console.log(`   - Reset lần cuối: ${user.usageStats.lastResetDate.toLocaleString('vi-VN')}`);
      } else {
        console.log(`\n📊 Chưa có usage stats`);
      }
    }

  } catch (error) {
    console.error('❌ Lỗi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();

