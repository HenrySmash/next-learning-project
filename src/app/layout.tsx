import React from 'react';

import 'assets/styles/globals.scss';
import { NavBarWrapper } from 'components/navbar/navbar-wrapper';

import { Providers } from './providers';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full min-h-screen bg-background-default">
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <NavBarWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
