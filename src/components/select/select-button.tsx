import {
  Button, DropdownTrigger
} from '@nextui-org/react';
import React from 'react';

import classNames from 'utils/classnames';

interface SelectButtonProps {
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
          'min-w-[150px] px-5 bg-background-cursor text-text-primary'
        )}
        radius={props.borderRadius ? props.borderRadius : 'lg'}
        variant={props.variant ? props.variant : 'flat'}
      >
        {!props.value ? (
          <span
            className="text-sm text-text-primary"
          >
            {props.placeholder}
          </span>
        ) : (
          <span
            className="text-sm text-text-primary"
          >
            {props.value}
          </span>
        )}
      </Button>
    </DropdownTrigger>
  );
}
