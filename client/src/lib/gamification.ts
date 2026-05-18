/**
 * PROTHEUS MASTER - Gamification System
 * 
 * Sistema de pontuação, níveis, badges e ranking
 * Inspirado em Duolingo mas adaptado para contexto corporativo
 */

export interface UserStats {
  userId: string;
  username: string; // Nome de usuário editável
  level: number;
  totalXP: number;
  currentXP: number; // XP até próximo nível
  streak: number; // Dias consecutivos
  longestStreak: number;
  totalFlashcardsReviewed: number;
  totalQuizzesCompleted: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  accuracy: number; // Percentual
  badges: Badge[];
  lastActivityDate: string;
  joinDate: string;

  // Perfil
  bio: string;
  avatarUrl: string | null; // DataURL
  profileIconKey: string; // lucide-react key
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}

export interface LevelConfig {
  level: number;
  requiredXP: number;
  title: string;
  description: string;
  color: string;
}

export interface RankingEntry {
  rank: number;
  userId: string;
  username: string;
  level: number;
  totalXP: number;
  streak: number;
  accuracy: number;
}

// ============================================================================
// CONFIGURAÇÃO DE NÍVEIS
// ============================================================================

export const levelConfigs: LevelConfig[] = [
  {
    level: 1,
    requiredXP: 0,
    title: 'Iniciante',
    description: 'Começando sua jornada em ADVPL',
    color: '#6B7280',
  },
  {
    level: 2,
    requiredXP: 100,
    title: 'Aprendiz',
    description: 'Dominando os conceitos básicos',
    color: '#3B82F6',
  },
  {
    level: 3,
    requiredXP: 250,
    title: 'Desenvolvedor',
    description: 'Progredindo nos estudos',
    color: '#10B981',
  },
  {
    level: 4,
    requiredXP: 450,
    title: 'Especialista',
    description: 'Conhecimento avançado em construção',
    color: '#F59E0B',
  },
  {
    level: 5,
    requiredXP: 700,
    title: 'Mestre',
    description: 'Dominando ADVPL com maestria',
    color: '#8B5CF6',
  },
  {
    level: 6,
    requiredXP: 1000,
    title: 'Arquiteto',
    description: 'Projetando soluções complexas',
    color: '#EC4899',
  },
  {
    level: 7,
    requiredXP: 1350,
    title: 'Sênior',
    description: 'Expertise em Protheus',
    color: '#06B6D4',
  },
  {
    level: 8,
    requiredXP: 1750,
    title: 'Lenda',
    description: 'O conhecimento supremo de ADVPL',
    color: '#14B8A6',
  },
];

// ============================================================================
// CONFIGURAÇÃO DE BADGES
// ============================================================================

export const badgeConfigs: Badge[] = [
  // Badges de Início
  {
    id: 'first-flashcard',
    name: 'Primeiro Passo',
    description: 'Completou seu primeiro flashcard',
    icon: '👣',
    unlockedAt: '',
    rarity: 'comum',
  },
  {
    id: 'first-quiz',
    name: 'Quiz Master Iniciante',
    description: 'Completou seu primeiro quiz',
    icon: '📝',
    unlockedAt: '',
    rarity: 'comum',
  },
  // Badges de Consistência
  {
    id: 'streak-7',
    name: 'Semana Produtiva',
    description: 'Manteve 7 dias de streak',
    icon: '🔥',
    unlockedAt: '',
    rarity: 'raro',
  },
  {
    id: 'streak-30',
    name: 'Um Mês Imparável',
    description: 'Manteve 30 dias de streak',
    icon: '🌟',
    unlockedAt: '',
    rarity: 'épico',
  },
  {
    id: 'streak-100',
    name: 'Lendário',
    description: 'Manteve 100 dias de streak',
    icon: '👑',
    unlockedAt: '',
    rarity: 'lendário',
  },
  // Badges de Acurácia
  {
    id: 'perfect-quiz',
    name: 'Perfeição',
    description: 'Completou um quiz com 100% de acurácia',
    icon: '💯',
    unlockedAt: '',
    rarity: 'raro',
  },
  {
    id: 'accuracy-90',
    name: 'Precisão Excepcional',
    description: 'Mantém 90% de acurácia geral',
    icon: '🎯',
    unlockedAt: '',
    rarity: 'épico',
  },
  // Badges de Exploração
  {
    id: 'all-categories',
    name: 'Explorador Completo',
    description: 'Estudou todas as categorias',
    icon: '🗺️',
    unlockedAt: '',
    rarity: 'épico',
  },
  {
    id: 'logica-master',
    name: 'Mestre da Lógica',
    description: 'Completou todos os flashcards de Lógica de Programação',
    icon: '🧠',
    unlockedAt: '',
    rarity: 'raro',
  },
  {
    id: 'advpl-master',
    name: 'Mestre ADVPL',
    description: 'Completou todos os flashcards de Linguagem ADVPL',
    icon: '⚙️',
    unlockedAt: '',
    rarity: 'raro',
  },
  // Badges de Milestones
  {
    id: 'level-5',
    name: 'Mestre Alcançado',
    description: 'Atingiu nível 5',
    icon: '🏆',
    unlockedAt: '',
    rarity: 'épico',
  },
  {
    id: 'level-8',
    name: 'Supremacia',
    description: 'Atingiu nível 8 (máximo)',
    icon: '👑',
    unlockedAt: '',
    rarity: 'lendário',
  },
  // Badges de Volume
  {
    id: 'flashcards-100',
    name: 'Estudioso',
    description: 'Revisou 100 flashcards',
    icon: '📚',
    unlockedAt: '',
    rarity: 'raro',
  },
  {
    id: 'flashcards-500',
    name: 'Enciclopédia Viva',
    description: 'Revisou 500 flashcards',
    icon: '📖',
    unlockedAt: '',
    rarity: 'épico',
  },
  {
    id: 'quizzes-50',
    name: 'Testador Ávido',
    description: 'Completou 50 quizzes',
    icon: '✅',
    unlockedAt: '',
    rarity: 'raro',
  },
];

