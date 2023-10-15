'use client';

import { useEffect, useState } from 'react';

export function useCheckMounted() {
  const [mounted, setMounted] = useState<boolean>(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return mounted;
}
