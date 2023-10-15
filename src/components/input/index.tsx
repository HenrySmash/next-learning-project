import { Input as NextUIInput, InputProps as NextUIInputProps } from '@nextui-org/input';
import React, { useMemo } from 'react';

interface InputProps extends NextUIInputProps {
  numInputs?: number;
  noBottomSpace?: boolean
  noTopSpace?: boolean
  pickerHeaderLabel?: string;
  isToday?: boolean;
}

export function Input(props: InputProps) {
  function getInputWrapperSpace() {
    if (props.label) {
      return '';
    }
    if (props.noTopSpace) {
      return 'mt-0';
    }
    return 'mt-[30px]';
  }

  const bottomWrapperSpace = useMemo(() => {
    if (props.noBottomSpace) {
      return '';
    }
    return 'mb-[40px]';
  }, [props.noBottomSpace]);

  const inputProps = {
    ...props,
    classNames: {
      input: [
        'text-sm',
        'text-foreground-500'
      ],
      label: 'font-bold text-sm',
      inputWrapper: getInputWrapperSpace(),
      mainWrapper: `${bottomWrapperSpace} justify-end`
    },
    radius: 'md',
    size: 'lg',
    labelPlacement: 'outside',
    endContent: props.endContent,
    type: props.type
  } as InputProps;

  return (
    <NextUIInput
      {...inputProps}
    />
  );
}
