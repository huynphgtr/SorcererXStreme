'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, profileApi } from './api-client';

interface User {
  id: string;
  email: string;
  name?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  isProfileComplete: boolean;
  vipTier?: string;
  vipExpiresAt?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  completeProfile: (name: string, birthDate: string, birthTime: string, birthPlace: string, token: string) => Promise<void>;
  updateProfile: (name: string, birthDate: string, birthTime: string, birthPlace: string, token: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: async (email: string, password: string) => {
        console.log('login called');
        try {
          const { token, user } = await authApi.login(email, password);
          console.log('login user:', user);
          
          document.cookie = `token=${token}; path=/; max-age=604800;`;
          const isProfileComplete = !!(user.name && user.birthDate && user.birthTime && user.birthPlace);
          console.log('isProfileComplete:', isProfileComplete);
          
          set({ user: { ...user, isProfileComplete }, isAuthenticated: true, token });
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      register: async (email: string, password: string) => {
        try {
          await authApi.register(email, password);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      completeProfile: async (name: string, birthDate: string, birthTime: string, birthPlace: string, token: string) => {
        console.log('completeProfile called');
        if (token) {
          try {
            const updatedUser = await profileApi.update({ name, birthDate, birthTime, birthPlace }, token);
            console.log('completeProfile updatedUser:', updatedUser);
            set({ user: { ...get().user, ...updatedUser, isProfileComplete: true } });
          } catch (error) {
            console.error(error);
          }
        }
      },

      updateProfile: async (name: string, birthDate: string, birthTime: string, birthPlace: string, token: string) => {
        if (token) {
          try {
            const user = await profileApi.update({ name, birthDate, birthTime, birthPlace }, token);
            set({ user });
          } catch (error) {
            console.error(error);
          }
        }
      },

      logout: () => {
        document.cookie = 'token=; path=/; max-age=0';
        set({ user: null, isAuthenticated: false, token: null });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'tarot' | 'astrology' | 'numerology';
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }]
  })),

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ isLoading: loading })
}));

export interface Partner {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  relationship: 'married' | 'dating' | 'interested';
  startDate: string;
}

export interface BreakupData {
  isActive: boolean;
  partnerName: string;
  partnerInfo: Partner;
  breakupDate: string;
  autoDeleteDate: string;
  weeklyCheckDone: boolean[];
}

interface ProfileState {
  partner: Partner | null;
  breakupData: BreakupData | null;
  addPartner: (partnerData: Omit<Partner, 'id' | 'startDate'>) => void;
  updatePartner: (partnerData: Partial<Partner>) => void;
  breakup: () => void;
  confirmRecovery: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      partner: null,
      breakupData: null,

      addPartner: (partnerData) => {
        const newPartner: Partner = {
          ...partnerData,
          id: Date.now().toString(),
          startDate: new Date().toISOString()
        };
        set({ partner: newPartner, breakupData: null });
      },

      updatePartner: (partnerData) => {
        const { partner } = get();
        if (partner) {
          set({ partner: { ...partner, ...partnerData } });
        }
      },

      breakup: () => {
        const { partner } = get();
        if (partner) {
          const breakupDate = new Date();
          const autoDeleteDate = new Date(breakupDate);
          autoDeleteDate.setMonth(autoDeleteDate.getMonth() + 1);

          const breakupData: BreakupData = {
            isActive: true,
            partnerName: partner.name,
            partnerInfo: partner,
            breakupDate: breakupDate.toISOString(),
            autoDeleteDate: autoDeleteDate.toISOString(),
            weeklyCheckDone: []
          };

          set({ partner: null, breakupData });

          setTimeout(() => {
            const { breakupData: currentBreakupData } = get();
            if (currentBreakupData && currentBreakupData.isActive) {
              set({ breakupData: null });
            }
          }, 30 * 24 * 60 * 60 * 1000);
        }
      },

      confirmRecovery: () => {
        set({ breakupData: null });
      }
    }),
    {
      name: 'profile-storage'
    }
  )
);
