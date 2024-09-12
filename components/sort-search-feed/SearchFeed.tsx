'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFeed({ isHomePage = false }: { isHomePage?: boolean }) {
    const searchParams = useSearchParams();
    const initialValue = searchParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        setSearchTerm(initialValue);
    }, [initialValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const sort = searchParams.get('sort');

        if (sort) {
            router.push(`?sort=${sort}&search=${searchTerm}`);
            return;
        }

        router.push(`?search=${searchTerm}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex max-w-sm items-center text-black w-48 sm:w-60">
            <Input
                type="search"
                placeholder={isHomePage ? 'Search everything...' : 'Search posts...'}
                value={searchTerm}
                className="bg-transparent border-[1px] dark:border-zinc-400 focus-visible:ring-0 
                focus-visible:ring-offset-0 focus-visible:outline-none
                focus:ring-0 focus:ring-offset-0 dark:text-white h-9"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {initialValue ? (
                <Button type="submit" className="pr-0 pl-2" onClick={() => setSearchTerm('')}>
                    <X className="h-6 w-6 text-rose-500" />
                </Button>
            ) : (
                <Button type="submit" className="pr-1 pl-3">
                    <Search className="h-4 w-4 dark:text-white" />
                    <span className="sr-only">Search</span>
                </Button>
            )}
        </form>
    );
}
