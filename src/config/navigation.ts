/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  School,
  BookOpen,
  CalendarClock,
  FileCheck2,
  ClipboardList,
  Megaphone,
  BarChart3,
  Settings,
  ShieldCheck,
  FolderKanban,
  FileText,
  CheckSquare,
  Database,
  GraduationCap,
  Sparkles,
  MessagesSquare,
  Mail,
  UserCheck,
  User,
  Award,
  Layers,
} from 'lucide-react';
import { NavItem, Role } from '../types';

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'admin-dashboard',
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    kategori: 'utama',
  },
  {
    id: 'admin-pengguna',
    title: 'Pengguna',
    href: '/admin/pengguna',
    icon: Users,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'admin-tahun-ajaran',
    title: 'Tahun Ajaran',
    href: '/admin/tahun-ajaran',
    icon: CalendarDays,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'admin-kelas-rombel',
    title: 'Kelas & Rombel',
    href: '/admin/kelas-rombel',
    icon: School,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'admin-mapel',
    title: 'Mata Pelajaran',
    href: '/admin/mata-pelajaran',
    icon: BookOpen,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'admin-plot-jadwal',
    title: 'Plot Guru & Jadwal',
    href: '/admin/plot-jadwal',
    icon: CalendarClock,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'admin-ujian-terpusat',
    title: 'Ujian Terpusat',
    href: '/admin/ujian-terpusat',
    icon: FileCheck2,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'admin-absensi',
    title: 'Absensi',
    href: '/admin/absensi',
    icon: ClipboardList,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'admin-pengumuman',
    title: 'Pengumuman',
    href: '/admin/pengumuman',
    icon: Megaphone,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'admin-laporan',
    title: 'Laporan',
    href: '/admin/laporan',
    icon: BarChart3,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'admin-pengaturan',
    title: 'Pengaturan Madrasah',
    href: '/admin/pengaturan-madrasah',
    icon: Settings,
    faseRilis: 2,
    kategori: 'pengaturan',
  },
  {
    id: 'admin-log-audit',
    title: 'Log Audit',
    href: '/admin/log-audit',
    icon: ShieldCheck,
    faseRilis: 3,
    kategori: 'pengaturan',
  },
];

export const GURU_NAV_ITEMS: NavItem[] = [
  {
    id: 'guru-dashboard',
    title: 'Dashboard',
    href: '/guru',
    icon: LayoutDashboard,
    kategori: 'utama',
  },
  {
    id: 'guru-kelas-saya',
    title: 'Kelas Saya',
    href: '/guru/kelas-saya',
    icon: FolderKanban,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'guru-materi',
    title: 'Materi',
    href: '/guru/materi',
    icon: BookOpen,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'guru-tugas',
    title: 'Tugas',
    href: '/guru/tugas',
    icon: CheckSquare,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'guru-bank-soal',
    title: 'Bank Soal',
    href: '/guru/bank-soal',
    icon: Database,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-kuis-ujian',
    title: 'Kuis & Ujian',
    href: '/guru/kuis-ujian',
    icon: FileCheck2,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-absensi',
    title: 'Absensi',
    href: '/guru/absensi',
    icon: ClipboardList,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-buku-nilai',
    title: 'Buku Nilai',
    href: '/guru/buku-nilai',
    icon: GraduationCap,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-perangkat-ajar',
    title: 'Perangkat Ajar',
    href: '/guru/perangkat-ajar',
    icon: Sparkles,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-forum',
    title: 'Forum',
    href: '/guru/forum',
    icon: MessagesSquare,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-pesan',
    title: 'Pesan',
    href: '/guru/pesan',
    icon: Mail,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'guru-laporan',
    title: 'Laporan',
    href: '/guru/laporan',
    icon: BarChart3,
    faseRilis: 3,
    kategori: 'akademik',
  },
];

export const GURU_WALI_KELAS_NAV_ITEMS: NavItem[] = [
  {
    id: 'guru-wali-catatan',
    title: 'Catatan Karakter Santri',
    href: '/guru/wali-kelas/catatan',
    icon: UserCheck,
    faseRilis: 3,
    kategori: 'wali_kelas',
  },
  {
    id: 'guru-wali-kehadiran',
    title: 'Rekap Kehadiran Rombel',
    href: '/guru/wali-kelas/kehadiran',
    icon: ClipboardList,
    faseRilis: 3,
    kategori: 'wali_kelas',
  },
  {
    id: 'guru-wali-rapor',
    title: 'Rapor Capaian KBC',
    href: '/guru/wali-kelas/rapor',
    icon: Award,
    faseRilis: 3,
    kategori: 'wali_kelas',
  },
];

export const SISWA_NAV_ITEMS: NavItem[] = [
  {
    id: 'siswa-dashboard',
    title: 'Dashboard',
    href: '/siswa',
    icon: LayoutDashboard,
    kategori: 'utama',
  },
  {
    id: 'siswa-mapel-saya',
    title: 'Mapel Saya',
    href: '/siswa/mapel-saya',
    icon: Layers,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'siswa-materi',
    title: 'Materi',
    href: '/siswa/materi',
    icon: BookOpen,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'siswa-tugas',
    title: 'Tugas',
    href: '/siswa/tugas',
    icon: CheckSquare,
    faseRilis: 2,
    kategori: 'akademik',
  },
  {
    id: 'siswa-ujian',
    title: 'Ujian',
    href: '/siswa/ujian',
    icon: FileCheck2,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'siswa-nilai',
    title: 'Nilai',
    href: '/siswa/nilai',
    icon: Award,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'siswa-kehadiran',
    title: 'Kehadiran',
    href: '/siswa/kehadiran',
    icon: ClipboardList,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'siswa-forum',
    title: 'Forum',
    href: '/siswa/forum',
    icon: MessagesSquare,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'siswa-pesan',
    title: 'Pesan',
    href: '/siswa/pesan',
    icon: Mail,
    faseRilis: 3,
    kategori: 'akademik',
  },
  {
    id: 'siswa-profil',
    title: 'Profil',
    href: '/siswa/profil',
    icon: User,
    faseRilis: 2,
    kategori: 'pengaturan',
  },
];

export function getNavItemsForRole(role: Role, isWaliKelas = false): { main: NavItem[]; waliKelas?: NavItem[] } {
  switch (role) {
    case 'admin':
      return { main: ADMIN_NAV_ITEMS };
    case 'guru':
      return {
        main: GURU_NAV_ITEMS,
        waliKelas: isWaliKelas ? GURU_WALI_KELAS_NAV_ITEMS : undefined,
      };
    case 'siswa':
      return { main: SISWA_NAV_ITEMS };
    default:
      return { main: [] };
  }
}
