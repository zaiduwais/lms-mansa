/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ============================================================================
 * PERINGATAN PENTING ARSITEKTUR:
 * Komponen DevRoleSwitcher ini KHUSUS untuk keperluan pengujian dan verifikasi
 * tata letak / navigasi Fase 1 (Design System & App Shell).
 * 
 * KOMPONEN INI WAJIB DIHAPUS PADA FASE 2 ketika sistem autentikasi dan database
 * riil berbasis sesi & JWT/Firebase diterapkan.
 * ============================================================================
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, User, UserCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { cn } from '../../lib/utils';

export function DevRoleSwitcher() {
  const { currentRole, setCurrentRole, user, toggleWaliKelas } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const roles: { role: Role; label: string; icon: React.ComponentType<{ className?: string }>; path: string }[] = [
    { role: 'admin', label: 'Admin', icon: Shield, path: '/admin' },
    { role: 'guru', label: 'Guru', icon: UserCheck, path: '/guru' },
    { role: 'siswa', label: 'Siswa', icon: User, path: '/siswa' },
  ];

  const handleSwitch = (targetRole: Role, path: string) => {
    setCurrentRole(targetRole);
    navigate(path);
  };

  return (
    <div className="fixed bottom-3 left-3 z-50 select-none">
      <div
        className={cn(
          'rounded-xl border border-amber-300 bg-amber-50/95 dark:bg-slate-900/95 dark:border-amber-600/60 shadow-lg text-slate-800 dark:text-slate-200 backdrop-blur-xs transition-all overflow-hidden',
          isExpanded ? 'p-3 w-64' : 'px-3 py-1.5 flex items-center gap-2 cursor-pointer'
        )}
      >
        {/* Header / Minimized Bar */}
        <div
          className="flex items-center justify-between gap-2 cursor-pointer w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              [DEV] Role Switcher
            </span>
          </div>

          <button
            type="button"
            className="text-amber-800 dark:text-amber-300 p-0.5 hover:bg-amber-100 dark:hover:bg-slate-800 rounded"
            aria-label={isExpanded ? 'Tutup dev switcher' : 'Buka dev switcher'}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="mt-2.5 pt-2 border-t border-amber-200/80 dark:border-slate-800 space-y-2 text-xs">
            <p className="text-[10px] text-amber-700 dark:text-amber-400 font-mono leading-tight">
              * Mode Fase 1: Beralih simulasi peran pengguna. (DIHAPUS PADA FASE 2)
            </p>

            <div className="grid grid-cols-3 gap-1">
              {roles.map(({ role, label, icon: Icon, path }) => {
                const isActive = currentRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => handleSwitch(role, path)}
                    className={cn(
                      'flex flex-col items-center gap-1 py-1.5 px-2 rounded-md font-medium transition-colors text-[11px] cursor-pointer',
                      isActive
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white/80 dark:bg-slate-800 hover:bg-amber-100 text-slate-700 dark:text-slate-200'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {currentRole === 'guru' && (
              <div className="pt-2 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Wali Kelas:
                </span>
                <button
                  type="button"
                  onClick={toggleWaliKelas}
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer',
                    user?.isWaliKelas
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  )}
                >
                  {user?.isWaliKelas ? 'Aktif (X-A)' : 'Non-Aktif'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
