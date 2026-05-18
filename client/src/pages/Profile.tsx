import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { MainLayout } from '@/components/MainLayout';
import { SidebarNav } from '@/components/SidebarNav';
import { HeaderUser } from '@/components/HeaderUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLevelConfig } from '@/lib/gamification';
import {
  Calendar,
  Award,
  Zap,
  Target,
  User2,
  Pencil,
  Image as ImageIcon,
  Sparkles,
  Shield,
  BookOpen,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Profile() {
  const { user: currentUser, logout, getUserById, updateUserProfile } = useUser();
  const params = (require('wouter').useParams as any)() as { userId?: string };
  const targetUserId = params?.userId;

  if (!currentUser) {
    return null;
  }

  const isOwner = !targetUserId || targetUserId === currentUser.userId;

  const targetUser = targetUserId ? getUserById(targetUserId) : null;
  const user = targetUser ?? currentUser;

  const levelConfig = getLevelConfig(user.level);
  const nextLevelXP = user.level === 8 ? 9999 : [0, 100, 250, 450, 700, 1000, 1350, 1750][user.level];
  const currentLevelXP = user.level === 1 ? 0 : [0, 100, 250, 450, 700, 1000, 1350, 1750][user.level - 1];
  const xpInLevel = user.totalXP - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const progressPercent = Math.round((xpInLevel / xpNeeded) * 100);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath={targetUserId ? `/users/${targetUserId}` : '/profile'} />}

      header={<HeaderUser />}
    >
      <div className="p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{isOwner ? 'Meu Perfil' : 'Perfil do usuário'}</h1>
          <p className="text-muted-foreground">Visualize suas estatísticas e progresso</p>
        </div>

        {/* User Info Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{user.username}</h2>
              <p className="text-muted-foreground">Estudando ADVPL com Protheus Master</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary mb-1">{user.level}</div>
              <p className="text-sm text-muted-foreground">{levelConfig?.title}</p>
            </div>
          </div>

          {/* Level Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progresso para próximo nível</span>
              <span className="text-sm text-muted-foreground">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {xpInLevel} / {xpNeeded} XP
            </p>
          </div>
        </Card>

        {/* Stats Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total de XP</p>
                    <p className="text-3xl font-bold text-foreground">{user.totalXP}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(user.totalXP / 100)} pontos de nível
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Acurácia</p>
                    <p className="text-3xl font-bold text-foreground">{user.accuracy}%</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.totalCorrectAnswers} acertos
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Streak Atual</p>
                    <p className="text-3xl font-bold text-foreground">{user.streak}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Máximo: {user.longestStreak} dias
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Atividade</p>
                    <p className="text-3xl font-bold text-foreground">
                      {user.totalFlashcardsReviewed + user.totalQuizzesCompleted}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Atividades completadas
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Detalhes de Aprendizado</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Flashcards Revisados</span>
                  <span className="font-semibold text-foreground">{user.totalFlashcardsReviewed}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Quizzes Completados</span>
                  <span className="font-semibold text-foreground">{user.totalQuizzesCompleted}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Respostas Corretas</span>
                  <span className="font-semibold text-foreground">{user.totalCorrectAnswers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Respostas Incorretas</span>
                  <span className="font-semibold text-foreground">{user.totalWrongAnswers}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Badges Desbloqueados
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { emoji: '🎯', name: 'Primeira Questão', desc: 'Respondeu primeira questão' },
                  { emoji: '🔥', name: 'Streak de 7 dias', desc: '7 dias consecutivos' },
                  { emoji: '🏆', name: 'Campeão', desc: 'Atingiu nível 5' },
                  { emoji: '⭐', name: 'Perfeição', desc: 'Quiz com 100% acurácia' },
                  { emoji: '📚', name: 'Estudioso', desc: '100 flashcards revisados' },
                  { emoji: '🚀', name: 'Rápido', desc: 'Completou 5 quizzes' },
                ].map((badge, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="text-3xl mb-2">{badge.emoji}</div>
                    <p className="text-sm font-medium text-foreground mb-1">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Próximos Badges</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl opacity-50">🎓</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Mestre ADVPL</p>
                      <p className="text-xs text-muted-foreground">Atinja nível 8</p>
                    </div>
                  </div>
                  <Progress value={(user.level / 8) * 100} className="w-24 h-2" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl opacity-50">💯</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">Precisão Perfeita</p>
                      <p className="text-xs text-muted-foreground">Mantenha 95%+ acurácia</p>
                    </div>
                  </div>
                  <Progress value={user.accuracy} className="w-24 h-2" />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Estatísticas de Atividade</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Flashcards Revisados</span>
                    <span className="text-sm font-semibold text-foreground">
                      {user.totalFlashcardsReviewed} / 500
                    </span>
                  </div>
                  <Progress value={(user.totalFlashcardsReviewed / 500) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Quizzes Completados</span>
                    <span className="text-sm font-semibold text-foreground">
                      {user.totalQuizzesCompleted} / 100
                    </span>
                  </div>
                  <Progress value={(user.totalQuizzesCompleted / 100) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Streak Consecutivo</span>
                    <span className="text-sm font-semibold text-foreground">
                      {user.streak} / 30 dias
                    </span>
                  </div>
                  <Progress value={(user.streak / 30) * 100} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Última Atividade</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Última atividade: {new Date(user.lastActivityDate).toLocaleDateString('pt-BR')} às{' '}
                {new Date(user.lastActivityDate).toLocaleTimeString('pt-BR')}
              </p>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <p className="text-sm text-foreground">
                  Continue sua sequência! Você está em um ótimo caminho. Volte amanhã para manter seu streak! 🔥
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Logout Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Voltar ao Dashboard
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
