/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'outline' | 'interactive';
}

export function Card({
  className,
  variant = 'default',
  children,
  ...props
}: CardProps) {
  const variants = {
    default:
      'bg-white border border-slate-200 shadow-xs dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-slate-100',
    subtle:
      'bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800',
    outline:
      'bg-transparent border border-slate-200 dark:border-slate-800',
    interactive:
      'bg-white border border-slate-200 hover:border-emerald-600/50 hover:shadow-sm transition-all cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:hover:border-emerald-500/50',
  };

  return (
    <div
      className={cn('rounded-xl overflow-hidden', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('p-5 border-b border-slate-100 dark:border-slate-800/80', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs text-slate-500 dark:text-slate-400 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 dark:bg-slate-900/40 dark:border-slate-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
