import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { MainLayout } from '@/components/MainLayout';
import { SidebarNav } from '@/components/SidebarNav';
import { HeaderUser } from '@/components/HeaderUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getLevelConfig, calculateLevelProgress } from '@/lib/gamification';
import { Link } from 'wouter';

export default function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const levelConfig = getLevelConfig(user.level);
  const levelProgress = calculateLevelProgress(user.totalXP, user.level);

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath="/" />}
      header={<HeaderUser />}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo de volta, {user.username}!
          </h1>
          <p className="text-muted-foreground">
            Continue sua jornada de aprendizado em ADVPL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nível Atual</p>
                <p className="text-4xl font-bold text-primary">{user.level}</p>
              </div>
              <span className="text-4xl">📈</span>
            </div>
            <p className="text-xs text-muted-foreground">{levelConfig?.title}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">XP Total</p>
                <p className="text-4xl font-bold text-accent">{user.totalXP}</p>
              </div>
              <span className="text-4xl">⭐</span>
            </div>
            <p className="text-xs text-muted-foreground">+{levelProgress}% para próximo nível</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Streak Atual</p>
                <p className="text-4xl font-bold" style={{ color: '#F97316' }}>
                  {user.streak}
                </p>
              </div>
              <span className="text-4xl">🔥</span>
            </div>
            <p className="text-xs text-muted-foreground">Máximo: {user.longestStreak} dias</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-info/5 to-info/10 border-info/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Acurácia</p>
                <p className="text-4xl font-bold text-info">{user.accuracy}%</p>
              </div>
              <span className="text-4xl">🎯</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {user.totalCorrectAnswers} acertos
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Progresso de Nível</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Nível {user.level}</span>
                  <span className="text-sm font-medium text-foreground">{levelProgress}%</span>
                </div>
                <Progress value={levelProgress} className="h-3" />
              </div>
              <p className="text-xs text-muted-foreground">
                {levelConfig?.description}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Atividades</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Flashcards</span>
                <span className="font-semibold text-foreground">{user.totalFlashcardsReviewed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quizzes</span>
                <span className="font-semibold text-foreground">{user.totalQuizzesCompleted}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/flashcards">
            <a>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-4xl mb-3">📇</div>
                <h3 className="font-semibold text-foreground mb-1">Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Revise com repetição espaçada
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Começar
                </Button>
              </Card>
            </a>
          </Link>

          <Link href="/quizzes">
            <a>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="font-semibold text-foreground mb-1">Quizzes</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Teste seu conhecimento
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Começar
                </Button>
              </Card>
            </a>
          </Link>

          <Link href="/ranking">
            <a>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-semibold text-foreground mb-1">Ranking</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Veja sua posição
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Ranking
                </Button>
              </Card>
            </a>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
