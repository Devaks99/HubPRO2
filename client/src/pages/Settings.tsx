import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { MainLayout } from '@/components/MainLayout';
import { SidebarNav } from '@/components/SidebarNav';
import { HeaderUser } from '@/components/HeaderUser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Bell, Moon, Volume2, Zap } from 'lucide-react';

export default function Settings() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <MainLayout
      sidebar={<SidebarNav currentPath="/settings" />}
      header={<HeaderUser />}
    >
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">Personalize sua experiência de aprendizado</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Notificações</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes para manter seu streak
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            {notifications && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-reminder" className="text-sm">
                    Lembrete diário
                  </Label>
                  <Switch id="daily-reminder" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="streak-alert" className="text-sm">
                    Alerta de streak perdido
                  </Label>
                  <Switch id="streak-alert" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="achievement-notify" className="text-sm">
                    Notificações de conquistas
                  </Label>
                  <Switch id="achievement-notify" defaultChecked />
                </div>
              </div>
            )}
          </Card>

          {/* Display */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Aparência</h3>
                <p className="text-sm text-muted-foreground">
                  Escolha o tema de exibição
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-sm">
                  Modo escuro
                </Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {darkMode
                  ? 'Modo escuro ativado. Reduz a fadiga ocular em ambientes com pouca luz.'
                  : 'Modo claro ativado. Melhor para ambientes bem iluminados.'}
              </p>
            </div>
          </Card>

          {/* Sound */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Áudio</h3>
                  <p className="text-sm text-muted-foreground">
                    Controle os sons da plataforma
                  </p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>

            {soundEnabled && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="correct-sound" className="text-sm">
                    Som de acerto
                  </Label>
                  <Switch id="correct-sound" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wrong-sound" className="text-sm">
                    Som de erro
                  </Label>
                  <Switch id="wrong-sound" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="level-up-sound" className="text-sm">
                    Som de subida de nível
                  </Label>
                  <Switch id="level-up-sound" defaultChecked />
                </div>
              </div>
            )}
          </Card>

          {/* Learning */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-info" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Aprendizado</h3>
                <p className="text-sm text-muted-foreground">
                  Configure suas preferências de estudo
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="difficulty-select" className="text-sm mb-2 block">
                  Nível de dificuldade padrão
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Fácil</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="hard">Difícil</SelectItem>
                    <SelectItem value="mixed">Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="spaced-rep" className="text-sm">
                  Repetição espaçada automática
                </Label>
                <Switch id="spaced-rep" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-hints" className="text-sm">
                  Mostrar dicas em quizzes
                </Label>
                <Switch id="show-hints" defaultChecked />
              </div>
            </div>
          </Card>

          {/* Data & Privacy */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Dados e Privacidade</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                📊 Baixar meus dados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🔄 Resetar progresso
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() => {
                  if (confirm('Tem certeza? Essa ação não pode ser desfeita.')) {
                    toast.error('Conta deletada');
                  }
                }}
              >
                🗑️ Deletar conta
              </Button>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold text-foreground mb-4">Sobre</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Versão da plataforma</span>
                <span className="font-medium text-foreground">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Usuário</span>
                <span className="font-medium text-foreground">{user?.username}</span>
              </div>
              <div className="flex justify-between">
                <span>Nível</span>
                <span className="font-medium text-foreground">Nível {user?.level}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Configurações
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
