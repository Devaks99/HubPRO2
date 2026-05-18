import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, createInitialUserStats } from '@/lib/gamification';

interface UserContextType {
  user: UserStats | null;
  isLoading: boolean;
  updateUserStats: (stats: Partial<UserStats>) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  login: (username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('protheus-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('protheus-user', JSON.stringify(user));
    }
  }, [user]);

  const login = (username: string) => {
    const userId = `user-${Date.now()}`;
    const newUser = createInitialUserStats(userId, username);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('protheus-user');
  };

  const updateUserStats = (stats: Partial<UserStats>) => {
    if (!user) return;
    setUser({ ...user, ...stats });
  };

  const addXP = (amount: number) => {
    if (!user) return;
    const newTotalXP = user.totalXP + amount;
    const newCurrentXP = user.currentXP + amount;
    
    let newLevel = user.level;
    const nextLevelXP = user.level === 8 ? 9999 : 
      [0, 100, 250, 450, 700, 1000, 1350, 1750][user.level];
    
    if (newTotalXP >= nextLevelXP && user.level < 8) {
      newLevel = user.level + 1;
    }

    setUser({
      ...user,
      totalXP: newTotalXP,
      currentXP: newCurrentXP,
      level: newLevel,
    });
  };

  const incrementStreak = () => {
    if (!user) return;
    const today = new Date().toDateString();
    const lastActivity = new Date(user.lastActivityDate).toDateString();
    
    let newStreak = user.streak;
    if (today !== lastActivity) {
      newStreak = user.streak + 1;
    }

    setUser({
      ...user,
      streak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak),
      lastActivityDate: new Date().toISOString(),
    });
  };

  const resetStreak = () => {
    if (!user) return;
    setUser({
      ...user,
      streak: 0,
      lastActivityDate: new Date().toISOString(),
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        updateUserStats,
        addXP,
        incrementStreak,
        resetStreak,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
}
