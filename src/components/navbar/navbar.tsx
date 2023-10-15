/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from 'assets/images/twistag.svg';

export const Navbar = () => (
  <NextUINavbar
    classNames={{
      wrapper: [
        'bg-default-100'
      ]
    }}
    maxWidth="full"
    position="sticky"
  >
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <Link className="flex justify-start items-center gap-1" href="/">
          <Image alt="" priority src={logo} width={100} height={33} />
          <p className="font-bold text-inherit">Stock Info</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent
      className="hidden sm:flex basis-1/5 sm:basis-full"
      justify="end"
    >
      <NavbarItem>
        <Link
          color="foreground"
          className="text-large"
          href="/favorites"
        >
          Favorites
        </Link>
      </NavbarItem>
    </NavbarContent>
  </NextUINavbar>
);
