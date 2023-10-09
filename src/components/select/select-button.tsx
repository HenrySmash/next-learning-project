import {
  Button, DropdownTrigger
} from '@nextui-org/react';
import React from 'react';

import classNames from 'utils/classnames';

interface SelectButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage?: string;
  className?: string;
  placeholder: string | undefined;
  value?: string;
  variant?: 'flat' | 'bordered'
  borderRadius? : 'lg' | 'full'
  isDisabled?: boolean;
}

export function SelectButton(props: SelectButtonProps) {
  return (
    <DropdownTrigger>
      <Button
        isDisabled={props.isDisabled}
        fullWidth
        size="lg"
        className={classNames(
          props.variant !== 'bordered' && 'bg-default-100 justify-start',
          props.className,
          'min-w-[150px] px-5',
          props.errorMessage && '!bg-danger-50'
        )}
        radius={props.borderRadius ? props.borderRadius : 'lg'}
        variant={props.variant ? props.variant : 'flat'}
      >
        {!props.value ? (
          <span
            className={classNames(
              'text-sm font-thin',
              props.errorMessage ? 'text-danger' : 'text-text_secondary'
            )}
          >
            {props.placeholder}
          </span>
        ) : (
          <span
            className={classNames(
              'text-sm font-thin',
              props.errorMessage ? 'text-danger' : 'text-text_secondary'
            )}
          >
            {props.value}
          </span>
        )}
      </Button>
    </DropdownTrigger>
  );
}
