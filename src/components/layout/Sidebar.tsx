/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavLink } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookMarked,
  HeartHandshake,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getNavItemsForRole } from '../../config/navigation';
import { MADRASAH_CONFIG } from '../../config/appConfig';
import { cn } from '../../lib/utils';
import { Tooltip } from '../ui/Tooltip';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed, onToggleCollapse, className }: SidebarProps) {
  const { currentRole, user } = useAuth();
  const { main: navItems, waliKelas: waliNavItems } = getNavItemsForRole(
    currentRole,
    user?.isWaliKelas
  );

  return (
    <aside
      className={cn(
        'relative hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out select-none z-30 shrink-0 h-screen sticky top-0',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0 border border-emerald-600/30">
              <BookMarked className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {MADRASAH_CONFIG.singkatan}
              </span>
              <span className="block text-[10px] font-medium text-emerald-700 dark:text-emerald-400 truncate flex items-center gap-1">
                <HeartHandshake className="w-3 h-3 text-amber-600 shrink-0" />
                Kurikulum Cinta
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center font-bold shadow-xs border border-emerald-600/30"
              title={MADRASAH_CONFIG.nama}
            >
              <BookMarked className="w-5 h-5 text-emerald-100" />
            </div>
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            'p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer',
            isCollapsed && 'mx-auto mt-2 hidden'
          )}
          aria-label={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Menu Utama
            </p>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.href}
                  end={item.href === '/admin' || item.href === '/guru' || item.href === '/siswa'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative',
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-semibold dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60',
                      isCollapsed && 'justify-center px-0'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                        )}
                      />

                      {!isCollapsed && <span className="truncate flex-1">{item.title}</span>}

                      {!isCollapsed && item.faseRilis && (
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-500 tabular-nums">
                          F{item.faseRilis}
                        </span>
                      )}

                      {/* Tooltip on collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 hidden group-hover:flex items-center z-50">
                          <div className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded-md whitespace-nowrap shadow-lg">
                            {item.title}
                            {item.faseRilis && (
                              <span className="ml-1 text-[10px] text-amber-300">
                                (Fase {item.faseRilis})
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Wali Kelas Group (Khusus Guru yang merangkap Wali Kelas) */}
        {waliNavItems && waliNavItems.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {!isCollapsed && (
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Wali Kelas ({user?.kelasWali || 'Aktif'})
                </span>
              </div>
            )}
            <nav className="space-y-1">
              {waliNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative',
                        isActive
                          ? 'bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-300'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60',
                        isCollapsed && 'justify-center px-0'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={cn(
                            'w-4 h-4 shrink-0 transition-colors',
                            isActive
                              ? 'text-amber-700 dark:text-amber-400'
                              : 'text-amber-600/70 group-hover:text-amber-700'
                          )}
                        />
                        {!isCollapsed && <span className="truncate flex-1">{item.title}</span>}
                        {!isCollapsed && item.faseRilis && (
                          <span className="text-[10px] font-mono text-amber-600/80 tabular-nums">
                            F{item.faseRilis}
                          </span>
                        )}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 hidden group-hover:flex items-center z-50">
                            <div className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded-md whitespace-nowrap shadow-lg">
                              {item.title} (Wali Kelas)
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Footer / Academic Year Banner */}
      {!isCollapsed ? (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="rounded-lg p-2.5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-xs">
            <p className="font-semibold text-emerald-900 dark:text-emerald-300">
              T.A. {MADRASAH_CONFIG.tahunAjaranAktif}
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
              Semester {MADRASAH_CONFIG.semesterAktif} · Aktif
            </p>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <Tooltip content={`T.A. ${MADRASAH_CONFIG.tahunAjaranAktif} (${MADRASAH_CONFIG.semesterAktif})`} position="right">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 font-bold text-xs">
              TA
            </div>
          </Tooltip>
        </div>
      )}
    </aside>
  );
}
