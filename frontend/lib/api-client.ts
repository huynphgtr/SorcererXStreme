const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RequestOptions {
  method?: string;
  body?: any;
  token?: string;
}

async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const authApi = {
  register: (email: string, password: string) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: { email, password },
    }),

  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
};

export const profileApi = {
  get: (token: string) =>
    apiRequest('/api/profile', { token }),

  update: (data: any, token: string) =>
    apiRequest('/api/profile', {
      method: 'PUT',
      body: data,
      token,
    }),
};

export const chatApi = {
  sendMessage: (message: string, userContext: any, token: string) =>
    apiRequest('/api/chat', {
      method: 'POST',
      body: { message, userContext },
      token,
    }),

  getHistory: (token: string) =>
    apiRequest('/api/chat/history', { token }),
};

export const tarotApi = {
  getReading: (data: any, token: string) =>
    apiRequest('/api/tarot/reading', {
      method: 'POST',
      body: data,
      token,
    }),
};

export const astrologyApi = {
  getAnalysis: (data: any, token: string) =>
    apiRequest('/api/astrology', {
      method: 'POST',
      body: data,
      token,
    }),
};

export const fortuneApi = {
  getAnalysis: (data: any, token: string) =>
    apiRequest('/api/fortune', {
      method: 'POST',
      body: data,
      token,
    }),
};

export const numerologyApi = {
  getAnalysis: (data: any, token: string) =>
    apiRequest('/api/numerology', {
      method: 'POST',
      body: data,
      token,
    }),
};
