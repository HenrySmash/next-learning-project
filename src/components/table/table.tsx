'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { columns } from '../../config/data';
import { Data } from 'types';
import TableActions from './table-actions';

export default function TableComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [filterValue, setFilterValue] = useState('');

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

    if (filterValue) {
      filteredData = filteredData.filter((item: Data) =>
        item.symbol.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredData.slice(start, end);
  }, [page, data, filterValue]);

  const pages = Math.ceil(items.length / rowsPerPage);
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

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
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search by symbol..."
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
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
