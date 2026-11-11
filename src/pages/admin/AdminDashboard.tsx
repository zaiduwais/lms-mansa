/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Users,
  GraduationCap,
  School,
  CalendarCheck,
  ShieldAlert,
  Plus,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Activity,
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Tooltip } from '../../components/ui/Tooltip';
import { MADRASAH_CONFIG } from '../../config/appConfig';

export function AdminDashboard() {
  const statCards = [
    {
      title: 'Kapasitas Siswa',
      value: `±${MADRASAH_CONFIG.kapasitas.siswa}`,
      subtitle: 'Target siswa Kelas X, XI, XII',
      icon: GraduationCap,
      color: 'text-emerald-700 dark:text-emerald-400',
      status: 'Menunggu sinkronisasi Fase 2',
    },
    {
      title: 'Pendidik & Tendik',
      value: `±${MADRASAH_CONFIG.kapasitas.guru}`,
      subtitle: 'Guru mapel & wali kelas',
      icon: Users,
      color: 'text-teal-700 dark:text-teal-400',
      status: 'Menunggu sinkronisasi Fase 2',
    },
    {
      title: 'Struktur Jenjang',
      value: '3 Tingkat',
      subtitle: 'Tanpa jurusan (Pendekatan KBC)',
      icon: School,
      color: 'text-amber-700 dark:text-amber-400',
      status: 'Kelas X, XI, XII Rombel',
    },
    {
      title: 'Tahun Ajaran Aktif',
      value: MADRASAH_CONFIG.tahunAjaranAktif,
      subtitle: `Semester ${MADRASAH_CONFIG.semesterAktif}`,
      icon: CalendarCheck,
      color: 'text-slate-700 dark:text-slate-300',
      status: 'Kalender Akademik',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Portal Administrator"
        title="Dashboard Madrasah"
        subtitle={`Sistem Manajemen Akademik & Operasional ${MADRASAH_CONFIG.nama}`}
        actions={
          <div className="flex items-center gap-2">
            <Tooltip content="Tersedia di Fase 2">
              <Button
                variant="outline"
                size="sm"
                disabled
                leftIcon={<Users className="w-3.5 h-3.5" />}
              >
                Impor Data Pengguna
              </Button>
            </Tooltip>
            <Tooltip content="Tersedia di Fase 2">
              <Button
                variant="primary"
                size="sm"
                disabled
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Buat Rombel Baru
              </Button>
            </Tooltip>
          </div>
        }
      />

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} variant="default" className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                    {stat.value}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{stat.subtitle}</span>
                <span className="shrink-0 text-[10px] text-amber-700 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                  Fase 2
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Grid: Area Grafik + Ringkasan Rombel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Grafik Statistik (Empty State Sesuai Spek) */}
        <div className="lg:col-span-2">
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Distribusi Rombongan Belajar & Siswa</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visualisasi sebaran siswa per tingkat kelas X, XI, dan XII
                </p>
              </div>
              <Tooltip content="Grafik aktif di Fase 3">
                <Button variant="ghost" size="sm" disabled leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                  Recharts Engine
                </Button>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={BarChart3}
                title="Grafik Data Belum Tersedia"
                description="Visualisasi grafik capaian kehadiran terpadu dan pembagian rombel belajar akan ditampilkan secara real-time pada modul analitik Fase 3."
                faseTarget={3}
                action={
                  <Tooltip content="Tersedia di Fase 3">
                    <Button variant="outline" size="sm" disabled>
                      Hubungkan Metrik Analitik
                    </Button>
                  </Tooltip>
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Kurikulum Berbasis Cinta (KBC) Insight Card */}
        <div className="lg:col-span-1">
          <Card variant="default" className="h-full flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Prinsip Pembelajaran KBC</span>
              </div>
              <CardTitle className="mt-1">Pilar Pendidikan Madrasah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
                <p className="font-semibold text-emerald-800 dark:text-emerald-400">1. Mahabbah</p>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Mendasari setiap interaksi guru-santri dengan kasih sayang dan keteladanan.
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
                <p className="font-semibold text-emerald-800 dark:text-emerald-400">2. Pembelajaran Mendalam</p>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Menekankan makna kontekstual tanpa penjurusan kaku pada jenjang Aliyah.
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
                <p className="font-semibold text-emerald-800 dark:text-emerald-400">3. Itqan & Integritas</p>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Kesempurnaan mutu penugasan dan asesmen autentik berkarakter santri.
                </p>
              </div>
            </CardContent>
            <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              * Parameter KBC dapat dikonfigurasi melalui menu Pengaturan Madrasah (Fase 2).
            </div>
          </Card>
        </div>
      </div>

      {/* Log Aktivitas Terakhir (Empty State Sesuai Spek) */}
      <Card variant="default">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Log Audit & Aktivitas Terakhir</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rekam jejak perubahan data pengguna, jadwal, dan nilai madrasah
            </p>
          </div>
          <Tooltip content="Tersedia di Fase 3">
            <Button variant="ghost" size="sm" disabled leftIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
              Buka Semua Log
            </Button>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Activity}
            title="Belum Ada Aktivitas Audit Terekam"
            description="Riwayat audit sistem keamanan, perubahan struktur kelas, dan plot jadwal guru akan dicatat secara otomatis ketika modul Fase 2 & 3 aktif."
            faseTarget={3}
            note="Semua aksi administrator akan terverifikasi dengan stempel waktu dan identitas NIP resmi."
          />
        </CardContent>
      </Card>
    </div>
  );
}
