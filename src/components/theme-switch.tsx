'use client';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useCallback } from 'react';

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
      {theme === 'light' ? <Moon strokeWidth={1} /> : <Sun strokeWidth={1} /> }
    </Button>
  );
}
