import { Spinner } from '@nextui-org/spinner';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[100vh] min-w-full">
      <Spinner label="Loading..." color="default" size="lg" />
    </div>
  );
}
