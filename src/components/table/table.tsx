'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { columns } from '../../config/data';
import { Data } from 'types';
import TableActions from './table-actions';
import TableFilters, { TableFilterProps } from './table-filters';
import { OrderBy } from 'utils/enums';

export interface TableProps {
  filters?: TableFilterProps;
}

export default function TableComponent({ filters }: TableProps) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const filterValue = filters?.searchInput?.value;
  const dropDownValue = filters?.filters[0].value;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/content');
      const apiData = await response.json();
      setData(apiData);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    let filteredData = [...data];
    console.log(start);
    console.log(end);
    if (filterValue) {
      filteredData = filteredData.filter((item: Data) =>
        item.symbol.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    console.log(dropDownValue);
    if (dropDownValue === "Alphabetically") {
      console.log("hello");
      filteredData = filteredData.sort((a : Data, b: Data) => {
        return a.symbol >= b.symbol ? 1 : -1
      });
    }
    else if (dropDownValue === "Latest to oldest") {
      filteredData = filteredData.sort((a : Data, b: Data) => {
        return a.closeTime >= b.closeTime ? 1 : -1
      });
    }
    else if (dropDownValue === "Oldest to Latest") {
      filteredData = filteredData.sort((a : Data, b: Data) => {
        return a.closeTime >= b.closeTime ? 1 : -1
      }).reverse();
    }

    return filteredData.slice(start, end);
  }, [page, data, filterValue, dropDownValue]);

  const pages = Math.ceil(items.length / rowsPerPage);

  const renderCell = useCallback((item: Data, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Data];

    switch (columnKey) {
      case 'openPrice':
        if (item.openPrice) {
          return parseFloat(item.openPrice);
        }

        return '--';
      case 'priceChangePercent':
        if (item.priceChangePercent) {
          var floatValue = parseFloat(item.priceChangePercent);
          return (
            <span
              className={floatValue > 0 ? 'text-green-600' : 'text-red-600'}>
              {floatValue}
            </span>
          );
        }

        return '--';
      case 'volume':
        if (item.volume) {
          return parseFloat(item.volume);
        }

        return '--';
      case 'closeTime':
        if (item.closeTime) {
          const date = new Date(item.closeTime);
          return date.toLocaleString();
        }

        return '--';
      case 'actions':
        return <TableActions item={item} />;
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return <p>No data</p>;

  return (
    <>
      {/* <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search by symbol..."
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      /> */}
      {filters && (
        <TableFilters
          className="mb-7"
          searchInput={filters.searchInput}
          filters={filters.filters}
          hideClearFilters={filters.hideClearFilters}
        />
        )}
      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]',
        }}>
        <TableHeader columns={columns}>
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key} align="center" allowsSorting={true}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item: Data) => (
            <TableRow key={item.symbol}>
              {(columnKey: React.Key) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
