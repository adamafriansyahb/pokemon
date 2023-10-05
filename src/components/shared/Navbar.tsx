'use client';

import * as React from 'react';
import Link from 'next/link';

import { SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

function Navbar() {
  return (
    <nav className="fixed w-full bg-white z-10">
      <NavigationMenu className="py-2 px-4 lg:px-20 max-w-full justify-between shadow-md">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>PokePedia</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            <ul className="flex items-center space-x-2">
              <Link href="/my-pokemon" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>My Pokemons</NavigationMenuLink>
              </Link>
              <Button variant="outline" size="icon">
                <SunIcon className="h-4 w-4" />
              </Button>
            </ul>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default Navbar;
