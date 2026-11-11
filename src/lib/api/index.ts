/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Modul antarmuka API Client untuk LMS Madrasah Aliyah.
 * Catatan Arsitektur: Implementasi koneksi riil, endpoint REST/Firebase client
 * akan dihubungkan pada Fase 2 (Autentikasi & Database) dan Fase 3 (Fitur Modul).
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Placeholder klien API untuk fase berikutnya.
 * Hindari pembuatan data mock palsu di file ini sesuai aturan Fase 1.
 */
export const apiClient = {
  get: async <T>(_endpoint: string): Promise<ApiResponse<T>> => {
    throw new Error('API belum terhubung. Modul backend akan diimplementasikan pada Fase 2/3.');
  },
  post: async <T>(_endpoint: string, _body: unknown): Promise<ApiResponse<T>> => {
    throw new Error('API belum terhubung. Modul backend akan diimplementasikan pada Fase 2/3.');
  },
};
