/**
 * PROTHEUS MASTER - Spaced Repetition (SM-2 Algorithm)
 * 
 * Implementação do algoritmo SuperMemo 2 para otimizar revisão de flashcards
 * Referência: https://en.wikipedia.org/wiki/Spaced_repetition#SM-2
 */

export interface FlashcardReview {
  id: string;
  lastReview: number; // Timestamp
  nextReview: number; // Timestamp
  interval: number; // Dias até próxima revisão
  easeFactor: number; // Fator de dificuldade (2.5 padrão)
  repetitions: number; // Número de revisões bem-sucedidas
  quality: number; // 0-5: qualidade da resposta (5=perfeito, 0=completo fracasso)
}

/**
 * Calcula a próxima revisão usando SM-2
 * 
 * @param review - Dados da revisão anterior
 * @param quality - Qualidade da resposta (0-5)
 * @returns Novos dados de revisão
 */
export function calculateNextReview(
  review: FlashcardReview,
  quality: number,
): FlashcardReview {
  let { easeFactor, repetitions, interval } = review;
  const now = Date.now();

  // Validar qualidade
  const q = Math.max(0, Math.min(5, quality));

  // Atualizar fator de facilidade (EF)
  easeFactor = Math.max(
    1.3,
    easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02),
  );

  // Calcular novo intervalo
  if (q < 3) {
    // Resposta ruim - resetar
    repetitions = 0;
    interval = 1;
  } else {
    // Resposta boa
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Calcular próxima revisão (em milissegundos)
  const nextReviewTime = now + interval * 24 * 60 * 60 * 1000;

  return {
    id: review.id,
    lastReview: now,
    nextReview: nextReviewTime,
    interval,
    easeFactor,
    repetitions,
    quality: q,
  };
}

/**
 * Cria um novo registro de flashcard
 */
export function createFlashcardReview(id: string): FlashcardReview {
  const now = Date.now();
  return {
    id,
    lastReview: now,
    nextReview: now, // Pronto para revisar imediatamente
    interval: 0,
    easeFactor: 2.5, // Padrão SM-2
    repetitions: 0,
    quality: 0,
  };
}

/**
 * Determina se um flashcard está pronto para revisão
 */
export function isReadyForReview(review: FlashcardReview): boolean {
  return Date.now() >= review.nextReview;
}

/**
 * Calcula dias até próxima revisão
 */
export function daysUntilNextReview(review: FlashcardReview): number {
  const now = Date.now();
  const daysMs = review.nextReview - now;
  return Math.max(0, Math.ceil(daysMs / (24 * 60 * 60 * 1000)));
}

/**
 * Obtém status de dificuldade do flashcard
 */
export function getDifficultyStatus(review: FlashcardReview): 'novo' | 'fácil' | 'médio' | 'difícil' {
  if (review.repetitions === 0) return 'novo';
  if (review.easeFactor >= 2.8) return 'fácil';
  if (review.easeFactor >= 2.3) return 'médio';
  return 'difícil';
}

/**
 * Calcula estatísticas de revisão
 */
export interface ReviewStats {
  totalCards: number;
  newCards: number;
  readyForReview: number;
  learning: number;
  review: number;
  averageEaseFactor: number;
  totalReviews: number;
}

export function calculateReviewStats(reviews: FlashcardReview[]): ReviewStats {
  const now = Date.now();
  let totalReviews = 0;
  let totalEaseFactor = 0;
  let cardsWithReviews = 0;

  const stats = {
    totalCards: reviews.length,
    newCards: 0,
    readyForReview: 0,
    learning: 0,
    review: 0,
    averageEaseFactor: 2.5,
    totalReviews: 0,
  };

  for (const review of reviews) {
    totalReviews += review.repetitions;
    totalEaseFactor += review.easeFactor;
    cardsWithReviews += review.repetitions > 0 ? 1 : 0;

    if (review.repetitions === 0) {
      stats.newCards += 1;
    } else if (review.nextReview <= now) {
      stats.readyForReview += 1;
    } else if (review.repetitions < 3) {
      stats.learning += 1;
    } else {
      stats.review += 1;
    }
  }

  stats.totalReviews = totalReviews;
  stats.averageEaseFactor = cardsWithReviews > 0 ? totalEaseFactor / cardsWithReviews : 2.5;

  return stats;
}
