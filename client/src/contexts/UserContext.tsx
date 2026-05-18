import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, createInitialUserStats } from '@/lib/gamification';

interface UserContextType {
  user: UserStats | null;
  isLoading: boolean;

  updateUserStats: (stats: Partial<UserStats>) => void;
  updateUserProfile: (userId: string, patch: Partial<UserStats>) => void;

  getUserById: (userId: string) => UserStats | null;

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
    const storedUsers = localStorage.getItem('protheus-users');
    const currentUserId = localStorage.getItem('protheus-current-userId');

    if (storedUsers && currentUserId) {
      try {
        const parsedUsers: Record<string, UserStats> = JSON.parse(storedUsers);
        const loadedUser = parsedUsers[currentUserId] ?? null;
        setUser(loadedUser);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!user) return;

    const storedUsers = localStorage.getItem('protheus-users');
    const parsedUsers: Record<string, UserStats> = storedUsers ? JSON.parse(storedUsers) : {};

    parsedUsers[user.userId] = user;
    localStorage.setItem('protheus-users', JSON.stringify(parsedUsers));
    localStorage.setItem('protheus-current-userId', user.userId);
  }, [user]);

  const login = (username: string) => {
    const userId = `user-${Date.now()}`;
    const newUser = createInitialUserStats(userId, username);

    // Salva imediatamente no store multiusuários
    const storedUsers = localStorage.getItem('protheus-users');
    const parsedUsers: Record<string, UserStats> = storedUsers ? JSON.parse(storedUsers) : {};

    parsedUsers[userId] = newUser;
    localStorage.setItem('protheus-users', JSON.stringify(parsedUsers));
    localStorage.setItem('protheus-current-userId', userId);

    setUser(newUser);
  };

  const logout = () => {
    const currentUserId = localStorage.getItem('protheus-current-userId');
    setUser(null);
    if (currentUserId) {
      localStorage.removeItem('protheus-current-userId');
    }
  };

  const getUserById = (userId: string) => {
    const storedUsers = localStorage.getItem('protheus-users');
    if (!storedUsers) return null;
    try {
      const parsedUsers: Record<string, UserStats> = JSON.parse(storedUsers);
      return parsedUsers[userId] ?? null;
    } catch {
      return null;
    }
  };

  const updateUserStats = (stats: Partial<UserStats>) => {
    if (!user) return;
    setUser({ ...user, ...stats });
  };

  const updateUserProfile = (userId: string, patch: Partial<UserStats>) => {
    const storedUsers = localStorage.getItem('protheus-users');
    const parsedUsers: Record<string, UserStats> = storedUsers ? JSON.parse(storedUsers) : {};

    const target = parsedUsers[userId];
    if (!target) return;

    parsedUsers[userId] = { ...target, ...patch };
    localStorage.setItem('protheus-users', JSON.stringify(parsedUsers));

    if (user && user.userId === userId) {
      setUser(parsedUsers[userId]);
    }
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
        updateUserProfile,
        getUserById,
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
