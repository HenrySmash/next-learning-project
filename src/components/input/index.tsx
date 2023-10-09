import { Input as NextUIInput, InputProps as NextUIInputProps } from '@nextui-org/input';
import { Eye, EyeOff } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Controller, Control } from 'react-hook-form';

import classNames from 'utils/classnames';

interface InputWithControlProps extends NextUIInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  numInputs?: number;
  noBottomSpace?: boolean
  noTopSpace?: boolean
  pickerHeaderLabel?: string;
  isToday?: boolean;
}

export function Input(props: InputWithControlProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const visibleInputType = isVisible ? 'text' : 'password';
  const inputType = props.type === 'password' ? visibleInputType : props.type;

  function getInputWrapperSpace() {
    if (props.label) {
      return '';
    }
    if (props.noTopSpace) {
      return 'mt-0';
    }
    return 'mt-[30px]';
  }

  const showPasswordButton = (
    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
      {isVisible ? (
        <EyeOff className="text-2xl text-default-400 pointer-events-none" strokeWidth={1} />
      ) : (
        <Eye className="text-2xl text-default-400 pointer-events-none" strokeWidth={1} />
      )}
    </button>
  );

  const bottomWrapperSpace = useMemo(() => {
    if (props.noBottomSpace) {
      return '';
    }
    return props.errorMessage ? 'mb-[20px]' : 'mb-[40px]';
  }, [props.noBottomSpace, props.errorMessage]);

  const renderLabel = useMemo(
    () => (
      <label
        htmlFor={props.id}
        className={classNames(
          'block text-foreground pb-1.5 font-bold text-sm',
          props.errorMessage && '!text-danger'
        )}
      >
        {props.label}
      </label>
    ),
    [props.errorMessage, props.id, props.label]
  );

  const inputProps = {
    ...props,
    classNames: {
      input: 'text-sm',
      label: 'font-bold text-sm',
      inputWrapper: getInputWrapperSpace(),
      mainWrapper: `${bottomWrapperSpace} justify-end`
    },
    radius: 'md',
    size: 'lg',
    labelPlacement: 'outside',
    validationState: props.errorMessage ? 'invalid' : 'valid',
    endContent: props.type === 'password' ? showPasswordButton : props.endContent,
    type: inputType
  } as InputWithControlProps;

  if (props.control && props.id) {
    return (
      <Controller
        control={props.control}
        name={props.id}
        render={({ field: { onChange, value } }) => (
          <NextUIInput
            autocapitalize="off"
            {...inputProps}
            onChange={(event) => {
              onChange(event); // Call the original onChange function from props
            }}
            value={value as string}
          />
        )}
      />
    );
  }

  return (
    <NextUIInput
      {...inputProps}
    />
  );
}
