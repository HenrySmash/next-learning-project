import {
  Dropdown, DropdownItem, DropdownMenu, SelectionMode
} from '@nextui-org/react';
import React, { useCallback, useMemo } from 'react';

import classNames from 'utils/classnames';

import { SelectButton } from './select-button';

interface SelectProps {
  label?: string;
  id: string;
  errorMessage?: string;
  className?: string;
  items: string[];
  placeholder: string | undefined;
  selectionMode?: SelectionMode;
  setValue?: (value: string) => void;
  value?: string;
  noBottomSpace?: boolean;
  variant?: 'flat' | 'bordered'
  borderRadius? : 'lg' | 'full'
  isDisabled?: boolean;
}

export function Select(props: SelectProps) {
  const bottomWrapperSpace = useMemo(() => {
    if (props.noBottomSpace) {
      return '';
    }
    return props.errorMessage ? 'mb-[15px]' : 'mb-[40px]';
  }, [props.errorMessage, props.noBottomSpace]);

  const renderDropdownItem = (item: string, selectedValue: string) => (
    <DropdownItem
      className={
      classNames(item === selectedValue ? '!bg-brown_tertiary !text-foreground-500 md:hover:!text-foreground-500 font-medium' : '!bg-content1 !text-foreground-500 md:hover:!bg-brown_tertiary !font-thin')
    }
      key={item}
    >
      {item}

    </DropdownItem>
  );

  const renderDropdownMenu = useCallback((value: string, onChange?: (value: string) => void) => (
    <DropdownMenu
      aria-label="dropdown menu"
      id={props.id}
      selectionMode={props.selectionMode ?? 'single'}
      selectedKeys={value}
      onSelectionChange={(keys) => onChange && onChange(Array.from(keys).join(', ').replaceAll('_', ' '))}
    >
      {props.items?.map((item) => renderDropdownItem(item, value))}
    </DropdownMenu>
  ), [props.id, props.items, props.selectionMode]);

  const baseClassNames = 'max-h-[300px] overflow-auto items-start flex flex-col items-start justify-start';

  const render = () => (
    <div className={bottomWrapperSpace}>
      <Dropdown classNames={{ base: baseClassNames }}>
        <SelectButton {...props} value={props.value as string} />
        {renderDropdownMenu(props.value as string, props.setValue)}
      </Dropdown>
    </div>
  );

  return render();
}
