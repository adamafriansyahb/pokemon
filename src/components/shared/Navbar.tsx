'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  return (
    <nav className="fixed flex items-center justify-center w-full bg-white dark:bg-slate-950 shadow-md shadow-emerald-500 z-10">
      <NavigationMenu className="py-2 px-4 max-w-full lg:px-0 lg:max-w-5xl justify-between">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-xl font-semibold">PokePedia</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ul className="flex items-center space-x-2">
              <Link href="/my-pokemon" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>My Pokemons</NavigationMenuLink>
              </Link>
              <ThemeSwitch />
            </ul>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
