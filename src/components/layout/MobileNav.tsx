/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  BookMarked,
  HeartHandshake,
  Sparkles,
  LayoutDashboard,
  Layers,
  CheckSquare,
  Award,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getNavItemsForRole } from '../../config/navigation';
import { MADRASAH_CONFIG } from '../../config/appConfig';
import { cn } from '../../lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileNavProps) {
  const { currentRole, user } = useAuth();
  const location = useLocation();
  const { main: navItems, waliKelas: waliNavItems } = getNavItemsForRole(
    currentRole,
    user?.isWaliKelas
  );

  // Close drawer upon route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center font-bold">
              <BookMarked className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-900 dark:text-slate-100">
                {MADRASAH_CONFIG.singkatan}
              </span>
              <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <HeartHandshake className="w-3 h-3 text-amber-600" />
                Kurikulum Cinta
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Menu Navigasi
            </p>
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
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors min-h-[44px]',
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 font-semibold dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200'
                      )
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                    <span className="flex-1">{item.title}</span>
                    {item.faseRilis && (
                      <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                        F{item.faseRilis}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {waliNavItems && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="px-3 mb-2 text-[10px] font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Wali Kelas ({user?.kelasWali || 'Aktif'})
              </p>
              <nav className="space-y-1">
                {waliNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors min-h-[44px]',
                          isActive
                            ? 'bg-amber-50 text-amber-900 font-semibold dark:bg-amber-950/60 dark:text-amber-300'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/50 dark:text-slate-400'
                        )
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 text-amber-600" />
                      <span className="flex-1">{item.title}</span>
                      {item.faseRilis && (
                        <span className="text-[10px] font-mono text-amber-700 tabular-nums">
                          F{item.faseRilis}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        {/* Academic year footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            {MADRASAH_CONFIG.nama}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            T.A. {MADRASAH_CONFIG.tahunAjaranAktif} · Semester {MADRASAH_CONFIG.semesterAktif}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Bottom navigation bar khusus Siswa di tampilan mobile
 */
export function SiswaBottomNav() {
  const bottomItems = [
    { label: 'Beranda', href: '/siswa', icon: LayoutDashboard },
    { label: 'Mapel', href: '/siswa/mapel-saya', icon: Layers },
    { label: 'Tugas', href: '/siswa/tugas', icon: CheckSquare },
    { label: 'Nilai', href: '/siswa/nilai', icon: Award },
    { label: 'Profil', href: '/siswa/profil', icon: User },
  ];

  return (
    <nav
      aria-label="Navigasi Bawah Siswa"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 flex items-center justify-around z-30 shadow-lg"
    >
      {bottomItems.map(({ label, href, icon: Icon }) => (
        <NavLink
          key={href}
          to={href}
          end={href === '/siswa'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center flex-1 py-1.5 gap-0.5 text-[11px] font-medium transition-colors select-none min-h-[44px]',
              isActive
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                className={cn('w-5 h-5 transition-transform', isActive && 'scale-110')}
              />
              <span className="truncate max-w-[64px]">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
