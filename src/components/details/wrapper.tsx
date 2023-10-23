import React, { ReactNode } from 'react';

import classNames from 'utils/classnames';

interface DetailsWrapperProps {
  children: ReactNode;
  className?: string;
}

export function DetailsWrapper({ children, className} : DetailsWrapperProps) {
  return (
    <div
      className={classNames(
        'grid grid-cols-1 gap-4 max-w-[50%] sm:grid-cols-2 max-w-full',
        className
      )}
    >
      {children}
    </div>
  );
}
