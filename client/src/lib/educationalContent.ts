/**
 * PROTHEUS MASTER - Educational Content Database
 * 
 * Design Philosophy: Corporativo Minimalista
 * - Dados estruturados para flashcards, quizzes e gamificação
 * - Categorias bem definidas com conteúdo real do ADVPL
 * - Sistema de dificuldade para progressão natural
 */

export interface Flashcard {
  id: string;
  category: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  front: string; // Pergunta
  back: string; // Resposta
  tags: string[];
  nextReview?: number; // Timestamp para spaced repetition
  interval?: number; // Dias até próxima revisão
  easeFactor?: number; // Fator de dificuldade (SM-2)
}

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
  question: string;
  type: 'multiple' | 'true-false';
  options: string[];
  correctAnswer: number; // Índice da resposta correta
  explanation: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  flashcardCount: number;
  quizCount: number;
  estimatedHours: number;
}

// ============================================================================
// CATEGORIAS PRINCIPAIS
// ============================================================================

export const categories: Category[] = [
  {
    id: 'logica-programacao',
    name: 'Lógica de Programação',
    description: 'Fundamentos de algoritmos, fluxogramas e pseudocódigo',
    icon: '',

    color: '#3B82F6',
    flashcardCount: 45,
    quizCount: 12,
    estimatedHours: 8,
  },
  {
    id: 'linguagem-advpl',
    name: 'Linguagem ADVPL',
    description: 'Sintaxe, operadores, variáveis e macrosubstituição',
    icon: '',

    color: '#10B981',
    flashcardCount: 68,
    quizCount: 18,
    estimatedHours: 12,
  },
  {
    id: 'estruturas-dados',
    name: 'Estruturas de Dados',
    description: 'Matrizes, arrays e organização de dados',
    icon: '',

    color: '#F59E0B',
    flashcardCount: 52,
    quizCount: 14,
    estimatedHours: 10,
  },
  {
    id: 'controle-fluxo',
    name: 'Controle de Fluxo',
    description: 'Condições, loops e estruturas de decisão',
    icon: '',

    color: '#8B5CF6',
    flashcardCount: 58,
    quizCount: 16,
    estimatedHours: 11,
  },
  {
    id: 'funcoes-procedimentos',
    name: 'Funções e Procedimentos',
    description: 'Criação e utilização de funções em ADVPL',
    icon: '',

    color: '#EC4899',
    flashcardCount: 42,
    quizCount: 11,
    estimatedHours: 9,
  },
  {
    id: 'banco-dados',
    name: 'Banco de Dados',
    description: 'Operações com tabelas, queries e relacionamentos',
    icon: '',

    color: '#06B6D4',
    flashcardCount: 38,
    quizCount: 10,
    estimatedHours: 8,
  },
  {
    id: 'ide-ferramentas',
    name: 'IDE e Ferramentas',
    description: 'Ambiente de desenvolvimento, wizard e configurador',
    icon: '',

    color: '#14B8A6',
    flashcardCount: 55,
    quizCount: 15,
    estimatedHours: 10,
  },
];

// ============================================================================
// FLASHCARDS - LÓGICA DE PROGRAMAÇÃO
// ============================================================================

