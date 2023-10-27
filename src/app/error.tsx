/* eslint-disable no-console */

'use client';

import React, { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col align-center mt-5">
      <h2>Something went wrong!</h2>
      <button type="button" onClick={() => reset()}>Try again</button>
    </div>
  );
}
