/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MADRASAH_CONFIG = {
  nama: 'Madrasah Aliyah Negeri Insan Berilmu',
  singkatan: 'MAN In-Ilmu',
  semboyan: 'Kurikulum Berbasis Cinta (KBC) & Pembelajaran Mendalam',
  nsm: '131132710001',
  npsn: '20278190',
  tahunAjaranAktif: '2026/2027',
  semesterAktif: 'Ganjil' as const,
  kontakAdmin: 'admin@madrasah.sch.id / 0812-3456-7890',
  lokasi: 'Nusantara, Indonesia',
  kapasitas: {
    siswa: 1200,
    guru: 100,
  },
  tingkatKelas: ['X', 'XI', 'XII'],
  prinsipKBC: [
    'Mahabbah (Cinta kepada Allah, Rasul, & Ilmu)',
    'Ta\'aruf & Tadabbur (Pembelajaran Mendalam Berorientasi Makna)',
    'Tasamuh & Tawadhu (Karakter Santri Rendah Hati & Toleran)',
    'Itqan (Kualitas Kerja & Pembelajaran Sempurna)',
  ],
};
