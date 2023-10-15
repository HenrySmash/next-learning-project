'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import React from 'react';

import { FavoritesProvider } from 'context/favorites-context';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <FavoritesProvider initialState={{ data: [] }}>
          {children}
        </FavoritesProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
