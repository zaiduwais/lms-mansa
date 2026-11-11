/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from 'lucide-react';

export type Role = 'admin' | 'guru' | 'siswa';

export interface UserProfile {
  id: string;
  nama: string;
  nomorInduk: string; // NISN untuk siswa, NIP untuk guru/admin
  role: Role[];
  activeRole: Role;
  isWaliKelas?: boolean;
  kelasWali?: string; // misal: "X-A", "XI-C"
  mapelPengampu?: string[]; // misal: ["Al-Qur'an Hadis", "Fikih"]
  email?: string;
  avatarUrl?: string;
  madrasah: {
    nama: string;
    nsm: string;
    npsn: string;
    tahunAjaranAktif: string;
    semesterAktif: 'Ganjil' | 'Genap';
  };
}

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  faseRilis?: 2 | 3 | 4;
  kategori?: 'utama' | 'akademik' | 'wali_kelas' | 'pengaturan';
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  duration?: number;
}
