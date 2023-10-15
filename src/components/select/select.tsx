import {
  Dropdown, DropdownItem, DropdownMenu, SelectionMode
} from '@nextui-org/react';
import React, { useCallback, useMemo } from 'react';
import { Controller, Control } from 'react-hook-form';

import classNames from 'utils/classnames';

import { SelectButton } from './select-button';

interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
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

  const renderLabel = useCallback(() => {
    if (props.label) {
      return (
        <span
          className={classNames(
            'block font-bold text-sm text-foreground pb-1.5',
            props.errorMessage && '!text-danger'
          )}
        >
          {props.label}
        </span>
      );
    }
    return null;
  }, [props.errorMessage, props.label]);

  const renderErrorMessage = () => {
    if (props.errorMessage) {
      return (
        <span className="text-tiny text-danger">{props.errorMessage}</span>
      );
    }
    return null;
  };

  const baseClassNames = 'max-h-[300px] overflow-auto items-start flex flex-col items-start justify-start';

  const renderController = () => (
    <Controller
      control={props.control}
      name={props.id}
      render={({ field: { onChange, value } }) => (
        <div className={bottomWrapperSpace}>
          {renderLabel()}
          <Dropdown classNames={{ base: baseClassNames }}>
            <SelectButton {...props} value={value as string} />
            {renderDropdownMenu(value as string, onChange)}
          </Dropdown>
          {renderErrorMessage()}
        </div>
      )}
    />
  );

  const renderDefault = () => (
    <div className={bottomWrapperSpace}>
      {renderLabel()}
      <Dropdown classNames={{ base: baseClassNames }}>
        <SelectButton {...props} value={props.value as string} />
        {renderDropdownMenu(props.value as string, props.setValue)}
      </Dropdown>
      {renderErrorMessage()}
    </div>
  );

  return props.control ? renderController() : renderDefault();
}
