import React, { useState } from 'react';
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
import { categories, getAllQuizQuestions, QuizQuestion } from '@/lib/educationalContent';
import { XP_REWARDS } from '@/lib/gamification';
import { toast } from 'sonner';

interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  completed: boolean;
  score: number;
}

export default function Quizzes() {
  const { user, addXP, incrementStreak } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [questionCount, setQuestionCount] = useState(20);
  const [sessionMode, setSessionMode] = useState<'browse' | 'quiz'>('browse');
  const [session, setSession] = useState<QuizSession | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const startQuiz = () => {
    let questions = getAllQuizQuestions();
    if (selectedCategory !== 'all') {
      questions = questions.filter(q => q.category === selectedCategory);
    }
    questions = questions.sort(() => Math.random() - 0.5).slice(0, questionCount);

    setSession({
      questions,
      currentIndex: 0,
      answers: new Array(questions.length).fill(null),
      completed: false,
      score: 0,
    });
    setSessionMode('quiz');
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!session) return;

    const question = session.questions[session.currentIndex];
    const isCorrect = answerIndex === question.correctAnswer;
    const newAnswers = [...session.answers];
    newAnswers[session.currentIndex] = answerIndex;

    const newScore = isCorrect ? session.score + 1 : session.score;

    addXP(isCorrect ? XP_REWARDS.QUIZ_QUESTION_CORRECT : XP_REWARDS.QUIZ_QUESTION_WRONG);

    if (user) {
      const totalCorrect = user.totalCorrectAnswers + (isCorrect ? 1 : 0);
      const totalWrong = user.totalWrongAnswers + (isCorrect ? 0 : 1);
      const accuracy = Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100);
      user.totalQuizzesCompleted += 1;
      user.totalCorrectAnswers = totalCorrect;
      user.totalWrongAnswers = totalWrong;
      user.accuracy = accuracy;
    }

    if (session.currentIndex < session.questions.length - 1) {
      setSession({
        ...session,
        currentIndex: session.currentIndex + 1,
        answers: newAnswers,
        score: newScore,
      });
      setSelectedAnswer(null);
    } else {
      const finalScore = newScore;
      const accuracy = Math.round((finalScore / session.questions.length) * 100);

      if (accuracy === 100) {
        addXP(XP_REWARDS.PERFECT_QUIZ);
        toast.success('Quiz perfeito! 🎉');
      }

      incrementStreak();

      setSession({
        ...session,
        currentIndex: session.currentIndex + 1,
        answers: newAnswers,
        score: finalScore,
        completed: true,
      });
    }
  };

  const handleNext = () => {
    if (!session || selectedAnswer === null) {
      toast.error('Selecione uma resposta');
      return;
    }
    handleAnswer(selectedAnswer);
  };

  if (sessionMode === 'quiz' && session && !session.completed) {
    const question = session.questions[session.currentIndex];
    const progress = ((session.currentIndex + 1) / session.questions.length) * 100;

    return (
      <MainLayout
        sidebar={<SidebarNav currentPath="/quizzes" />}
        header={<HeaderUser />}
      >
        <div className="p-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Questão {session.currentIndex + 1} de {session.questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {session.score} acertos
              </span>
            </div>
            <Progress value={progress} />
          </div>

          <Card className="p-8 mb-8">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Dificuldade: {question.difficulty}</p>
              <h2 className="text-2xl font-semibold text-foreground">{question.question}</h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`}
                    >
                      {selectedAnswer === index && (
                        <span className="text-primary-foreground text-sm font-bold">✓</span>
                      )}
                    </div>
                    <span className="text-foreground">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setSessionMode('browse')}
            >
              Sair
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
            >
              {session.currentIndex === session.questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (sessionMode === 'quiz' && session && session.completed) {
    const accuracy = Math.round((session.score / session.questions.length) * 100);

    return (
      <MainLayout
        sidebar={<SidebarNav currentPath="/quizzes" />}
        header={<HeaderUser />}
      >
        <div className="p-6 max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">
                {accuracy === 100 ? '🎉' : accuracy >= 80 ? '🌟' : accuracy >= 60 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Concluído!</h2>
              <p className="text-muted-foreground">Veja seus resultados abaixo</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Acertos</p>
                <p className="text-3xl font-bold text-accent">{session.score}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-3xl font-bold text-primary">{session.questions.length}</p>
              </div>
              <div className="p-4 bg-info/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Acurácia</p>
                <p className="text-3xl font-bold text-info">{accuracy}%</p>
              </div>
            </div>

            <div className="mb-6">
              <Progress value={accuracy} className="h-3" />
            </div>

            <div className="space-y-2 mb-6">
              {accuracy === 100 && (
                <p className="text-sm text-accent font-medium">Perfeito! Você dominou este quiz! 🏆</p>
              )}
              {accuracy >= 80 && accuracy < 100 && (
                <p className="text-sm text-primary font-medium">Excelente desempenho!</p>
              )}
              {accuracy >= 60 && accuracy < 80 && (
                <p className="text-sm text-muted-foreground">Bom trabalho! Continue estudando.</p>
              )}
              {accuracy < 60 && (
                <p className="text-sm text-muted-foreground">Revise o conteúdo e tente novamente.</p>
              )}
            </div>

            <Button
              onClick={() => {
                setSessionMode('browse');
                setSession(null);
              }}
              className="w-full"
            >
              Voltar
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath="/quizzes" />}
      header={<HeaderUser />}
    >
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quizzes</h1>
          <p className="text-muted-foreground">
            Teste seu conhecimento com questões variadas
          </p>
        </div>

        <Card className="p-8 max-w-2xl">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Configurar Quiz</h2>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Categoria
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
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

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Quantidade de Questões
              </label>
              <Select value={String(questionCount)} onValueChange={v => setQuestionCount(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 questões</SelectItem>
                  <SelectItem value="50">50 questões</SelectItem>
                  <SelectItem value="70">70 questões</SelectItem>
                  <SelectItem value="100">100 questões</SelectItem>
                  <SelectItem value="150">150 questões</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={startQuiz} className="w-full" size="lg">
              Começar Quiz
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
