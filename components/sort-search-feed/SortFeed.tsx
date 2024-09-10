'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Clock, Flame, TrendingUp } from 'lucide-react';

export default function SortFeed() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleValueChange = (value: string) => {
        const searchTerm = searchParams.get('search');

        if (searchTerm) {
            router.push(`?sort=${value}&search=${searchTerm}`);
            return;
        }

        router.push(`?sort=${value}`);
    };

    return (
        <Select defaultValue="new" onValueChange={handleValueChange} value={searchParams.get('sort') || 'hot'}>
            <SelectTrigger
                className="w-[180px] bg-transparent border-[1px] border-zinc-200 dark:border-none focus-visible:ring-0 
            focus-visible:ring-offset-0 focus-visible:border-none focus-visible:outline-none
            focus:ring-0 focus:ring-offset-0 h-9"
            >
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="new">
                    <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>New</span>
                    </div>
                </SelectItem>
                <SelectItem value="hot">
                    <div className="flex items-center">
                        <Flame className="mr-2 h-4 w-4" />
                        <span>Hot</span>
                    </div>
                </SelectItem>
                <SelectItem value="top">
                    <div className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Top</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
