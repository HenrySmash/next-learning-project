import {
  Table as TableNextUI,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination
} from '@nextui-org/react';
import React, { useCallback, useMemo, useState } from 'react';

import { Data, TableProps } from 'types';
import { OrderBy } from 'utils/enums';

import { columns } from '../../config/data';

import TableActions from './table-actions';
import TableFilters from './table-filters';

export default function Table({ items, filters }: TableProps) {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 5;
  const filterValue = filters?.searchInput?.value;
  const dropDownValue = filters?.filters[0].value;

  const { pages, filteredItems } = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    let filteredData = [...items];
    if (filterValue) {
      filteredData = filteredData.filter((item: Data) => item.symbol.toLowerCase().includes(filterValue.toLowerCase()));
    }

    if (dropDownValue === OrderBy.ALPASC) {
      filteredData.sort((a : Data, b: Data) => a.symbol.localeCompare(b.symbol));
    } else if (dropDownValue === OrderBy.ALPDESC) {
      filteredData.sort((a : Data, b: Data) => a.symbol.localeCompare(b.symbol)).reverse();
    } else if (dropDownValue === OrderBy.TIMEASC) {
      filteredData.sort((a : Data, b: Data) => a.closeTime - b.closeTime);
    } else if (dropDownValue === OrderBy.TIMEDESC) {
      filteredData.sort((a : Data, b: Data) => a.closeTime - b.closeTime).reverse();
    }

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    return { pages: totalPages, filteredItems: filteredData.slice(start, end) };
  }, [page, items, filterValue, dropDownValue]);

  const renderCell = useCallback((item: Data, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Data];

    switch (columnKey) {
      case 'openPrice':
        return item.openPrice ? parseFloat(item.openPrice) : '--';
      case 'priceChangePercent':
        return item.priceChangePercent ? (
          <span
            className={parseFloat(item.priceChangePercent) > 0 ? 'text-success' : 'text-danger'}
          >
            {`${item.priceChangePercent}%`}
          </span>
        ) : '--';
      case 'volume':
        return item.priceChangePercent ? parseFloat(item.volume) : '--';
      case 'closeTime':
        return item.closeTime ? new Date(item.closeTime).toLocaleString() : '--';
      case 'actions':
        return <TableActions item={item} />;
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      {filters && (
        <TableFilters
          className="mb-7"
          searchInput={filters.searchInput}
          filters={filters.filters}
          hideClearFilters={filters.hideClearFilters}
        />
      )}
      <TableNextUI
        aria-label="Results table"
        bottomContent={(
          <div className="flex w-full justify-center mt-5">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={(pageNumber) => setPage(pageNumber)}
              classNames={{
                wrapper: 'rounded border border-default-200',
                item: 'text-small rounded-none bg-transparent text-text-default',
                cursor: 'rounded-none bg-background-cursor text-text-default font-bold shadow-none',
                prev: 'rounded-none text-foreground-500 bg-transparent border-r border-r-default-100',
                next: 'rounded-none text-foreground-500 bg-transparent border-l border-l-default-100'
              }}
            />
          </div>
        )}
      >
        <TableHeader columns={columns}>
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key} align="center" allowsSorting={false}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredItems}>
          {(item: Data) => (
            <TableRow key={item.symbol}>
              {(columnKey: React.Key) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </TableNextUI>
    </>
  );
}