// ============================================================================
// SISTEMA DE XP
// ============================================================================

export const XP_REWARDS = {
  FLASHCARD_REVIEW: 5, // Por flashcard revisado
  QUIZ_QUESTION_CORRECT: 10, // Por questão correta
  QUIZ_QUESTION_WRONG: 2, // Por questão errada (metade)
  PERFECT_QUIZ: 50, // Bônus por quiz perfeito (100%)
  DAILY_STREAK: 25, // Bônus diário por manter streak
  CATEGORY_COMPLETION: 100, // Bônus por completar categoria
};

// ============================================================================
// Funções auxiliares de gamificação
// ============================================================================

/**
 * Calcula o nível baseado no XP total
 */
export function calculateLevel(totalXP: number): number {
  let level = 1;
  for (const config of levelConfigs) {
    if (totalXP >= config.requiredXP) {
      level = config.level;
    } else {
      break;
    }
  }
  return level;
}

/**
 * Calcula o XP necessário para o próximo nível
 */
export function getXPForNextLevel(currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  const nextConfig = levelConfigs.find(c => c.level === nextLevel);
  return nextConfig?.requiredXP || levelConfigs[levelConfigs.length - 1].requiredXP;
}

/**
 * Calcula o XP necessário para o nível atual
 */
export function getXPForCurrentLevel(currentLevel: number): number {
  const currentConfig = levelConfigs.find(c => c.level === currentLevel);
  return currentConfig?.requiredXP || 0;
}

/**
 * Calcula o progresso até o próximo nível (0-100)
 */
export function calculateLevelProgress(totalXP: number, currentLevel: number): number {
  const currentLevelXP = getXPForCurrentLevel(currentLevel);
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  return Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);
}

/**
 * Obtém configuração de nível
 */
export function getLevelConfig(level: number): LevelConfig | undefined {
  return levelConfigs.find(c => c.level === level);
}

/**
 * Calcula acurácia percentual
 */
export function calculateAccuracy(correct: number, wrong: number): number {
  const total = correct + wrong;
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Verifica se badge deve ser desbloqueado
 */
export function checkBadgeUnlock(
  badgeId: string,
  stats: UserStats,
): boolean {
  switch (badgeId) {
    case 'first-flashcard':
      return stats.totalFlashcardsReviewed >= 1;
    case 'first-quiz':
      return stats.totalQuizzesCompleted >= 1;
    case 'streak-7':
      return stats.streak >= 7;
    case 'streak-30':
      return stats.streak >= 30;
    case 'streak-100':
      return stats.streak >= 100;
    case 'perfect-quiz':
      return stats.accuracy === 100;
    case 'accuracy-90':
      return stats.accuracy >= 90;
    case 'flashcards-100':
      return stats.totalFlashcardsReviewed >= 100;
    case 'flashcards-500':
      return stats.totalFlashcardsReviewed >= 500;
    case 'quizzes-50':
      return stats.totalQuizzesCompleted >= 50;
    case 'level-5':
      return stats.level >= 5;
    case 'level-8':
      return stats.level >= 8;
    default:
      return false;
  }
}

/**
 * Cria usuário com stats iniciais
 */
export function createInitialUserStats(userId: string, username: string): UserStats {
  return {
    userId,
    username,
    level: 1,
    totalXP: 0,
    currentXP: 0,
    streak: 0,
    longestStreak: 0,
    totalFlashcardsReviewed: 0,
    totalQuizzesCompleted: 0,
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    accuracy: 0,
    badges: [],
    lastActivityDate: new Date().toISOString(),
    joinDate: new Date().toISOString(),

    bio: '',
    avatarUrl: null,
    profileIconKey: 'User',
  };
}
