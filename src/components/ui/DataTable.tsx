/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { TableColumn } from '../../types';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { TableSkeletonRows } from './Skeleton';
import { EmptyState } from './EmptyState';

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  itemsPerPage?: number;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyFaseTarget?: number;
  headerAction?: React.ReactNode;
  rowActions?: (item: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  searchable = true,
  searchPlaceholder = 'Cari data...',
  searchFields,
  itemsPerPage = 10,
  isLoading = false,
  error = null,
  onRetry,
  emptyTitle = 'Belum Ada Data',
  emptyDescription = 'Data pada modul ini akan tersinkronisasi setelah modul Fase 2/3 aktif.',
  emptyFaseTarget,
  headerAction,
  rowActions,
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting Handler
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Filter Data
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      if (searchFields && searchFields.length > 0) {
        return searchFields.some((field) => {
          const val = item[field];
          return val ? String(val).toLowerCase().includes(term) : false;
        });
      }
      return Object.values(item as Record<string, unknown>).some((val) =>
        val ? String(val).toLowerCase().includes(term) : false
      );
    });
  }, [data, searchTerm, searchFields]);

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];

      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      const comp = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs',
        className
      )}
    >
      {/* Header Toolbar */}
      {(searchable || headerAction) && (
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {searchable ? (
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full h-9 pl-9 pr-3 text-xs bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              />
            </div>
          ) : (
            <div />
          )}

          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-8 text-center flex flex-col items-center">
          <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Terjadi Kendala Memuat Data</p>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">{error}</p>
          {onRetry && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRetry}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Coba Lagi
            </Button>
          )}
        </div>
      )}

      {/* Loading Skeleton State */}
      {isLoading && !error && (
        <TableSkeletonRows rows={5} cols={columns.length + (rowActions ? 1 : 0)} />
      )}

      {/* Empty State */}
      {!isLoading && !error && sortedData.length === 0 && (
        <div className="p-6">
          <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            faseTarget={emptyFaseTarget}
          />
        </div>
      )}

      {/* Data Table */}
      {!isLoading && !error && sortedData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold sticky top-0">
              <tr>
                {columns.map((col) => {
                  const isSorted = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      style={{ width: col.width }}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={cn(
                        'px-4 py-3 select-none tracking-wide text-xs',
                        col.sortable && 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80',
                        col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                      )}
                    >
                      <div
                        className={cn(
                          'inline-flex items-center gap-1.5',
                          col.align === 'right' && 'flex-row-reverse'
                        )}
                      >
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-slate-400">
                            {isSorted ? (
                              sortDirection === 'asc' ? (
                                <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-3.5 h-3.5" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
                {rowActions && (
                  <th className="px-4 py-3 text-right text-xs font-semibold">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedData.map((row, idx) => (
                <tr
                  key={keyExtractor(row)}
                  className={cn(
                    'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors',
                    idx % 2 === 1 && 'bg-slate-50/30 dark:bg-slate-900/30'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'px-4 py-3.5 text-slate-700 dark:text-slate-300 tabular-nums',
                        col.align === 'center'
                          ? 'text-center'
                          : col.align === 'right'
                          ? 'text-right'
                          : 'text-left'
                      )}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '-')}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      {rowActions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {!isLoading && !error && sortedData.length > 0 && (
        <div className="p-3 px-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>
            Menampilkan{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            -{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {Math.min(currentPage * itemsPerPage, sortedData.length)}
            </span>{' '}
            dari{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
              {sortedData.length}
            </span>{' '}
            data
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="h-8 w-8 p-0"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-2 font-medium tabular-nums text-slate-700 dark:text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="h-8 w-8 p-0"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
