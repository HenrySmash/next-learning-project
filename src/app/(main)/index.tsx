'use client';

import React, { useMemo, useState } from 'react';

import Table from 'components/table/table';
import { TableWrapperProps, FilterDropdown } from 'types';
import { OrderBy } from 'utils/enums';

export default function TableWrapper({ items, ordering = OrderBy.ALPASC }: TableWrapperProps) {
  const [filterSymbol, setfilterSymbol] = useState<string | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<OrderBy>(ordering);

  const selectorLabel = useMemo(() => ({
    timeDesc: 'Close time descending',
    timeAsc: 'Close time ascending',
    alpAsc: 'Alphabetically A-Z',
    alpDesc: 'Alphabetically Z-A'
  }), []);

  const stringToEnum = (value : string | undefined) => {
    if (value === selectorLabel.alpAsc) {
      return OrderBy.ALPASC;
    }
    if (value === selectorLabel.alpDesc) {
      return OrderBy.ALPDESC;
    }
    if (value === selectorLabel.timeAsc) {
      return OrderBy.TIMEASC;
    }
    if (value === selectorLabel.timeDesc) {
      return OrderBy.TIMEDESC;
    }

    return OrderBy.ALPASC;
  };

  const tableFilters: FilterDropdown[] = [
    {
      id: 'accountType',
      items: [selectorLabel.alpAsc, selectorLabel.alpDesc, selectorLabel.timeAsc, selectorLabel.timeDesc],
      placeholder: selectedOrder,
      value: selectedOrder,
      onChange: (value: string | undefined) => setSelectedOrder(stringToEnum(value))
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block justify-center">
        <Table
          items={items}
          filters={{
            searchInput: {
              placeholder: 'Search by symbol',
              value: filterSymbol || '',
              onChange: setfilterSymbol
            },
            filters: tableFilters
          }}
        />
      </div>
    </section>
  );
}
