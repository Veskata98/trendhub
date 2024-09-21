"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { MoonStarIcon, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

export function DarkModeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
            }
            className={cn(
                "hover:bg-primary-700 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 dark:hover:bg-primary-300",
                className,
            )}
        >
            <SunMedium className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStarIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
