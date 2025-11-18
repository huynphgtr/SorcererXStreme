'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Heart, Plus, Edit, Trash2, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuthStore, useProfileStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

const relationshipTypes = [
  { value: 'married', label: 'Vợ/Chồng', emoji: '💑' },
  { value: 'dating', label: 'Người yêu', emoji: '❤️' },
  { value: 'interested', label: 'Đang làm quen', emoji: '💕' }
];

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [partnerForm, setPartnerForm] = useState<{ 
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    relationship: 'married' | 'dating' | 'interested';
  }>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    relationship: 'dating'
  });

  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const { partner, breakupData, addPartner, updatePartner, breakup, confirmRecovery } = useProfileStore();

  // Helper function to format date for input type="date"
  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Returns "yyyy-MM-dd"
    } catch {
      return '';
    }
  };

  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    birthDate: formatDateForInput(user?.birthDate),
    birthTime: user?.birthTime || '',
    birthPlace: user?.birthPlace || ''
  });

  // Update editForm when user data changes
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        birthDate: formatDateForInput(user.birthDate),
        birthTime: user.birthTime || '',
        birthPlace: user.birthPlace || ''
      });
    }
  }, [user]);

  useEffect(() => {
    // Kiểm tra breakup data và hiện thông báo mỗi 5 ngày
    if (breakupData && breakupData.isActive) {
      const daysPassed = Math.floor((new Date().getTime() - new Date(breakupData.breakupDate).getTime()) / (24 * 60 * 60 * 1000));
      const checkInterval = 5; // Mỗi 5 ngày
      const checkNumber = Math.floor(daysPassed / checkInterval);
      
      // Kiểm tra nếu đã đến thời điểm check mới và chưa check lần này
      if (checkNumber > 0 && (!breakupData.weeklyCheckDone[checkNumber] || breakupData.weeklyCheckDone.length <= checkNumber)) {
        // Hiện thông báo mỗi 5 ngày
        setTimeout(() => {
          const message = `Đã ${daysPassed} ngày kể từ khi bạn chia tay với ${breakupData.partnerName}. Bạn có cảm thấy đã vượt qua và sẵn sàng bước tiếp chưa?`;
          if (confirm(message + '\n\nNếu đã vượt qua, chúng tôi sẽ xóa thông tin để giúp bạn bắt đầu lại.')) {
            confirmRecovery();
            toast.success('Chúc mừng bạn đã vượt qua! Thông tin đã được xóa để bạn có thể bắt đầu hành trình mới.');
          } else {
            // Đánh dấu đã check lần này
            const updatedChecks = [...(breakupData.weeklyCheckDone || [])];
            updatedChecks[checkNumber] = true;
            // Cập nhật lại store với thông tin check mới
            const updatedBreakupData = { ...breakupData, weeklyCheckDone: updatedChecks };
            useProfileStore.setState({ breakupData: updatedBreakupData });
            toast('Chúng tôi sẽ tiếp tục hỗ trợ bạn. Hãy kiên nhẫn, mọi thứ sẽ tốt lên!');
          }
        }, 2000);
      }

      // Kiểm tra tự động xóa sau 1 tháng
      const monthsPassed = (new Date().getTime() - new Date(breakupData.breakupDate).getTime()) / (30 * 24 * 60 * 60 * 1000);
      if (monthsPassed >= 1) {
        confirmRecovery();
        toast.success('Đã qua 1 tháng kể từ khi chia tay. Thông tin đã được tự động xóa để bạn có thể bắt đầu lại.');
      }
    }
  }, [breakupData, confirmRecovery]);

  const handleSaveProfile = async () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      await updateProfile(editForm.name, editForm.birthDate, editForm.birthTime, editForm.birthPlace, token);
      setIsEditing(false);
      toast.success('Cập nhật thông tin thành công!');
    } else {
      toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
      router.push('/auth/login');
    }
  };

  const handleAddPartner = () => {
    if (!partnerForm.name || !partnerForm.birthDate || !partnerForm.birthTime || !partnerForm.birthPlace) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    addPartner(partnerForm);
    setPartnerForm({
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: '',
      relationship: 'dating'
    });
    setShowAddPartner(false);
    toast.success('Đã thêm thông tin người phụ thuộc!');
  };

  const handleBreakup = () => {
    if (!partner) return;
    
    if (confirm('Bạn có chắc chắn muốn xác nhận chia tay? Thông tin này sẽ được lưu trong 1 tháng để hỗ trợ bạn.')) {
      breakup();
      toast.success('Đã cập nhật trạng thái. Chúng tôi sẽ hỗ trợ bạn trong thời gian này.');
    }
  };

  const handleGetBackTogether = () => {
    if (!breakupData) return;
    
    if (confirm(`Bạn có muốn quay lại với ${breakupData.partnerName}? Điều này sẽ khôi phục thông tin mối quan hệ.`)) {
      // Khôi phục thông tin partner từ breakupData
      const restoredPartner = {
        ...breakupData.partnerInfo,
        startDate: new Date().toISOString() // Cập nhật ngày bắt đầu mới
      };
      
      useProfileStore.setState({ 
        partner: restoredPartner, 
        breakupData: null 
      });
      
      toast.success('Chúc mừng! Đã khôi phục mối quan hệ. Chúc bạn hạnh phúc!');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const getRelationshipInfo = (type: string) => {
    return relationshipTypes.find(r => r.value === type) || relationshipTypes[1];
  };

  return (
    <div className="flex h-screen bg-gray-950" style={{ fontFamily: 'Be Vietnam Pro, sans-serif' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Hồ Sơ Cá Nhân</h1>
              <p className="text-gray-400">Quản lý thông tin cá nhân và mối quan hệ</p>
            </motion.div>

            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 shadow-lg mb-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">Thông Tin Cá Nhân</h2>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="secondary"
                  className="whitespace-nowrap"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </Button>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Họ và tên</label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Nhập họ tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Ngày sinh</label>
                    <Input
                      type="date"
                      value={editForm.birthDate}
                      onChange={(e) => setEditForm({...editForm, birthDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Giờ sinh</label>
                    <Input
                      type="time"
                      value={editForm.birthTime}
                      onChange={(e) => setEditForm({...editForm, birthTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nơi sinh</label>
                    <Input
                      value={editForm.birthPlace}
                      onChange={(e) => setEditForm({...editForm, birthPlace: e.target.value})}
                      placeholder="Thành phố, Quốc gia"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-end">
                    <Button onClick={handleSaveProfile} className="w-full whitespace-nowrap">
                      Lưu thay đổi
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-400">Họ tên</p>
                    </div>
                    <p className="text-white font-medium">{user?.name || 'Chưa cập nhật'}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-400">Ngày sinh</p>
                    </div>
                    <p className="text-white font-medium">
                      {user?.birthDate ? new Date(user.birthDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-400">Giờ sinh</p>
                    </div>
                    <p className="text-white font-medium">{user?.birthTime || 'Chưa cập nhật'}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-400">Nơi sinh</p>
                    </div>
                    <p className="text-white font-medium">{user?.birthPlace || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Breakup Status Warning */}
            <AnimatePresence>
              {breakupData && breakupData.isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-600/20 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm mb-8"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Heart className="w-6 h-6 text-orange-400 mr-3" />
                      <h3 className="text-lg font-bold text-orange-300">Đang trong thời kỳ hồi phục</h3>
                    </div>
                    <Button
                      onClick={handleGetBackTogether}
                      className="bg-green-600/20 border-green-500/30 text-green-300 hover:bg-green-600/30 whitespace-nowrap"
                      variant="secondary"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Quay lại
                    </Button>
                  </div>
                  <p className="text-orange-200 mb-2">
                    Bạn đang trải qua giai đoạn sau chia tay với {breakupData.partnerName}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-orange-300">
                        Ngày chia tay: {new Date(breakupData.breakupDate).toLocaleDateString('vi-VN')}
                      </p>
                      <p className="text-sm text-orange-300">
                        Thông tin sẽ tự động xóa sau: {new Date(breakupData.autoDeleteDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-orange-300">
                        Số lần check: {breakupData.weeklyCheckDone?.filter(Boolean).length || 0} lần
                      </p>
                      <p className="text-sm text-orange-300">
                        Lần check tiếp theo: Mỗi 5 ngày
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Partner Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Người Phụ Thuộc Tình Cảm</h2>
                </div>
                {!partner && !showAddPartner && !breakupData?.isActive && (
                  <Button
                    onClick={() => setShowAddPartner(true)}
                    className="whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm người phụ thuộc
                  </Button>
                )}
              </div>

              {/* Add Partner Form */}
              <AnimatePresence>
                {showAddPartner && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-gray-900/30 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Thêm thông tin người phụ thuộc</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Họ và tên</label>
                          <Input
                            value={partnerForm.name}
                            onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                            placeholder="Nhập họ tên"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Mối quan hệ</label>
                          <select
                            value={partnerForm.relationship}
                            onChange={(e) => setPartnerForm({...partnerForm, relationship: e.target.value as 'married' | 'dating' | 'interested'})}
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all pr-8"
                          >
                            {relationshipTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.emoji} {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Ngày sinh</label>
                          <Input
                            type="date"
                            value={partnerForm.birthDate}
                            onChange={(e) => setPartnerForm({...partnerForm, birthDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Giờ sinh</label>
                          <Input
                            type="time"
                            value={partnerForm.birthTime}
                            onChange={(e) => setPartnerForm({...partnerForm, birthTime: e.target.value})}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-400 mb-2">Nơi sinh</label>
                          <Input
                            value={partnerForm.birthPlace}
                            onChange={(e) => setPartnerForm({...partnerForm, birthPlace: e.target.value})}
                            placeholder="Thành phố, Quốc gia"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Button onClick={handleAddPartner} className="whitespace-nowrap">
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm
                        </Button>
                        <Button
                          onClick={() => setShowAddPartner(false)}
                          variant="secondary"
                          className="whitespace-nowrap"
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Current Partner Display */}
              {partner && !breakupData?.isActive ? (
                <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-xl p-6 border border-red-500/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {getRelationshipInfo(partner.relationship).emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{partner.name}</h3>
                        <p className="text-red-300">{getRelationshipInfo(partner.relationship).label}</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleBreakup}
                      variant="secondary"
                      className="bg-orange-600/20 border-orange-500/30 text-orange-300 hover:bg-orange-600/30 whitespace-nowrap"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Chia tay
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-400">Ngày sinh</p>
                      </div>
                      <p className="text-white font-medium">{partner.birthDate}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-400">Giờ sinh</p>
                      </div>
                      <p className="text-white font-medium">{partner.birthTime}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-400">Nơi sinh</p>
                      </div>
                      <p className="text-white font-medium">{partner.birthPlace}</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-400">Thời gian bắt đầu</p>
                      </div>
                      <p className="text-white font-medium">
                        {new Date(partner.startDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : !breakupData?.isActive && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Chưa có thông tin người phụ thuộc</p>
                  <p className="text-sm text-gray-500">
                    Thêm thông tin người yêu/vợ/chồng để có phân tích tình duyên chính xác hơn
                  </p>
                </div>
              )}
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-blue-600/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-blue-300 mb-3">📝 Hướng dẫn sử dụng</h3>
              <ul className="text-blue-200 space-y-2 text-sm">
                <li>• Thông tin người phụ thuộc giúp AI phân tích tình duyên chính xác hơn</li>
                <li>• Mỗi loại mối quan hệ chỉ được thêm 1 người để đảm bảo đạo đức</li>
                <li>• Khi chia tay, thông tin sẽ được lưu 3 tháng để hỗ trợ bạn vượt qua</li>
                <li>• Tất cả các chức năng bói sẽ tự động phân tích thêm về tình duyên</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
