/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookMarked,
  Eye,
  EyeOff,
  LogIn,
  HeartHandshake,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Code2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MADRASAH_CONFIG } from '../../config/appConfig';
import { Button, Input, Modal } from '../../components/ui';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [nomorInduk, setNomorInduk] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ nomorInduk?: string; kataSandi?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [authRoleChoice, setAuthRoleChoice] = useState<'admin' | 'guru' | 'siswa'>('admin');

  const validate = () => {
    const newErrors: { nomorInduk?: string; kataSandi?: string } = {};

    if (!nomorInduk.trim()) {
      newErrors.nomorInduk = 'NISN / NIP wajib diisi.';
    } else if (nomorInduk.trim().length < 5) {
      newErrors.nomorInduk = 'Format nomor identitas minimal 5 digit.';
    }

    if (!kataSandi) {
      newErrors.kataSandi = 'Kata sandi wajib diisi.';
    } else if (kataSandi.length < 6) {
      newErrors.kataSandi = 'Kata sandi minimal 6 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulasi delay login
    setTimeout(async () => {
      const res = await login(nomorInduk, kataSandi, authRoleChoice);
      setIsSubmitting(false);
      if (res.success) {
        navigate(`/${authRoleChoice}`);
      }
    }, 400);
  };

  // Quick fill helper for tester
  const handleQuickFill = (role: 'admin' | 'guru' | 'siswa') => {
    setAuthRoleChoice(role);
    if (role === 'admin') {
      setNomorInduk('198005122005011002');
      setKataSandi('admin123');
    } else if (role === 'guru') {
      setNomorInduk('198402152008011005');
      setKataSandi('guru123');
    } else {
      setNomorInduk('0078129034');
      setKataSandi('siswa123');
    }
    setErrors({});
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950">
      {/* Kolom Kiri: Panel Identitas Madrasah (KBC) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle geometric pattern backdrop */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Header Madrasah */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase text-emerald-300">
                LMS Madrasah Aliyah
              </h2>
              <p className="text-xs text-slate-300">{MADRASAH_CONFIG.nama}</p>
            </div>
          </div>
        </div>

        {/* Nilai Inti & Slogan KBC */}
        <div className="relative z-10 my-10 sm:my-16 space-y-6 max-w-lg">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Kurikulum Berbasis Cinta (KBC)
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Mendidik dengan Hati, Menumbuhkan Pembelajaran Mendalam.
            </h1>
          </div>

          {/* Ayat Al-Qur'an dengan Noto Naskh Arabic */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs">
            <p className="arabic-text text-amber-200/90 mb-2">
              يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ
            </p>
            <p className="text-[11px] text-slate-300 italic">
              &quot;...niscaya Allah akan meninggikan orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu pengetahuan beberapa derajat.&quot; (QS. Al-Mujadilah: 11)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {MADRASAH_CONFIG.prinsipKBC.map((prinsip, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{prinsip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/10 pt-4">
          <span>NSM: {MADRASAH_CONFIG.nsm} · NPSN: {MADRASAH_CONFIG.npsn}</span>
          <span>T.A. {MADRASAH_CONFIG.tahunAjaranAktif}</span>
        </div>
      </div>

      {/* Kolom Kanan: Form Login */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Logo Madrasah Placeholder */}
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-3">
              <BookMarked className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Masuk ke Portal LMS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gunakan NISN (Siswa) atau NIP (Guru/Admin) yang telah terdaftar di madrasah.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="NISN / NIP"
              placeholder="Contoh: 0078129034 (Siswa) atau 1984... (Guru)"
              value={nomorInduk}
              onChange={(e) => setNomorInduk(e.target.value)}
              error={errors.nomorInduk}
              required
              autoComplete="username"
            />

            <div>
              <Input
                label="Kata Sandi"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi akun Anda"
                value={kataSandi}
                onChange={(e) => setKataSandi(e.target.value)}
                error={errors.kataSandi}
                required
                autoComplete="current-password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={() => setIsHelpModalOpen(true)}
                  className="text-xs font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 cursor-pointer"
                >
                  Lupa sandi? Hubungi admin
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              Masuk ke Aplikasi
            </Button>
          </form>

          {/* Catatan Developer Fase 1 Sesuai Spesifikasi */}
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-xs">
              <Code2 className="w-4 h-4 text-amber-600" />
              <span>Catatan Pengembang (Fase 1: UI & Design System):</span>
            </div>
            <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
              Autentikasi riil dan database belum aktif pada Fase 1. Anda dapat mengklik tombol simulasi cepat di bawah untuk langsung mencoba navigasi:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="px-2 py-1 text-[11px] font-medium rounded bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 hover:bg-amber-100 cursor-pointer"
              >
                Isi Demo Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('guru')}
                className="px-2 py-1 text-[11px] font-medium rounded bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 hover:bg-amber-100 cursor-pointer"
              >
                Isi Demo Guru
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('siswa')}
                className="px-2 py-1 text-[11px] font-medium rounded bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 hover:bg-amber-100 cursor-pointer"
              >
                Isi Demo Siswa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lupa Sandi */}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="Bantuan Masuk & Lupa Sandi"
        description="Layanan terpusat administrasi akun madrasah"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setIsHelpModalOpen(false)}>
            Tutup
          </Button>
        }
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Prosedur Reset Kata Sandi Santri & Guru
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Demi keamanan data akademik madrasah, reset kata sandi dilakukan secara terverifikasi melalui Operator Madrasah / Bagian Tata Usaha.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-800 dark:text-slate-200">Kontak Resmi Admin:</p>
            <p className="text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              {MADRASAH_CONFIG.kontakAdmin}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Sertakan NISN/NIP, nama lengkap, dan rombel belajar saat menghubungi admin.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
