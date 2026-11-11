/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export function NotFoundPage() {
  const { currentRole, isAuthenticated } = useAuth();
  const homePath = isAuthenticated ? `/${currentRole}` : '/login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mx-auto mb-5">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Galat 404 · Halaman Tidak Ditemukan
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1 mb-2">
          Tersesat di Ruang Belajar?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          Alamat tautan yang Anda cari tidak tersedia atau telah dipindahkan ke rute lain.
        </p>

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
          <Link to={homePath} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full"
            >
              Ke Beranda Utama
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
