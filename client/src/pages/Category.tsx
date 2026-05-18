import React, { useState, useMemo } from 'react';
import { useRoute } from 'wouter';
import { useUser } from '@/contexts/UserContext';
import { MainLayout } from '@/components/MainLayout';
import { SidebarNav } from '@/components/SidebarNav';
import { HeaderUser } from '@/components/HeaderUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { categories, getAllFlashcards, getAllQuizQuestions } from '@/lib/educationalContent';
import { ChevronRight } from 'lucide-react';

export default function Category() {
  const [match, params] = useRoute('/category/:id');
  const { user } = useUser();
  const categoryId = params?.id as string;

  const category = useMemo(
    () => categories.find(c => c.id === categoryId),
    [categoryId]
  );

  const flashcards = useMemo(
    () => getAllFlashcards().filter(fc => fc.category === categoryId),
    [categoryId]
  );

  const quizzes = useMemo(
    () => getAllQuizQuestions().filter(q => q.category === categoryId),
    [categoryId]
  );

  if (!category) {
    return (
      <MainLayout
        sidebar={<SidebarNav currentPath={`/category/${categoryId}`} />}
        header={<HeaderUser />}
      >
        <div className="p-6 max-w-7xl mx-auto">
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground">Categoria não encontrada</p>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const completionPercentage = Math.round((flashcards.length / (flashcards.length + quizzes.length)) * 100);

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath={`/category/${categoryId}`} />}
      header={<HeaderUser />}
    >
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Flashcards</p>
            <p className="text-3xl font-bold text-foreground">{flashcards.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Disponíveis nesta categoria</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Questões</p>
            <p className="text-3xl font-bold text-foreground">{quizzes.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Para testar conhecimento</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Progresso</p>
            <p className="text-3xl font-bold text-foreground">{completionPercentage}%</p>
            <Progress value={completionPercentage} className="mt-2 h-2" />
          </Card>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flashcards Section */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">📇 Flashcards</h2>
            <div className="space-y-3">
              {flashcards.slice(0, 5).map((fc, index) => (
                <Card key={fc.id} className="p-4 hover:bg-accent/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{fc.front}</p>
                      <p className="text-sm text-muted-foreground truncate">{fc.back}</p>
                    </div>
                  </div>
                </Card>
              ))}

              {flashcards.length > 5 && (
                <Card className="p-4 text-center border-dashed">
                  <p className="text-sm text-muted-foreground mb-3">
                    +{flashcards.length - 5} flashcards adicionais
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = '/flashcards'}>
                    Ver todos os flashcards
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              )}
            </div>
          </div>

          {/* Quizzes Section */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">📝 Questões</h2>
            <div className="space-y-3">
              {quizzes.slice(0, 5).map((q, index) => (
                <Card key={q.id} className="p-4 hover:bg-accent/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-accent">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{q.question}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {q.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {q.options.length} opções
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {quizzes.length > 5 && (
                <Card className="p-4 text-center border-dashed">
                  <p className="text-sm text-muted-foreground mb-3">
                    +{quizzes.length - 5} questões adicionais
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = '/quizzes'}>
                    Ver todos os quizzes
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => window.location.href = '/flashcards'}
          >
            📇 Começar Flashcards
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = '/quizzes'}
          >
            📝 Começar Quiz
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
