/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types';
import { cn } from '../../lib/utils';

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, description, type = 'info', duration = 4000 }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, title, description, type, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => {
          const icons = {
            success: CheckCircle2,
            warning: AlertTriangle,
            danger: AlertCircle,
            info: Info,
          };
          const Icon = icons[toast.type];

          const colorClasses = {
            success: 'border-emerald-200 bg-white text-emerald-900 dark:bg-slate-900 dark:border-emerald-800',
            warning: 'border-amber-200 bg-white text-amber-900 dark:bg-slate-900 dark:border-amber-800',
            danger: 'border-rose-200 bg-white text-rose-900 dark:bg-slate-900 dark:border-rose-800',
            info: 'border-sky-200 bg-white text-sky-900 dark:bg-slate-900 dark:border-sky-800',
          };

          const iconColors = {
            success: 'text-emerald-600',
            warning: 'text-amber-600',
            danger: 'text-rose-600',
            info: 'text-sky-600',
          };

          return (
            <div
              key={toast.id}
              role="alert"
              className={cn(
                'pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-md animate-in slide-in-from-bottom-5 duration-200',
                colorClasses[toast.type]
              )}
            >
              <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', iconColors[toast.type])} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold">{toast.title}</p>
                {toast.description && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                aria-label="Tutup notifikasi"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
