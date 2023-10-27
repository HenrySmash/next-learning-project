/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client';

import { Navbar as NextUINavbar, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { ThemeSwitcher } from 'components/theme-switch';

export const Navbar = () => (
  <NextUINavbar
    classNames={{
      wrapper: [
        'bg-background-navbar shadow-small px-12'
      ]
    }}
    maxWidth="full"
  >
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <Link className="flex justify-start items-center gap-4" href="/">
        <h5 className="font-bold text-inherit text-lg text-text-header">Stock Info</h5>
      </Link>
    </NavbarContent>

    <NavbarContent
      className="hidden sm:flex basis-1/5 sm:basis-full"
      justify="end"
    >
      <ThemeSwitcher />
      <Link
        className="text-large text-text-header"
        href="/favorites"
      >
        Favorites
      </Link>
    </NavbarContent>
  </NextUINavbar>
);
