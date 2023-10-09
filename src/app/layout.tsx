import React from 'react';

import 'assets/styles/globals.scss';
import { FavoritesProvider } from 'utils/FavoritesContext';

import reducer from '../utils/reducer';

import { Providers } from './providers';
import { NavBarWrapper } from 'components/navbar/navbar-wrapper';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <FavoritesProvider reducer={reducer} initialState={{ data: [] }}>
            <div className="relative flex flex-col h-screen">
              <NavBarWrapper />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </FavoritesProvider>
        </Providers>
      </body>
    </html>
  );
}
