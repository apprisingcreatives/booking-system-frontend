import React from 'react';
import { clsx } from 'clsx';

export interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T, index: number) => void;
  className?: string;
  striped?: boolean;
  hover?: boolean;
}

function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className,
  striped = true,
  hover = true,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-8 text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-2 text-gray-500'>Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-8 text-center'>
          <p className='text-gray-500'>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const getValue = (item: T, key: keyof T | string) => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj?.[k], item);
    }
    return item[key as keyof T];
  };

  return (
    <div
      className={clsx('bg-white rounded-lg shadow overflow-hidden', className)}
    >
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.headerClassName
                  )}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={clsx(
                  striped && rowIndex % 2 === 1 && 'bg-gray-50',
                  hover && 'hover:bg-gray-100',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(item, rowIndex)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={clsx(
                      'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(
                          getValue(item, column.key),
                          item,
                          rowIndex
                        )
                      : getValue(item, column.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
