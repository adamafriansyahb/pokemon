'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconClass = 'h-4 w-4';

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeChange = () => {
    switch (theme) {
      case 'dark':
        setTheme('light');
        break;
      case 'light':
        setTheme('dark');
        break;
      default:
        setTheme('dark');
        break;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button onClick={handleThemeChange} variant="outline" size="icon">
      {theme === 'dark' ? <MoonIcon className={iconClass} /> : <SunIcon className={iconClass} />}
    </Button>
  );
};

export default ThemeSwitch;
