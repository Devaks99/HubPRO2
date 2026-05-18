import React from 'react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/educationalContent';

interface SidebarNavProps {
  currentPath?: string;
  onNavigate?: () => void;
}

export function SidebarNav({ currentPath = '/', onNavigate }: SidebarNavProps) {
  return (
    <nav className="space-y-1">
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Menu
        </h3>
        <div className="space-y-1">
          <NavLink
            href="/"
            isActive={currentPath === '/'}
            icon="🏠"
            label="Dashboard"
            onNavigate={onNavigate}
          />
          <NavLink
            href="/flashcards"
            isActive={currentPath === '/flashcards'}
            icon="📇"
            label="Flashcards"
            onNavigate={onNavigate}
          />
          <NavLink
            href="/quizzes"
            isActive={currentPath === '/quizzes'}
            icon="📝"
            label="Quizzes"
            onNavigate={onNavigate}
          />
          <NavLink
            href="/ranking"
            isActive={currentPath === '/ranking'}
            icon="🏆"
            label="Ranking"
            onNavigate={onNavigate}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Categorias
        </h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              href={`/category/${category.id}`}
              isActive={currentPath === `/category/${category.id}`}
              icon={category.icon}
              label={category.name}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-sidebar-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Configurações
        </h3>
        <div className="space-y-1">
          <NavLink
            href="/profile"
            isActive={currentPath === '/profile'}
            icon="👤"
            label="Perfil"
            onNavigate={onNavigate}
          />
          <NavLink
            href="/settings"
            isActive={currentPath === '/settings'}
            icon="⚙️"
            label="Configurações"
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  icon: string;
  label: string;
  onNavigate?: () => void;
}

function NavLink({ href, isActive, icon, label, onNavigate }: NavLinkProps) {
  return (
    <button
      onClick={() => {
        onNavigate?.();
        window.location.href = href;
      }}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border-0 bg-transparent cursor-pointer',
        isActive
          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',

      )}
    >
      {icon ? <span className="text-lg">{icon}</span> : null}
      <span>{label}</span>

    </button>
  );
}
