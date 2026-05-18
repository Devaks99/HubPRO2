import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { getLevelConfig } from '@/lib/gamification';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function HeaderUser() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const levelConfig = getLevelConfig(user.level);
  const nextLevelXP = user.level === 8 ? 9999 : [0, 100, 250, 450, 700, 1000, 1350, 1750][user.level];
  const currentLevelXP = user.level === 1 ? 0 : [0, 100, 250, 450, 700, 1000, 1350, 1750][user.level - 1];
  const xpInLevel = user.totalXP - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const progressPercent = Math.round((xpInLevel / xpNeeded) * 100);

  return (
    <div className="flex items-center gap-6 w-full">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{user.username}</p>
            <p className="text-xs text-muted-foreground">
              {levelConfig?.title} • Nível {user.level}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
        <div className="w-32">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-foreground">{user.totalXP} XP</span>
            <span className="text-xs text-muted-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 flex-shrink-0">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-sm font-semibold text-foreground">{user.streak}</p>
          <p className="text-xs text-muted-foreground">dias</p>
        </div>
      </div>
    </div>
  );
}