export const flashcardsLogica: Flashcard[] = [
  {
    id: 'fc-logica-001',
    category: 'logica-programacao',
    difficulty: 'fácil',
    front: 'O que é lógica de programação?',
    back: 'É a definição passo a passo da estrutura de pensamentos para execução de tarefas a fim de atingir um objetivo.',
    tags: ['conceito', 'definição'],
  },
  {
    id: 'fc-logica-002',
    category: 'logica-programacao',
    difficulty: 'fácil',
    front: 'Quais são os 7 passos para construção de um algoritmo?',
    back: '1. Ter um problema\n2. Entender o problema\n3. Definir dados de entrada\n4. Definir processamento\n5. Definir dados de saída\n6. Construir o algoritmo\n7. Testar o algoritmo',
    tags: ['algoritmo', 'passos'],
  },
  {
    id: 'fc-logica-003',
    category: 'logica-programacao',
    difficulty: 'fácil',
    front: 'Quais são os 3 tipos de algoritmo?',
    back: '1. Narrativa: Uso de linguagem natural\n2. Fluxograma: Uso de símbolos gráficos\n3. Pseudocódigo: Uso de regras definidas',
    tags: ['algoritmo', 'tipos'],
  },
  {
    id: 'fc-logica-004',
    category: 'logica-programacao',
    difficulty: 'médio',
    front: 'O que significa "Tautologia" em lógica?',
    back: 'Uma proposição que é sempre verdadeira, independente do conteúdo lógico das variáveis A/B.',
    tags: ['lógica', 'proposição'],
  },
  {
    id: 'fc-logica-005',
    category: 'logica-programacao',
    difficulty: 'médio',
    front: 'O que significa "Contradição" em lógica?',
    back: 'Uma proposição que é sempre falsa, independente do conteúdo lógico das variáveis A/B.',
    tags: ['lógica', 'proposição'],
  },
  {
    id: 'fc-logica-006',
    category: 'logica-programacao',
    difficulty: 'médio',
    front: 'Qual é o símbolo para "Não" na tabela verdade?',
    back: '~ (til)',
    tags: ['tabela-verdade', 'operador'],
  },
  {
    id: 'fc-logica-007',
    category: 'logica-programacao',
    difficulty: 'médio',
    front: 'Qual é o símbolo para "E" na tabela verdade?',
    back: '^ (circunflexo) - Conjunção',
    tags: ['tabela-verdade', 'operador'],
  },
  {
    id: 'fc-logica-008',
    category: 'logica-programacao',
    difficulty: 'médio',
    front: 'Qual é o símbolo para "Ou" na tabela verdade?',
    back: 'v (v minúsculo) - Disjunção',
    tags: ['tabela-verdade', 'operador'],
  },
  {
    id: 'fc-logica-009',
    category: 'logica-programacao',
    difficulty: 'difícil',
    front: 'Na conjunção (^), qual é o resultado quando uma das condições é falsa?',
    back: 'O resultado será FALSO. A conjunção só é verdadeira quando AMBAS as condições são verdadeiras.',
    tags: ['tabela-verdade', 'conjunção'],
  },
  {
    id: 'fc-logica-010',
    category: 'logica-programacao',
    difficulty: 'difícil',
    front: 'Na disjunção (v), qual é o resultado quando uma das condições é verdadeira?',
    back: 'O resultado será VERDADEIRO. A disjunção é verdadeira quando PELO MENOS UMA das condições é verdadeira.',
    tags: ['tabela-verdade', 'disjunção'],
  },
];

// ============================================================================
// FLASHCARDS - LINGUAGEM ADVPL
// ============================================================================

export const flashcardsAdvpl: Flashcard[] = [
  {
    id: 'fc-advpl-001',
    category: 'linguagem-advpl',
    difficulty: 'fácil',
    front: 'O que é ADVPL?',
    back: 'ADVPL é a linguagem de programação proprietária do TOTVS Protheus, utilizada para desenvolver customizações e extensões no sistema.',
    tags: ['conceito', 'definição'],
  },
  {
    id: 'fc-advpl-002',
    category: 'linguagem-advpl',
    difficulty: 'fácil',
    front: 'Qual é a extensão de arquivo padrão para código ADVPL?',
    back: '.prw (Protheus Routine)',
    tags: ['arquivo', 'extensão'],
  },
  {
    id: 'fc-advpl-003',
    category: 'linguagem-advpl',
    difficulty: 'médio',
    front: 'O que é macrosubstituição em ADVPL?',
    back: 'É um mecanismo de pré-processamento que substitui macros (variáveis) por seus valores antes da compilação do código.',
    tags: ['macro', 'pré-processamento'],
  },
  {
    id: 'fc-advpl-004',
    category: 'linguagem-advpl',
    difficulty: 'médio',
    front: 'Qual é a sintaxe para declarar uma variável em ADVPL?',
    back: 'Local <nome> := <valor>\nOu: Local <nome> As <tipo>',
    tags: ['variável', 'sintaxe'],
  },
  {
    id: 'fc-advpl-005',
    category: 'linguagem-advpl',
    difficulty: 'médio',
    front: 'Quais são os tipos de dados primitivos em ADVPL?',
    back: 'Character, Numeric, Date, Logical, Array, Object, Variant',
    tags: ['tipos', 'dados'],
  },
];

// ============================================================================
// FLASHCARDS - ESTRUTURAS DE DADOS
// ============================================================================

export const flashcardsEstruturasData: Flashcard[] = [
  {
    id: 'fc-estrutura-001',
    category: 'estruturas-dados',
    difficulty: 'fácil',
    front: 'O que é uma matriz em programação?',
    back: 'Uma estrutura de dados que armazena múltiplos valores do mesmo tipo em um único identificador, organizados em linhas e colunas.',
    tags: ['matriz', 'array'],
  },
  {
    id: 'fc-estrutura-002',
    category: 'estruturas-dados',
    difficulty: 'fácil',
    front: 'Como se declara uma matriz em ADVPL?',
    back: 'Local aMatriz[10] ou Local aMatriz := Array(10)',
    tags: ['matriz', 'declaração'],
  },
  {
    id: 'fc-estrutura-003',
    category: 'estruturas-dados',
    difficulty: 'médio',
    front: 'O que é uma matriz bidimensional?',
    back: 'Uma matriz com linhas e colunas, permitindo armazenar dados em formato tabular. Exemplo: Local aMatriz[5,3]',
    tags: ['matriz', 'bidimensional'],
  },
  {
    id: 'fc-estrutura-004',
    category: 'estruturas-dados',
    difficulty: 'médio',
    front: 'Como acessar um elemento específico em uma matriz?',
    back: 'Usando o índice entre colchetes. Exemplo: aMatriz[2] para unidimensional ou aMatriz[2,3] para bidimensional',
    tags: ['matriz', 'acesso'],
  },
];

