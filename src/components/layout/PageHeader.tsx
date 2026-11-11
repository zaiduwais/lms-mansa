/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../../lib/utils';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  kicker?: string;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  actions,
  kicker,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4',
        className
      )}
    >
      <div className="space-y-1">
        {kicker && (
          <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
            {kicker}
          </p>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
}
