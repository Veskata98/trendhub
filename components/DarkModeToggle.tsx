'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { MoonStarIcon, SunMedium } from 'lucide-react';

export function DarkModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
            className="hover:bg-zinc-300 dark:hover:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
            <SunMedium className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStarIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
