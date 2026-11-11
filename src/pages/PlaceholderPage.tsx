/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Calendar,
  FileCode,
  Info,
  ExternalLink,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Tooltip } from '../components/ui/Tooltip';

interface PlaceholderModuleConfig {
  title: string;
  kicker: string;
  fase: number;
  description: string;
  notes: string;
  columns?: { key: string; header: string; width?: string }[];
}

const MODULE_REGISTRY: Record<string, PlaceholderModuleConfig> = {
  // Admin Modules
  '/admin/pengguna': {
    title: 'Manajemen Pengguna',
    kicker: 'Tata Usaha & Kesiswaan',
    fase: 2,
    description: 'Pengelolaan data akun Guru (NIP) dan Siswa (NISN), reset kata sandi massal, dan penetapan peran.',
    notes: 'Akan terintegrasi dengan basis data relational/auth di Fase 2.',
    columns: [
      { key: 'nomorInduk', header: 'NISN / NIP' },
      { key: 'nama', header: 'Nama Lengkap' },
      { key: 'peran', header: 'Peran Akun' },
      { key: 'status', header: 'Status Aktivasi' },
    ],
  },
  '/admin/tahun-ajaran': {
    title: 'Tahun Ajaran & Semester',
    kicker: 'Kalender Akademik',
    fase: 2,
    description: 'Konfigurasi tahun ajaran aktif, pergantian semester ganjil/genap, dan arsip data historis madrasah.',
    notes: 'Pergantian tahun ajaran mengontrol akses pengisian nilai dan rombel aktif.',
  },
  '/admin/kelas-rombel': {
    title: 'Kelas & Rombongan Belajar',
    kicker: 'Struktur Belajar',
    fase: 2,
    description: 'Pengaturan rombel untuk tingkat X, XI, dan XII tanpa jurusan dengan penugasan wali kelas.',
    notes: 'Kapasitas madrasah dirancang untuk ±1200 siswa terdistribusi merata.',
  },
  '/admin/mata-pelajaran': {
    title: 'Mata Pelajaran (Mapel)',
    kicker: 'Kurikulum KBC',
    fase: 2,
    description: 'Daftar mapel wajib, muatan madrasah (Al-Qur\'an Hadis, Aqidah Akhlak, Fikih, SKI, Bhs. Arab), dan mapel peminatan mendalam.',
    notes: 'Mendukung tipografi Arab untuk mapel keagamaan.',
  },
  '/admin/plot-jadwal': {
    title: 'Plot Guru & Jadwal Pembelajaran',
    kicker: 'Distribusi Pengajaran',
    fase: 2,
    description: 'Alokasi jam tatap muka untuk ±100 guru dan jadwal per rombel belajar.',
    notes: 'Satu guru dapat mengampu beberapa rombel dan beberapa mata pelajaran serumpun.',
  },
  '/admin/ujian-terpusat': {
    title: 'Ujian Terpusat Madrasah',
    kicker: 'Asesmen Bersama',
    fase: 3,
    description: 'Penyelenggaraan Asesmen Madrasah, Ujian Tengah Semester, dan Ujian Akhir secara terjadwal.',
    notes: 'Mendukung bank soal terstandar dan pengawasan ujian daring.',
  },
  '/admin/absensi': {
    title: 'Rekapitulasi Absensi Madrasah',
    kicker: 'Monitoring Kedisiplinan',
    fase: 3,
    description: 'Dashboard rekapitulasi kehadiran harian guru dan santri terintegrasi secara otomatis.',
    notes: 'Menyajikan analitik ketidakhadiran dengan alasan sakit, izin, atau alfa.',
  },
  '/admin/pengumuman': {
    title: 'Papan Pengumuman Madrasah',
    kicker: 'Komunikasi Internal',
    fase: 2,
    description: 'Penyampaian maklumat kepala madrasah dan waka kurikulum untuk seluruh civitas akademika.',
    notes: 'Muncul di topbar notifikasi dan beranda seluruh peran pengguna.',
  },
  '/admin/laporan': {
    title: 'Laporan Akademik Eksekutif',
    kicker: 'Pelaporan Kemenag',
    fase: 3,
    description: 'Ekspor laporan komprehensif profil madrasah, buku induk kesiswaan, dan ledger nilai.',
    notes: 'Dapat dicetak dalam format PDF dan lembar sebar (spreadsheet).',
  },
  '/admin/pengaturan-madrasah': {
    title: 'Pengaturan Identitas Madrasah',
    kicker: 'Konfigurasi Sistem',
    fase: 2,
    description: 'Penetapan NSM, NPSN, logo resmi, visi misi KBC, dan tema warna institusi.',
    notes: 'Pengaturan token warna primary/aksen dapat disesuaikan di sini pada fase mendatang.',
  },
  '/admin/log-audit': {
    title: 'Log Audit Keamanan',
    kicker: 'Integritas Sistem',
    fase: 3,
    description: 'Catatan rinci seluruh riwayat manipulasi data pengguna, perubahan nilai, dan aktivitas login.',
    notes: 'Memenuhi standar keamanan integritas data instansi pendidikan.',
  },

  // Guru Modules
  '/guru/kelas-saya': {
    title: 'Kelas & Rombel yang Diampu',
    kicker: 'Ruang Kelas Guru',
    fase: 2,
    description: 'Daftar rombongan belajar tempat Anda mengajar beserta direktori siswa di setiap kelas.',
    notes: 'Guru dapat mengakses daftar hadir dan catatan keaktifan siswa per rombel.',
  },
  '/guru/materi': {
    title: 'Manajemen Link Pembelajaran',
    kicker: 'Sumber Belajar KBC',
    fase: 2,
    description: 'Pembagian materi ajar berbasis tautan (Google Drive, YouTube, tautan artikel/jurnal) tanpa upload file lokal.',
    notes: 'Prinsip efisiensi arsitektur: seluruh materi berupa URL terverifikasi.',
  },
  '/guru/tugas': {
    title: 'Penugasan & Asesmen Autentik',
    kicker: 'Evaluasi Pembelajaran',
    fase: 2,
    description: 'Pembuatan tugas terstruktur berbasis tautan pengumpulan portofolio dan proyek kolaboratif.',
    notes: 'Mendukung rubrik penilaian deskriptif khas Kurikulum Berbasis Cinta.',
  },
  '/guru/bank-soal': {
    title: 'Bank Soal Pembelajaran Mendalam',
    kicker: 'Repositori Soal',
    fase: 3,
    description: 'Bank butir instrumen soal pilihan ganda kompleks, esai kontekstual, dan studi kasus madrasah.',
    notes: 'Mendukung penyisipan ayat Al-Qur\'an dan hadis berharakat rapi.',
  },
  '/guru/kuis-ujian': {
    title: 'Kuis & Ujian Mandiri Mapel',
    kicker: 'Evaluasi Mandiri',
    fase: 3,
    description: 'Penjadwalan kuis formatif dan ujian harian untuk rombel yang diampu.',
    notes: 'Fitur penilaian otomatis untuk pilihan ganda dan koreksi esai terpandu.',
  },
  '/guru/absensi': {
    title: 'Presensi Jam Pelajaran',
    kicker: 'Kehadiran KBM',
    fase: 3,
    description: 'Pencatatan presensi siswa per tatap muka sesuai jadwal mengajar.',
    notes: 'Tersinkronisasi langsung ke wali kelas dan rekap absensi admin.',
  },
  '/guru/buku-nilai': {
    title: 'Buku Nilai & Rekap Capaian',
    kicker: 'Asesmen Formatif & Sumatif',
    fase: 3,
    description: 'Ledger nilai komprehensif penguasaan materi esensial santri.',
    notes: 'Menghasilkan capaian kualitatif yang otomatis mengalir ke rapor madrasah.',
  },
  '/guru/perangkat-ajar': {
    title: 'Perangkat Ajar & Modul KBC',
    kicker: 'Administrasi Pendidik',
    fase: 3,
    description: 'Arsip link Alur Tujuan Pembelajaran (ATP), Modul Ajar Mendalam, dan instrumen refleksi cinta.',
    notes: 'Dapat dibagikan antar sesama guru serumpun mata pelajaran.',
  },
  '/guru/forum': {
    title: 'Forum Diskusi Madani',
    kicker: 'Interaksi Kolaboratif',
    fase: 3,
    description: 'Ruang dialog interaktif bernuansa santun antara guru dan santri seputar topik pembelajaran.',
    notes: 'Mendorong adab berpendapat dan saling menghargai (Tasamuh & Tawadhu).',
  },
  '/guru/pesan': {
    title: 'Pesan Konsultasi Akademik',
    kicker: 'Layanan Pembinaan',
    fase: 3,
    description: 'Saluran komunikasi terarah untuk bimbingan belajar santri dan koordinasi sesama pendidik.',
    notes: 'Khusus keperluan akademik dan pembinaan akhlak santri.',
  },
  '/guru/laporan': {
    title: 'Laporan Capaian Mengajar',
    kicker: 'Refleksi Kinerja',
    fase: 3,
    description: 'Rekapitulasi jam tatap muka, sebaran ketuntasan belajar, dan riwayat bimbingan.',
    notes: 'Dapat diunduh sebagai berkas bukti kinerja berkala.',
  },

  // Guru Wali Kelas Modules
  '/guru/wali-kelas/catatan': {
    title: 'Catatan Karakter Santri',
    kicker: 'Tanggung Jawab Wali Kelas',
    fase: 3,
    description: 'Pencatatan perkembangan akhlak, kepedulian sosial (Mahabbah), dan adab keseharian santri di madrasah.',
    notes: 'Hanya dapat diakses oleh guru yang memegang amanah wali kelas pada rombel bersangkutan.',
  },
  '/guru/wali-kelas/kehadiran': {
    title: 'Rekap Kehadiran Rombongan Belajar',
    kicker: 'Tanggung Jawab Wali Kelas',
    fase: 3,
    description: 'Pemantauan rekap absensi kumulatif seluruh siswa di kelas perwalian Anda.',
    notes: 'Wali kelas dapat memvalidasi surat keterangan sakit atau izin dari orang tua/asrama.',
  },
  '/guru/wali-kelas/rapor': {
    title: 'Rapor Capaian KBC & Rombel',
    kicker: 'Tanggung Jawab Wali Kelas',
    fase: 3,
    description: 'Penyusunan narasi rapor pembiasaan karakter cinta dan ketuntasan materi seluruh mapel.',
    notes: 'Mencetak rapor Aliyah resmi kurikulum terpadu.',
  },

  // Siswa Modules
  '/siswa/mapel-saya': {
    title: 'Mata Pelajaran Saya',
    kicker: 'Kurikulum Santri',
    fase: 2,
    description: 'Daftar seluruh mapel yang dipelajari pada semester ini beserta nama ustadz/ustadzah pengampu.',
    notes: 'Setiap mata pelajaran terhubung ke link sumber belajar dan tugas terkait.',
  },
  '/siswa/materi': {
    title: 'Tautan Materi Pembelajaran',
    kicker: 'Bahan Belajar',
    fase: 2,
    description: 'Kumpulan tautan bacaan, video inspiratif, dan bahan kajian yang dibagikan guru.',
    notes: 'Materi berupa link eksternal yang dapat diakses kapan saja dari perangkat mana pun.',
  },
  '/siswa/tugas': {
    title: 'Daftar Tugas & Proyek',
    kicker: 'Penugasan Siswa',
    fase: 2,
    description: 'Penugasan aktif, tenggat waktu pengumpulan link tugas, dan catatan balik dari pendidik.',
    notes: 'Santri mengumpulkan tugas dalam bentuk tautan dokumen Google Docs / Canva / Drive.',
  },
  '/siswa/ujian': {
    title: 'Jadwal & Ruang Ujian',
    kicker: 'Asesmen Santri',
    fase: 3,
    description: 'Daftar kuis formatif, asesmen tengah semester, dan ujian madrasah.',
    notes: 'Dilengkapi pengingat waktu dan panduan tata tertib ujian jujur.',
  },
  '/siswa/nilai': {
    title: 'Buku Nilai & Portofolio',
    kicker: 'Rekam Prestasi',
    fase: 3,
    description: 'Nilai perolehan tugas, catatan umpan balik kualitatif guru, dan perkembangan kompetensi.',
    notes: 'Fokus pada peningkatan pemahaman mendalam, bukan sekadar angka kumulatif.',
  },
  '/siswa/kehadiran': {
    title: 'Rekam Kehadiran Santri',
    kicker: 'Kedisiplinan Belajar',
    fase: 3,
    description: 'Rekap kehadiran harian pada setiap mata pelajaran dan kegiatan wajib madrasah.',
    notes: 'Memastikan santri menjaga komitmen hadir menuntut ilmu.',
  },
  '/siswa/forum': {
    title: 'Forum Diskusi Kelas',
    kicker: 'Ruang Tanya Jawab',
    fase: 3,
    description: 'Tempat bertukar pikiran dan mendiskusikan materi pelajaran dengan teman sekelas dan guru.',
    notes: 'Menjaga adab santun dalam bertanya dan menanggapi pandangan kawan.',
  },
  '/siswa/pesan': {
    title: 'Pesan ke Guru Pengampu',
    kicker: 'Konsultasi Belajar',
    fase: 3,
    description: 'Kirim pertanyaan pribadi seputar kesulitan belajar kepada ustadz/ustadzah pengampu.',
    notes: 'Layanan konsultasi belajar yang ramah dan aman.',
  },
  '/siswa/profil': {
    title: 'Profil Santri Madrasah',
    kicker: 'Data Kesiswaan',
    fase: 2,
    description: 'Data NISN resmi, riwayat rombongan belajar, dan pengaturan kata sandi akun.',
    notes: 'Wajib mengganti kata sandi bawaan pada saat aktivasi pertama.',
  },
};

