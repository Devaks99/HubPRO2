import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error('Por favor, digite seu nome de usuário');
      return;
    }

    setIsLoading(true);
    try {
      login(username.trim());
      toast.success(`Bem-vindo, ${username}!`);
      setLocation('/');
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Protheus Master
          </h1>
          <p className="text-muted-foreground">
            Domine ADVPL com uma plataforma moderna e gamificada
          </p>
        </div>

        <Card className="p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Nome de Usuário
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="w-full"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              💡 Dica: Use qualquer nome para começar. Seus dados serão salvos localmente.
            </p>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl mb-2">📇</div>
            <p className="text-xs text-muted-foreground">Flashcards</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📝</div>
            <p className="text-xs text-muted-foreground">Quizzes</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-xs text-muted-foreground">Gamificação</p>
          </div>
        </div>
      </div>
    </div>
  );
}
