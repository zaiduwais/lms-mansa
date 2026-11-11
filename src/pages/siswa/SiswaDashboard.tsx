/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BookOpen,
  CheckSquare,
  Award,
  Calendar,
  Sparkles,
  Link as LinkIcon,
  Flame,
  Clock,
  Heart,
  BarChart2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Tooltip } from '../../components/ui/Tooltip';
import { Badge } from '../../components/ui/Badge';

export function SiswaDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Portal Santri"
        title={`Assalamu'alaikum, ${user?.nama?.split(' ')[0] || 'Santri'}`}
        subtitle="Semangat menuntut ilmu dengan cinta, niat ikhlas, dan pemahaman yang mendalam."
        badge={<Badge variant="gold">Kelas XI Rombel B</Badge>}
        actions={
          <div className="flex items-center gap-2">
            <Tooltip content="Jadwal lengkap aktif di Fase 2">
              <Button
                variant="outline"
                size="sm"
                disabled
                leftIcon={<Calendar className="w-3.5 h-3.5" />}
              >
                Jadwal Pelajaran
              </Button>
            </Tooltip>
          </div>
        }
      />

      {/* Motivational Banner KBC */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
            <Heart className="w-3.5 h-3.5 fill-amber-300" />
            <span>Tadabbur Belajar Hari Ini</span>
          </div>
          <p className="arabic-text text-amber-100 text-base">
            طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
          </p>
          <p className="text-xs text-slate-200">
            &quot;Menuntut ilmu itu wajib bagi setiap muslim.&quot; (HR. Ibnu Majah)
          </p>
        </div>
        <div className="text-left md:text-right shrink-0">
          <span className="text-[11px] text-emerald-200 block">Status Akademik</span>
          <span className="text-xs font-semibold text-white bg-white/10 px-2.5 py-1 rounded-md inline-block mt-0.5">
            Santri Aktif TA 2026/2027
          </span>
        </div>
      </div>

      {/* 4 KPI Cards Siswa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tugas Aktif</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                0
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Tidak ada tugas tertunda</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Bebas Tugas</span>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Materi Pembelajaran</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                0
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Tautan materi dari guru</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">Fase 2</span>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Jadwal Hari Ini</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                0
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Plotting jadwal KBC</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">Fase 2</span>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rapor Capaian KBC</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                Semester 1
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Deskriptif & Kualitatif</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">Fase 3</span>
          </div>
        </Card>
      </div>

      {/* Grid: Tugas Berjalan + Grafik Perkembangan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tugas & Proyek Belajar</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Daftar asesmen yang perlu kamu selesaikan
                </p>
              </div>
              <Tooltip content="Tersedia di Fase 2">
                <Button variant="ghost" size="sm" disabled leftIcon={<CheckSquare className="w-3.5 h-3.5" />}>
                  Lihat Semua Tugas
                </Button>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={CheckSquare}
                title="Belum Ada Tugas Aktif"
                description="Tugas, proyek kolaborasi, dan telaah materi dari ustadz/ustadzah akan muncul di sini lengkap dengan tenggat pengumpulan."
                faseTarget={2}
                note="Pada sistem KBC, penilaian berfokus pada proses belajar mendalam dan pembiasaan adab menuntut ilmu."
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card variant="default" className="h-full flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Grafik Perkembangan</span>
              </div>
              <CardTitle className="mt-1">Kehadiran & Mutu Belajar</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={BarChart2}
                title="Grafik Belum Tersedia"
                description="Statistik kehadiran dan rekaman ketuntasan belajarmu akan dirangkum dalam grafik interaktif pada Fase 3."
                faseTarget={3}
              />
            </CardContent>
            <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              * Hubungi wali kelas jika terdapat kekeliruan data kehadiran.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
