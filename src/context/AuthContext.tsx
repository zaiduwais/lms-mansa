/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FASE 1 AUTH CONTEXT & STUB INTERFACE
 * Catatan Arsitektur: Ini adalah mock state/stub arsitektural untuk kebutuhan
 * pengujian layout dan navigasi Fase 1. Pada Fase 2, provider ini akan
 * digantikan dengan autentikasi nyata berbasis NISN/NIP dan session secure token.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, UserProfile } from '../types';
import { MADRASAH_CONFIG } from '../config/appConfig';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  toggleWaliKelas: () => void;
  login: (nomorInduk: string, kataSandi: string, role?: Role) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const DEFAULT_USERS: Record<Role, UserProfile> = {
  admin: {
    id: 'usr-admin-01',
    nama: 'H. Ahmad Fauzi, M.Pd.',
    nomorInduk: '198005122005011002',
    role: ['admin'],
    activeRole: 'admin',
    email: 'ahmad.fauzi@madrasah.sch.id',
    madrasah: {
      nama: MADRASAH_CONFIG.nama,
      nsm: MADRASAH_CONFIG.nsm,
      npsn: MADRASAH_CONFIG.npsn,
      tahunAjaranAktif: MADRASAH_CONFIG.tahunAjaranAktif,
      semesterAktif: MADRASAH_CONFIG.semesterAktif,
    },
  },
  guru: {
    id: 'usr-guru-01',
    nama: 'Ust. Muhammad Zulkifli, M.Ag.',
    nomorInduk: '198402152008011005',
    role: ['guru'],
    activeRole: 'guru',
    isWaliKelas: true,
    kelasWali: 'X Rombel 1',
    mapelPengampu: ['Al-Qur\'an Hadis', 'Fikih'],
    email: 'm.zulkifli@madrasah.sch.id',
    madrasah: {
      nama: MADRASAH_CONFIG.nama,
      nsm: MADRASAH_CONFIG.nsm,
      npsn: MADRASAH_CONFIG.npsn,
      tahunAjaranAktif: MADRASAH_CONFIG.tahunAjaranAktif,
      semesterAktif: MADRASAH_CONFIG.semesterAktif,
    },
  },
  siswa: {
    id: 'usr-siswa-01',
    nama: 'Aisyah Zahra Al-Munawwarah',
    nomorInduk: '0078129034',
    role: ['siswa'],
    activeRole: 'siswa',
    email: 'aisyah.zahra@santri.madrasah.sch.id',
    madrasah: {
      nama: MADRASAH_CONFIG.nama,
      nsm: MADRASAH_CONFIG.nsm,
      npsn: MADRASAH_CONFIG.npsn,
      tahunAjaranAktif: MADRASAH_CONFIG.tahunAjaranAktif,
      semesterAktif: MADRASAH_CONFIG.semesterAktif,
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Simpan state autentikasi di sessionStorage untuk pengujian browser yang nyaman
  const [currentRole, setRoleState] = useState<Role>(() => {
    const saved = sessionStorage.getItem('lms_dev_active_role');
    return (saved as Role) || 'admin';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = sessionStorage.getItem('lms_dev_auth');
    return savedAuth ? JSON.parse(savedAuth) : true; // Default true saat development agar langsung dapat menginspeksi app shell
  });

  const [isWaliKelas, setIsWaliKelas] = useState<boolean>(true);

  const [user, setUser] = useState<UserProfile | null>(() => {
    return DEFAULT_USERS[currentRole];
  });

  useEffect(() => {
    const baseUser = DEFAULT_USERS[currentRole];
    setUser({
      ...baseUser,
      isWaliKelas: currentRole === 'guru' ? isWaliKelas : false,
    });
    sessionStorage.setItem('lms_dev_active_role', currentRole);
  }, [currentRole, isWaliKelas]);

  useEffect(() => {
    sessionStorage.setItem('lms_dev_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const setCurrentRole = (role: Role) => {
    setRoleState(role);
    setUser(DEFAULT_USERS[role]);
  };

  const toggleWaliKelas = () => {
    setIsWaliKelas((prev) => !prev);
  };

  const login = async (
    nomorInduk: string,
    _kataSandi: string,
    role?: Role
  ): Promise<{ success: boolean; message?: string }> => {
    // Validasi format dasar
    if (!nomorInduk || nomorInduk.trim().length < 4) {
      return { success: false, message: 'Nomor NISN/NIP minimal 4 karakter.' };
    }

    // Deteksi otomatis atau gunakan role terpilih
    const targetRole: Role = role || (nomorInduk.length === 10 ? 'siswa' : 'guru');
    setCurrentRole(targetRole);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        currentRole,
        setCurrentRole,
        toggleWaliKelas,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
