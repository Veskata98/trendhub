'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { ArrowUpRight } from 'lucide-react';

export const PostImage = ({ imageUrl }: { imageUrl: string }) => {
    const [showArrow, setShowArrow] = useState(false);

    return (
        <div className="w-full h-52 sm:h-64 md:h-72 lg:h-80 xl:h-96 relative bg-zinc-200 dark:bg-zinc-800 rounded shadow">
            <Link
                href={imageUrl}
                target="_blank"
                onMouseEnter={() => setShowArrow(true)}
                onMouseLeave={() => setShowArrow(false)}
                className="relative flex items-center justify-center w-full h-full"
            >
                <Image
                    src={imageUrl}
                    alt="post_image"
                    fill
                    className={cn('object-contain', showArrow && 'opacity-90')}
                />
                {showArrow && <ArrowUpRight className="absolute w-8 h-8 text-white" />}
            </Link>
        </div>
    );
};
