import { useEffect, useState } from 'react';

export function useCheckMounted() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return mounted;
}