// ============================================================================
// QUIZ QUESTIONS - LÓGICA DE PROGRAMAÇÃO
// ============================================================================

export const quizQuestionsLogica: QuizQuestion[] = [
  {
    id: 'quiz-logica-001',
    category: 'logica-programacao',
    difficulty: 'fácil',
    question: 'Qual é o primeiro passo para construir um algoritmo?',
    type: 'multiple',
    options: [
      'Testar o algoritmo',
      'Ter um problema',
      'Construir o algoritmo',
      'Definir dados de entrada',
    ],
    correctAnswer: 1,
    explanation: 'O primeiro passo é identificar e ter um problema a ser resolvido. Sem problema, não há necessidade de algoritmo.',
    tags: ['algoritmo', 'passos'],
  },
  {
    id: 'quiz-logica-002',
    category: 'logica-programacao',
    difficulty: 'fácil',
    question: 'Verdadeiro ou Falso: Um fluxograma é um tipo de algoritmo que usa símbolos gráficos.',
    type: 'true-false',
    options: ['Verdadeiro', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadeiro! Fluxograma é um dos três tipos de algoritmo e utiliza símbolos gráficos para representar o fluxo.',
    tags: ['algoritmo', 'fluxograma'],
  },
  {
    id: 'quiz-logica-003',
    category: 'logica-programacao',
    difficulty: 'médio',
    question: 'Na tabela verdade, qual é o resultado de A ^ B quando A=V e B=F?',
    type: 'multiple',
    options: ['Verdadeiro', 'Falso', 'Indefinido', 'Nulo'],
    correctAnswer: 1,
    explanation: 'Na conjunção (^), o resultado é FALSO quando uma das condições é falsa. Só é verdadeiro quando ambas são verdadeiras.',
    tags: ['tabela-verdade', 'conjunção'],
  },
  {
    id: 'quiz-logica-004',
    category: 'logica-programacao',
    difficulty: 'médio',
    question: 'Na tabela verdade, qual é o resultado de A v B quando A=F e B=F?',
    type: 'multiple',
    options: ['Verdadeiro', 'Falso', 'Indefinido', 'Nulo'],
    correctAnswer: 1,
    explanation: 'Na disjunção (v), o resultado é FALSO apenas quando ambas as condições são falsas.',
    tags: ['tabela-verdade', 'disjunção'],
  },
];

// ============================================================================
// QUIZ QUESTIONS - LINGUAGEM ADVPL
// ============================================================================

export const quizQuestionsAdvpl: QuizQuestion[] = [
  {
    id: 'quiz-advpl-001',
    category: 'linguagem-advpl',
    difficulty: 'fácil',
    question: 'Qual é a extensão de arquivo padrão para código ADVPL?',
    type: 'multiple',
    options: ['.adv', '.prw', '.asp', '.vb'],
    correctAnswer: 1,
    explanation: '.prw significa Protheus Routine e é a extensão padrão para arquivos de código ADVPL.',
    tags: ['arquivo', 'extensão'],
  },
  {
    id: 'quiz-advpl-002',
    category: 'linguagem-advpl',
    difficulty: 'fácil',
    question: 'Verdadeiro ou Falso: ADVPL é uma linguagem de programação proprietária do TOTVS Protheus.',
    type: 'true-false',
    options: ['Verdadeiro', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadeiro! ADVPL é a linguagem proprietária utilizada especificamente no ecossistema TOTVS Protheus.',
    tags: ['conceito', 'advpl'],
  },
];

// ============================================================================
// Função auxiliar para obter todas as flashcards
// ============================================================================

export function getAllFlashcards(): Flashcard[] {
  return [
    ...flashcardsLogica,
    ...flashcardsAdvpl,
    ...flashcardsEstruturasData,
  ];
}

// ============================================================================
// Função auxiliar para obter todas as questões de quiz
// ============================================================================

export function getAllQuizQuestions(): QuizQuestion[] {
  return [
    ...quizQuestionsLogica,
    ...quizQuestionsAdvpl,
  ];
}

// ============================================================================
// Função para obter flashcards por categoria
// ============================================================================

export function getFlashcardsByCategory(categoryId: string): Flashcard[] {
  return getAllFlashcards().filter(fc => fc.category === categoryId);
}

// ============================================================================
// Função para obter questões por categoria
// ============================================================================

export function getQuizQuestionsByCategory(categoryId: string): QuizQuestion[] {
  return getAllQuizQuestions().filter(q => q.category === categoryId);
}
