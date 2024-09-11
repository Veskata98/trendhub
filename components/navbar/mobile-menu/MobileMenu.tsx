'use client';

import { Menu } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileMenu = ({ children }: { children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        checkWidth();

        window.addEventListener('resize', checkWidth);

        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    return (
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Menu className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent side="left" onClick={() => setIsOpen(false)}>
                    {children}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileMenu;
