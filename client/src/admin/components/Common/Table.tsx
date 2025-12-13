/**
 * Coopvest Africa Admin Dashboard - Table Component
 * Flexible table component with sorting, filtering, and pagination
 */

import React, { useState, useMemo } from 'react';
import clsx from 'clsx';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  onRowClick?: (row: T, index: number) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  pagination?: {
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  className?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps<any>>(
  (
    {
      columns,
      data,
      keyExtractor,
      onRowClick,
      selectable = false,
      onSelectionChange,
      striped = true,
      hoverable = true,
      compact = false,
      loading = false,
      emptyMessage = 'No data available',
      pagination,
      className,
    },
    ref
  ) => {
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: 'asc' | 'desc';
    } | null>(null);
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

    // Handle sorting
    const handleSort = (key: string) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return {
            key,
            direction: prev.direction === 'asc' ? 'desc' : 'asc',
          };
        }
        return { key, direction: 'asc' };
      });
    };

    // Sort data
    const sortedData = useMemo(() => {
      if (!sortConfig) return data;

      const sorted = [...data].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });

      return sorted;
    }, [data, sortConfig]);

    // Paginate data
    const paginatedData = useMemo(() => {
      if (!pagination) return sortedData;

      const start = (pagination.currentPage - 1) * pagination.pageSize;
      const end = start + pagination.pageSize;
      return sortedData.slice(start, end);
    }, [sortedData, pagination]);

    // Handle row selection
    const handleSelectRow = (key: string | number) => {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(key)) {
        newSelected.delete(key);
      } else {
        newSelected.add(key);
      }
      setSelectedRows(newSelected);

      const selectedRowsData = data.filter((row, index) =>
        newSelected.has(keyExtractor(row, index))
      );
      onSelectionChange?.(selectedRowsData);
    };

    // Handle select all
    const handleSelectAll = () => {
      if (selectedRows.size === paginatedData.length) {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
      } else {
        const newSelected = new Set<string | number>();
        paginatedData.forEach((row, index) => {
          newSelected.add(keyExtractor(row, index));
        });
        setSelectedRows(newSelected);

        const selectedRowsData = paginatedData.filter((row, index) =>
          newSelected.has(keyExtractor(row, index))
        );
        onSelectionChange?.(selectedRowsData);
      }
    };

    const allSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length;

    return (
      <div className={clsx('overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700', className)}>
        <table
          ref={ref}
          className={clsx(
            'w-full text-sm',
            'border-collapse'
          )}
        >
          {/* Header */}
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              {selectable && (
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-green-600 focus:ring-green-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(
                    'px-4 py-3 font-semibold text-slate-900 dark:text-slate-100',
                    'text-left',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700',
                    column.width
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && sortConfig?.key === String(column.key) && (
                      <svg
                        className={clsx(
                          'w-4 h-4 transition-transform',
                          sortConfig.direction === 'desc' && 'rotate-180'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 8a1 1 0 011.414 0L10 13.586l5.586-5.586A1 1 0 1117.414 9l-7 7a1 1 0 01-1.414 0l-7-7A1 1 0 013 8z" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-400">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const rowKey = keyExtractor(row, index);
                const isSelected = selectedRows.has(rowKey);

                return (
                  <tr
                    key={rowKey}
                    className={clsx(
                      'border-b border-slate-200 dark:border-slate-700',
                      striped && index % 2 === 0 && 'bg-slate-50 dark:bg-slate-800/50',
                      hoverable && 'hover:bg-slate-100 dark:hover:bg-slate-700/50',
                      onRowClick && 'cursor-pointer',
                      isSelected && 'bg-green-50 dark:bg-green-900/20'
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowKey)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-slate-300 text-green-600 focus:ring-green-500"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={clsx(
                          'px-4 py-3 text-slate-900 dark:text-slate-100',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row, index)
                          : String(row[column.key] ?? '-')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination && paginatedData.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Page {pagination.currentPage} of {Math.ceil(sortedData.length / pagination.pageSize)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= Math.ceil(sortedData.length / pagination.pageSize)}
                className="px-3 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Table.displayName = 'Table';

export default Table;
