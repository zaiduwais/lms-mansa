/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileDrawer, SiswaBottomNav } from './MobileNav';
import { DevRoleSwitcher } from '../common/DevRoleSwitcher';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export function AppShell() {
  const { currentRole } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Desktop Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Topbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main
          className={cn(
            'flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto',
            // Siswa role has bottom navigation on mobile, so give bottom margin
            currentRole === 'siswa' && 'pb-24 md:pb-8'
          )}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation (Only for Siswa role on small screens) */}
      {currentRole === 'siswa' && <SiswaBottomNav />}

      {/* Dev Role Switcher for Phase 1 verification */}
      <DevRoleSwitcher />
    </div>
  );
}
