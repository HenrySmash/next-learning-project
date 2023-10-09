'use client';

import { Button as NextUIButton, ButtonProps as NextUIButtonProps } from '@nextui-org/button';
import React from 'react';

import classNames from 'utils/classnames';

interface ButtonProps extends NextUIButtonProps {
  setMinWidth?: boolean
}

export function Button(props: ButtonProps) {
  return (
    <NextUIButton
      {...props}
      className={classNames('font-medium', props.setMinWidth && 'min-w-[150px]', props.className)}
      size={props.size ?? 'lg'}
      color={props.color ?? 'primary'}
      radius="md"
    />
  );
}
