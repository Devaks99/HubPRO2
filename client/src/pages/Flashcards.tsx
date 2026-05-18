import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { MainLayout } from '@/components/MainLayout';
import { SidebarNav } from '@/components/SidebarNav';
import { HeaderUser } from '@/components/HeaderUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, getAllFlashcards, Flashcard } from '@/lib/educationalContent';
import { FlashcardReview, createFlashcardReview, calculateNextReview, calculateReviewStats } from '@/lib/spacedRepetition';
import { XP_REWARDS } from '@/lib/gamification';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

function calculateReviewStats(reviews: FlashcardReview[]) {
  const now = Date.now();
  let newCards = 0;
  let readyForReview = 0;
  let learning = 0;
  let review = 0;

  for (const r of reviews) {
    if (r.repetitions === 0) newCards++;
    else if (r.nextReview <= now) readyForReview++;
    else if (r.repetitions < 3) learning++;
    else review++;
  }

  return { newCards, readyForReview, learning, review };
}

export default function Flashcards() {
  const { user, addXP, updateUserStats, incrementStreak } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sessionMode, setSessionMode] = useState<'browse' | 'review'>('browse');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [reviews, setReviews] = useState<Map<string, FlashcardReview>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  // Carregar flashcards
  useEffect(() => {
    let cards = getAllFlashcards();
    if (selectedCategory !== 'all') {
      cards = cards.filter(fc => fc.category === selectedCategory);
    }
    setFlashcards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);

    // Carregar reviews do localStorage
    const storedReviews = localStorage.getItem(`flashcard-reviews-${user?.userId}`);
    if (storedReviews) {
      const reviewsData = JSON.parse(storedReviews);
      const reviewsMap = new Map(Object.entries(reviewsData));
      setReviews(reviewsMap);
    } else {
      const newReviews = new Map<string, FlashcardReview>();
      cards.forEach(fc => {
        newReviews.set(fc.id, createFlashcardReview(fc.id));
      });
      setReviews(newReviews);
    }
  }, [selectedCategory, user?.userId]);

  const currentFlashcard = flashcards[currentIndex];
  const currentReview = currentFlashcard ? reviews.get(currentFlashcard.id) : null;

  const handleAnswer = (quality: number) => {
    if (!currentFlashcard || !currentReview) return;

    const newReview = calculateNextReview(currentReview, quality);
    const newReviews = new Map(reviews);
    newReviews.set(currentFlashcard.id, newReview);
    setReviews(newReviews);

    // Salvar no localStorage
    const reviewsObj = Object.fromEntries(newReviews);
    localStorage.setItem(`flashcard-reviews-${user?.userId}`, JSON.stringify(reviewsObj));

    // Adicionar XP
    addXP(XP_REWARDS.FLASHCARD_REVIEW);

    // Atualizar estatísticas
    if (quality >= 3) {
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    setSessionStats(prev => ({ ...prev, total: prev.total + 1 }));

    // Incrementar streak
    incrementStreak();

    // Próximo flashcard
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      toast.success('Sessão concluída!');
      setSessionMode('browse');
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  if (sessionMode === 'review' && currentFlashcard) {
    return (
      <MainLayout
        sidebar={<SidebarNav currentPath="/flashcards" />}
        header={<HeaderUser />}
      >
        <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                {currentIndex + 1} de {flashcards.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {sessionStats.correct}/{sessionStats.total} acertos
              </span>
            </div>
            <Progress value={((currentIndex + 1) / flashcards.length) * 100} />
          </div>

          {/* Flashcard */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <div
              className="w-full max-w-2xl h-80 cursor-pointer perspective"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              } as any}
            >
              <Card
                className="p-8 h-full flex flex-col items-center justify-center text-center"
                style={{
                  backfaceVisibility: 'hidden',
                } as any}
              >
                <p className="text-sm text-muted-foreground mb-4">Pergunta</p>
                <p className="text-2xl font-semibold text-foreground">
                  {currentFlashcard.front}
                </p>
                <p className="text-xs text-muted-foreground mt-6">Clique para virar</p>
              </Card>
            </div>
          </div>

          {isFlipped && (
            <div className="mb-6 p-6 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">Resposta</p>
              <p className="text-lg text-foreground whitespace-pre-line">
                {currentFlashcard.back}
              </p>
            </div>
          )}

          {/* Actions */}
          {isFlipped && (
            <div className="grid grid-cols-5 gap-2 mb-6">
              <Button
                variant="outline"
                onClick={() => handleAnswer(0)}
                className="text-xs"
              >
                Errei 😞
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAnswer(1)}
                className="text-xs"
              >
                Difícil
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAnswer(3)}
                className="text-xs"
              >
                Normal
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAnswer(4)}
                className="text-xs"
              >
                Fácil
              </Button>
              <Button
                variant="default"
                onClick={() => handleAnswer(5)}
                className="text-xs"
              >
                Perfeito! 🎉
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => setSessionMode('browse')}
            >
              Sair
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath="/flashcards" />}
      header={<HeaderUser />}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Flashcards</h1>
          <p className="text-muted-foreground">
            Revise com repetição espaçada para melhor retenção
          </p>
        </div>

        {/* Filtro de Categoria */}
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Categoria
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const categoryCards = flashcards.filter(fc => fc.category === category.id);
            if (categoryCards.length === 0) return null;

            const stats = calculateReviewStats(
              categoryCards.map(fc => reviews.get(fc.id)!).filter(Boolean)
            );

            return (
              <Card key={category.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-2xl mb-2">{category.icon}</p>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Novos</span>
                    <span className="font-medium text-foreground">{stats.newCards}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pronto para revisar</span>
                    <span className="font-medium text-accent">{stats.readyForReview}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Aprendendo</span>
                    <span className="font-medium text-foreground">{stats.learning}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revisão</span>
                    <span className="font-medium text-foreground">{stats.review}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSessionMode('review');
                  }}
                >
                  Começar sessão
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
