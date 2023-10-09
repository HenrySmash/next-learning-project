'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { Logo } from 'components/icons';
import { ThemeSwitch } from 'components/theme-switch';

export const Navbar = () => (
  <NextUINavbar maxWidth="xl" position="sticky">
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <Link className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <p className="font-bold text-inherit">Stock Info</p>
        </Link>
      </NavbarBrand>
      {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
    </NavbarContent>

    <NavbarContent
      className="hidden sm:flex basis-1/5 sm:basis-full"
      justify="end"
    >
      <NavbarItem>
        <Link
          color="foreground"
          href="/favorites"
        >
          Favorites
        </Link>
        ß
      </NavbarItem>
      <NavbarItem className="hidden sm:flex gap-2">
        <ThemeSwitch />
      </NavbarItem>
    </NavbarContent>
  </NextUINavbar>
);
