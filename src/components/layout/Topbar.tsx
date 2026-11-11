/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  Shield,
  UserCheck,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';
import { useToast } from '../ui/Toast';

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const { user, currentRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  // Compute breadcrumbs from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const url = `/${pathParts.slice(0, index + 1).join('/')}`;
    const label = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return { label, url };
  });

  const roleLabels = {
    admin: 'Administrator',
    guru: user?.isWaliKelas ? `Guru / Wali ${user.kelasWali || ''}` : 'Guru Mata Pelajaran',
    siswa: 'Santri / Siswa',
  };

  const roleIcons = {
    admin: Shield,
    guru: UserCheck,
    siswa: User,
  };
  const RoleIcon = roleIcons[currentRole];

  return (
    <header className="h-16 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-20 transition-colors">
      {/* Zone 1: Mobile Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 md:hidden cursor-pointer"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
          <Link
            to={`/${currentRole}`}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            LMS
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.url}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {isLast ? (
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.url}
                    className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Zone 2: Global Search Placeholder */}
      <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            readOnly
            onClick={() => {
              addToast({
                title: 'Pencarian Global',
                description: 'Pencarian terpadu siswa, materi, dan jadwal akan diaktifkan pada Fase 2.',
                type: 'info',
              });
            }}
            placeholder="Cari mapel, tugas, atau santri..."
            className="w-full h-9 pl-9 pr-4 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 placeholder:text-slate-400 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Zone 3: Notification, Theme Toggle, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
          title={isDark ? 'Mode Terang' : 'Mode Gelap'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Icon with Badge */}
        <button
          type="button"
          onClick={() => {
            addToast({
              title: 'Pusat Pemberitahuan',
              description: 'Belum ada notifikasi baru. Pengumuman akademik akan muncul di sini (Fase 2).',
              type: 'info',
            });
          }}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Pemberitahuan"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600" />
        </button>

        {/* Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2.5 pl-2 py-1 pr-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Avatar
                name={user?.nama || 'Pengguna'}
                role={currentRole}
                size="sm"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[120px] truncate leading-tight">
                  {user?.nama}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                  <RoleIcon className="w-2.5 h-2.5 text-emerald-600" />
                  <span>{roleLabels[currentRole]}</span>
                </p>
              </div>
            </div>
          }
          items={[
            {
              id: 'profile-info',
              label: `${user?.nama} (${user?.nomorInduk})`,
              disabled: true,
            },
            {
              id: 'profile-nav',
              label: 'Lihat Profil Lengkap',
              onClick: () => {
                navigate(`/${currentRole}`);
                addToast({
                  title: 'Modul Profil',
                  description: 'Pengaturan profil dan ganti kata sandi wajib akan aktif di Fase 2.',
                  type: 'info',
                });
              },
            },
            {
              id: 'logout-btn',
              label: 'Keluar (Sesi Demo)',
              icon: <LogOut className="w-3.5 h-3.5" />,
              destructive: true,
              dividerBefore: true,
              onClick: () => {
                logout();
                navigate('/login');
              },
            },
          ]}
        />
      </div>
    </header>
  );
}