export function PlaceholderPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Temukan konfigurasi modul atau gunakan fallback
  const config = MODULE_REGISTRY[currentPath] || {
    title: currentPath.split('/').pop()?.replace(/-/g, ' ').toUpperCase() || 'Modul Madrasah',
    kicker: 'Modul Sistem Terintegrasi',
    fase: 2,
    description: 'Halaman fitur ini sedang dipersiapkan dan akan diimplementasikan pada fase berikutnya.',
    notes: 'Seluruh struktur skema dan komponen antarmuka telah diselaraskan dengan arsitektur LMS.',
  };

  const defaultColumns = config.columns || [
    { key: 'nomor', header: 'No.', width: '60px' },
    { key: 'judul', header: 'Komponen / Indikator' },
    { key: 'status', header: 'Status Rilis' },
    { key: 'keterangan', header: 'Keterangan Arsitektur' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        kicker={config.kicker}
        title={config.title}
        subtitle={config.description}
        badge={
          <Badge variant="gold" size="md">
            <Sparkles className="w-3 h-3" />
            Direncanakan: Fase {config.fase}
          </Badge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Tooltip content={`Tersedia di Fase ${config.fase}`}>
              <Button variant="outline" size="sm" disabled>
                Ekspor Lembar
              </Button>
            </Tooltip>
            <Tooltip content={`Tersedia di Fase ${config.fase}`}>
              <Button variant="primary" size="sm" disabled>
                Tambah Entri
              </Button>
            </Tooltip>
          </div>
        }
      />

      {/* Info Card Rencana Arsitektur Modul */}
      <Card variant="subtle" className="border-emerald-200/60 dark:border-emerald-900/60">
        <CardContent className="flex flex-col sm:flex-row items-start gap-4 p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Rencana Implementasi Fase {config.fase}</span>
              <span className="text-[10px] text-slate-500 font-normal">({currentPath})</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {config.notes}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Komponen DataTable Generik dalam status Empty State yang jujur & ramah */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Pratinjau Tabel Data ({config.title})
            </h3>
            <p className="text-xs text-slate-500">
              Struktur tabel telah disiapkan dengan fitur pencarian, pengurutan kolom, dan pagination.
            </p>
          </div>
        </div>

        <DataTable
          columns={defaultColumns}
          data={[]}
          keyExtractor={(item) => String((item as Record<string, unknown>).id || Math.random())}
          emptyTitle={`Belum Ada Data ${config.title}`}
          emptyDescription={`Data pada modul ${config.title} akan terisi otomatis setelah integrasi database dan autentikasi aktif pada Fase ${config.fase}.`}
          emptyFaseTarget={config.fase}
          searchPlaceholder={`Cari data ${config.title.toLowerCase()}...`}
          headerAction={
            <Tooltip content={`Fitur aksi tersedia di Fase ${config.fase}`}>
              <Button variant="outline" size="sm" disabled>
                Aksi Kolektif
              </Button>
            </Tooltip>
          }
        />
      </div>
    </div>
  );
}
