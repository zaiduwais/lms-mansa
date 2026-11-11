/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from '../../lib/utils';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  role?: 'admin' | 'guru' | 'siswa';
  className?: string;
}

export function Avatar({
  name,
  src,
  size = 'md',
  role,
  className,
}: AvatarProps) {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  const roleColors = {
    admin: 'bg-slate-700 text-white',
    guru: 'bg-emerald-700 text-white',
    siswa: 'bg-amber-600 text-white',
  };

  const fallbackColor = role ? roleColors[role] : 'bg-emerald-800 text-white';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg font-semibold shrink-0 select-none overflow-hidden shadow-2xs border border-white/20',
        sizes[size],
        fallbackColor,
        className
      )}
      title={name}
      aria-label={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
