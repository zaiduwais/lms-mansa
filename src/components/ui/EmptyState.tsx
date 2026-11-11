/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

export interface EmptyStateProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  faseTarget?: number | string;
  action?: React.ReactNode;
  note?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  faseTarget,
  action,
  note,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4 shadow-2xs">
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
        {faseTarget && (
          <Badge variant="gold" size="sm">
            Fase {faseTarget}
          </Badge>
        )}
      </div>

      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {action && <div className="mb-3">{action}</div>}

      {note && (
        <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-sm mt-2 italic">
          {note}
        </p>
      )}
    </div>
  );
}
