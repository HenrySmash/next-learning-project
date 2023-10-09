'use client';

import React, { useMemo, useState } from 'react';

import { OrderBy } from 'utils/enums';
import TableComponent from 'components/table/table';
import { FilterDropdown } from 'components/table/table-filters';

interface TableWrapperProps {
    ordering: OrderBy;
}

export default function TableWrapper({ordering = OrderBy.DESC}: TableWrapperProps) {
  const [filterSymbol, setfilterSymbol] = useState<string | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<OrderBy>(ordering);
  const selectorLabel = useMemo(() => ({
    desc: "Latest to oldest",
    asc: "Oldest to latest",
    alp: "Alphabetically",
  }), []);
  const stringToEnum = (value : string | undefined) => {
    if (value === selectorLabel.alp) {
        return OrderBy.ALP;
    }
    else if (value === selectorLabel.asc) {
        return OrderBy.ASC;
    }
    else if (value === selectorLabel.desc) {
        return OrderBy.DESC;
    }
    else {
        return OrderBy.ASC;
    }
    
  }
  const tableFilters: FilterDropdown[] = [
    {
      id: 'accountType',
      items: [selectorLabel.desc, selectorLabel.asc, selectorLabel.alp],
      placeholder: selectorLabel[selectedOrder],
      value: selectorLabel[selectedOrder],
      onChange: (value: string | undefined) => setSelectedOrder(stringToEnum(value))
    }
    // },
    // {
    //   id: 'transactionType',
    //   items: [
    //     getTransactionTypeDisplay({ transactionType: 'deposit', t }),
    //     getTransactionTypeDisplay({ transactionType: 'withdraw', t }),
    //     getTransactionTypeDisplay({ transactionType: 'referral_bonus', t }),
    //     getTransactionTypeDisplay({ transactionType: 'promotional_bonus', t })
    //   ],
    //   placeholder: t('tables.transactions.filter.transaction_type'),
    //   value: filterTransactionType ? getTransactionTypeDisplay({ transactionType: filterTransactionType, t }) : '',
    //   onChange: (value: string | undefined) => setFilterTransactionType(mapToEnumValue(value))
    // }
  ];
  
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block justify-center">
        <TableComponent 
        filters={{
        searchInput: {
          placeholder: "Search by symbol",
          value: filterSymbol || '',
          onChange: setfilterSymbol
        },
        filters: tableFilters
      }}/>
      </div>
    </section>
  );
}
