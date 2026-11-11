/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { ShieldX, Home, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { MADRASAH_CONFIG } from '../config/appConfig';

export function AccessDeniedPage() {
  const { currentRole, user } = useAuth();

  const roleNameMap = {
    admin: 'Administrator',
    guru: 'Pendidik / Guru',
    siswa: 'Santri / Siswa',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 flex items-center justify-center mx-auto mb-5">
          <ShieldX className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Galat 403 · Hak Akses Dibatasi
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1 mb-2">
          Akses Halaman Ditolak
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Akun Anda saat ini aktif sebagai{' '}
          <strong className="text-slate-800 dark:text-slate-200 font-semibold">
            {roleNameMap[currentRole]}
          </strong>
          . Halaman ini memerlukan hak akses peran yang berbeda sesuai kebijakan madrasah.
        </p>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-left text-xs text-slate-600 dark:text-slate-300 mb-6 space-y-1">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Identitas Aktif: {user?.nama}
          </p>
          <p className="text-[11px] text-slate-500">
            Nomor Induk: {user?.nomorInduk} · {MADRASAH_CONFIG.singkatan}
          </p>
          <p className="text-[10px] text-amber-700 dark:text-amber-400 italic pt-1">
            * Pada mode pengembangan (Fase 1), Anda dapat mengganti peran via Dev Role Switcher di pojok kiri bawah.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Kembali
          </Button>
          <Link to={`/${currentRole}`} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full"
            >
              Ke Dashboard Anda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
