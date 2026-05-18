import React, { useState, useMemo } from 'react';
import { useUser } from '@/contexts/UserContext';
import { MainLayout } from '@/components/MainLayout';
import { SidebarNav } from '@/components/SidebarNav';
import { HeaderUser } from '@/components/HeaderUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLevelConfig, BADGES } from '@/lib/gamification';
import { Trophy, Medal, Star, Flame } from 'lucide-react';

interface RankingEntry {
  rank: number;
  username: string;
  level: number;
  totalXP: number;
  streak: number;
  accuracy: number;
  badges: number;
}

export default function Ranking() {
  const { user } = useUser();
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');

  // Gerar dados de ranking simulados (em produção, viriam de uma API)
  const mockRankingData: RankingEntry[] = useMemo(() => {
    const data: RankingEntry[] = [
      {
        rank: 1,
        username: 'AlexanderDev',
        level: 8,
        totalXP: 9500,
        streak: 45,
        accuracy: 94,
        badges: 14,
      },
      {
        rank: 2,
        username: 'ProtheusGuru',
        level: 7,
        totalXP: 8200,
        streak: 32,
        accuracy: 91,
        badges: 12,
      },
      {
        rank: 3,
        username: 'CodeMaster2024',
        level: 7,
        totalXP: 7800,
        streak: 28,
        accuracy: 88,
        badges: 11,
      },
      {
        rank: 4,
        username: 'AdvplStudent',
        level: 6,
        totalXP: 6500,
        streak: 18,
        accuracy: 85,
        badges: 9,
      },
      {
        rank: 5,
        username: 'TotvsMaster',
        level: 6,
        totalXP: 6200,
        streak: 15,
        accuracy: 82,
        badges: 8,
      },
      {
        rank: 6,
        username: user?.username || 'Você',
        level: user?.level || 1,
        totalXP: user?.totalXP || 0,
        streak: user?.streak || 0,
        accuracy: user?.accuracy || 0,
        badges: 5,
      },
      {
        rank: 7,
        username: 'LearningPath',
        level: 4,
        totalXP: 3500,
        streak: 8,
        accuracy: 78,
        badges: 5,
      },
      {
        rank: 8,
        username: 'BeginnerCoder',
        level: 3,
        totalXP: 2100,
        streak: 5,
        accuracy: 72,
        badges: 3,
      },
    ];

    return data.sort((a, b) => b.totalXP - a.totalXP).map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [user]);

  const userRank = mockRankingData.find(entry => entry.username === (user?.username || 'Você'));
  const topThree = mockRankingData.slice(0, 3);

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath="/ranking" />}
      header={<HeaderUser />}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ranking Global</h1>
          <p className="text-muted-foreground">
            Veja como você se compara com outros estudantes de ADVPL
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">🏆 Pódio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 2nd Place */}
            {topThree[1] && (
              <Card className="p-6 border-l-4 border-l-slate-400 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="text-center">
                  <div className="text-5xl mb-2">🥈</div>
                  <p className="text-2xl font-bold text-foreground mb-1">2º lugar</p>
                  <p className="text-sm text-muted-foreground mb-4">{topThree[1].username}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nível</span>
                      <span className="font-semibold">{topThree[1].level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">XP</span>
                      <span className="font-semibold">{topThree[1].totalXP}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <Card className="p-6 border-l-4 border-l-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900 dark:to-amber-800 md:scale-105 md:z-10">
                <div className="text-center">
                  <div className="text-6xl mb-2">🥇</div>
                  <p className="text-2xl font-bold text-foreground mb-1">1º lugar</p>
                  <p className="text-sm text-muted-foreground mb-4">{topThree[0].username}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nível</span>
                      <span className="font-semibold">{topThree[0].level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">XP</span>
                      <span className="font-semibold">{topThree[0].totalXP}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <Card className="p-6 border-l-4 border-l-orange-600 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900 dark:to-red-800">
                <div className="text-center">
                  <div className="text-5xl mb-2">🥉</div>
                  <p className="text-2xl font-bold text-foreground mb-1">3º lugar</p>
                  <p className="text-sm text-muted-foreground mb-4">{topThree[2].username}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nível</span>
                      <span className="font-semibold">{topThree[2].level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">XP</span>
                      <span className="font-semibold">{topThree[2].totalXP}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Your Position */}
        {userRank && userRank.rank > 3 && (
          <div className="mb-8">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary">#{userRank.rank}</div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{userRank.username}</p>
                    <p className="text-sm text-muted-foreground">
                      Nível {userRank.level} • {userRank.totalXP} XP
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Sua posição</p>
                  <p className="text-2xl font-bold text-primary">
                    {mockRankingData.length - userRank.rank + 1} posições para o topo
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Full Ranking Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Ranking Completo</h2>

          <Tabs defaultValue="xp" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="xp">Por XP</TabsTrigger>
              <TabsTrigger value="streak">Por Streak</TabsTrigger>
              <TabsTrigger value="accuracy">Por Acurácia</TabsTrigger>
            </TabsList>

            <TabsContent value="xp">
              <div className="space-y-2">
                {mockRankingData.map((entry) => (
                  <RankingRow key={entry.rank} entry={entry} isCurrentUser={entry.username === user?.username} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="streak">
              <div className="space-y-2">
                {[...mockRankingData].sort((a, b) => b.streak - a.streak).map((entry, index) => (
                  <RankingRow
                    key={entry.rank}
                    entry={{ ...entry, rank: index + 1 }}
                    isCurrentUser={entry.username === user?.username}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accuracy">
              <div className="space-y-2">
                {[...mockRankingData].sort((a, b) => b.accuracy - a.accuracy).map((entry, index) => (
                  <RankingRow
                    key={entry.rank}
                    entry={{ ...entry, rank: index + 1 }}
                    isCurrentUser={entry.username === user?.username}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

interface RankingRowProps {
  entry: RankingEntry;
  isCurrentUser: boolean;
}

function RankingRow({ entry, isCurrentUser }: RankingRowProps) {
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />;
      default:
        return <Star className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Card
      className={`p-4 flex items-center justify-between transition-all ${
        isCurrentUser ? 'bg-primary/10 border-primary/30 ring-2 ring-primary/20' : 'hover:bg-accent/5'
      }`}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-3">
          {getMedalIcon(entry.rank)}
          <span className="text-lg font-bold text-foreground w-8">#{entry.rank}</span>
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">
            {entry.username}
            {isCurrentUser && <Badge className="ml-2">Você</Badge>}
          </p>
          <p className="text-sm text-muted-foreground">Nível {entry.level}</p>
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-4 gap-6 text-right">
        <div>
          <p className="text-xs text-muted-foreground mb-1">XP</p>
          <p className="font-semibold text-foreground">{entry.totalXP}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center justify-end gap-1">
            <Flame className="w-3 h-3" /> Streak
          </p>
          <p className="font-semibold text-foreground">{entry.streak}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Acurácia</p>
          <p className="font-semibold text-foreground">{entry.accuracy}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Badges</p>
          <p className="font-semibold text-foreground">{entry.badges}/14</p>
        </div>
      </div>

      <div className="sm:hidden text-right">
        <p className="font-semibold text-foreground">{entry.totalXP} XP</p>
        <p className="text-xs text-muted-foreground">{entry.accuracy}% acurácia</p>
      </div>
    </Card>
  );
}
