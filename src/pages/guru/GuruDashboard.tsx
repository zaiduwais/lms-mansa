/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BookOpen,
  CheckSquare,
  Users,
  Award,
  Link as LinkIcon,
  Plus,
  BarChart2,
  Calendar,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Tooltip } from '../../components/ui/Tooltip';
import { Badge } from '../../components/ui/Badge';

export function GuruDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        kicker="Ruang Pendidik"
        title={`Ahlan wa Sahlan, ${user?.nama || 'Ustadz / Ustadzah'}`}
        subtitle="Kelola materi link pembelajaran mendalam, asesmen autentik, dan bimbingan karakter santri."
        badge={
          user?.isWaliKelas ? (
            <Badge variant="gold">
              <Sparkles className="w-3 h-3" />
              Wali Kelas {user.kelasWali || 'X-A'}
            </Badge>
          ) : (
            <Badge variant="emerald">Guru Mata Pelajaran</Badge>
          )
        }
        actions={
          <div className="flex items-center gap-2">
            <Tooltip content="Materi link aktif di Fase 2">
              <Button
                variant="outline"
                size="sm"
                disabled
                leftIcon={<LinkIcon className="w-3.5 h-3.5" />}
              >
                Bagikan Link Materi
              </Button>
            </Tooltip>
            <Tooltip content="Tersedia di Fase 2">
              <Button
                variant="primary"
                size="sm"
                disabled
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Buat Tugas Baru
              </Button>
            </Tooltip>
          </div>
        }
      />

      {/* KPI Cards Guru */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mapel Pengampu</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                {user?.mapelPengampu?.join(', ') || 'Al-Qur\'an Hadis'}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Kurikulum KBC</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Aktif</span>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tautan Materi Dibagikan</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                0
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <LinkIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Format: Sumber Tautan Web / Cloud</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">Fase 2</span>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tugas & Evaluasi</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                0
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Asesmen Pembelajaran Mendalam</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">Fase 2</span>
          </div>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status Penugasan</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                {user?.isWaliKelas ? `Wali ${user.kelasWali}` : 'Guru Pengampu'}
              </h3>
            </div>
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>SK Pembagian Tugas TA 2026/2027</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Valid</span>
          </div>
        </Card>
      </div>

      {/* Grid: Jadwal Mengajar & Grafik Capaian */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Capaian Pemahaman Siswa (Pembelajaran Mendalam)</CardTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Grafik penguasaan konsep esensial mapel per rombel belajar
                </p>
              </div>
              <Tooltip content="Grafik aktif di Fase 3">
                <Button variant="ghost" size="sm" disabled leftIcon={<BarChart2 className="w-3.5 h-3.5" />}>
                  Recharts Analitik
                </Button>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={BarChart2}
                title="Belum Ada Rekap Nilai & Capaian"
                description="Grafik ketuntasan kompetensi dan asesmen karakter KBC akan terakumulasi otomatis begitu tugas dan kuis dinilai oleh guru pada Fase 3."
                faseTarget={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Panel Wali Kelas / Bimbingan Santri */}
        <div className="lg:col-span-1">
          <Card variant="default" className="h-full flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Tanggung Jawab Wali Kelas</span>
              </div>
              <CardTitle className="mt-1">
                {user?.isWaliKelas ? `Rombel Binaan: ${user.kelasWali}` : 'Bimbingan Santri'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user?.isWaliKelas ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Sebagai wali kelas, Anda mendampingi pembiasaan karakter santri, memantau kehadiran harian, dan menyusun rapor deskriptif KBC.
                  </p>
                  <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-lg border border-amber-200/80 dark:border-amber-900/60 text-xs space-y-1">
                    <p className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                      <ClipboardList className="w-3.5 h-3.5 text-amber-700" />
                      Fitur Khusus Wali Kelas:
                    </p>
                    <ul className="list-disc list-inside text-[11px] text-amber-800 dark:text-amber-300/80 space-y-0.5">
                      <li>Pencatatan Karakter Santri (Fase 3)</li>
                      <li>Rekap Kehadiran Rombel (Fase 3)</li>
                      <li>Penyusunan Rapor KBC (Fase 3)</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={Users}
                  title="Bukan Wali Kelas"
                  description="Status penugasan Anda saat ini adalah Guru Mata Pelajaran. Jika diberi amanah sebagai Wali Kelas, menu binaan akan otomatis muncul."
                  note="Uji coba toggle Wali Kelas dapat dilakukan melalui Dev Role Switcher di pojok kiri bawah."
                />
              )}
            </CardContent>
            <div className="p-4 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              * Kebijakan KBC: Materi berupa tautan langsung tanpa beban penyimpanan server.
            </div>
          </Card>
        </div>
      </div>

      {/* Antrean Tugas Belum Dinilai (Empty State Sesuai Spek) */}
      <Card variant="default">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Antrean Pengumpulan Tugas & Asesmen</CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daftar penugasan siswa yang siap ditelaah dan diberikan umpan balik
            </p>
          </div>
          <Tooltip content="Tersedia di Fase 2">
            <Button variant="ghost" size="sm" disabled leftIcon={<CheckSquare className="w-3.5 h-3.5" />}>
              Buku Nilai
            </Button>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={CheckSquare}
            title="Belum Ada Tugas Masuk"
            description="Tugas yang dikumpulkan oleh siswa dari kelas binaan Anda akan terdaftar di sini untuk dinilai dan diberikan catatan kualitatif."
            faseTarget={2}
          />
        </CardContent>
      </Card>
    </div>
  );
}
