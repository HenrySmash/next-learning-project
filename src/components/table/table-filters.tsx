
import { FilterX, Search } from 'lucide-react';
import React, { useCallback } from 'react';

import { FilterProps } from 'types';
import classNames from 'utils/classnames';

import { Button } from '../button';
import { Input } from '../input';
import { Select } from '../select';

export function TableFilters({
  searchInput, filters, hideClearFilters, className
}: FilterProps) {
  const clearFilters = useCallback(() => {
    filters?.forEach((filter) => {
      filter.onChange(undefined);
    });

    if (searchInput) {
      searchInput.onChange('');
    }
  }, [filters, searchInput]);

  return (
    <div
      className={classNames(
        className,
        'flex flex-col justify-between gap-3 items-center',
        filters.length > 3 ? 'lg:flex-row' : 'md:flex-row'
      )}
    >
      {searchInput && (
        <Input
          noTopSpace
          className="grow-0"
          endContent={<Search size={18} className="text-foreground-500" />}
          noBottomSpace
          placeholder={searchInput.placeholder}
          value={searchInput.value}
          onChange={(newValue) => searchInput.onChange(newValue.target.value)}
        />
      )}
      <div className="md:ml-auto w-full md:w-auto gap-3 items-center grid grid-cols-1 sm:flex lg:flex-nowrap grow">
        {filters?.map((filter) => (
          <Select
            key={filter.id}
            borderRadius="full"
            variant="flat"
            noBottomSpace
            id={filter.id}
            items={filter.items}
            placeholder={filter.placeholder}
            value={filter.value}
            setValue={(value) => filter.onChange(value)}
          />
        ))}
        {!hideClearFilters && (
          <Button
            variant="bordered"
            className="border-none md:border-default text-foreground-500 bg-transparent w-full md:w-[48px] p-0 min-w-0 rounded-full"
            onClick={clearFilters}
          >
            <FilterX size={18} />
            <p className="text-center md:hidden text-text_secondary text-sm font-thin">
              Clear filters
            </p>
          </Button>
        )}
      </div>
    </div>
  );
}

export default TableFilters;
