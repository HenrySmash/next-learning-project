'use client';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { useTheme } from 'next-themes';
import React, { useCallback } from 'react';

import { MoonFilledIcon, SunFilledIcon } from 'assets/icons';
import { useCheckMounted } from 'hooks/ui/check-mounted';

export function ThemeSwitcher() {
  const mounted = useCheckMounted();
  const { theme, setTheme } = useTheme();

  const switchTheme = useCallback(() => {
    if (mounted) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [setTheme, mounted, theme]);

  if (!mounted || !theme) return <Spinner color="default" size="sm" className="mr-2" />;

  return (
    <Button variant="light" className="cursor-pointer" isIconOnly onClick={switchTheme} disabled={!mounted}>
      {theme === 'light' ? <MoonFilledIcon size={22} strokeWidth={1} /> : <SunFilledIcon size={22} strokeWidth={1} /> }
    </Button>
  );
}
