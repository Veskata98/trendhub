import { Trend } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export const TrendListElement = async ({ trend }: { trend: Trend }) => {
    return (
        <Link href={`/t/${trend.name}`} className="flex gap-2 items-center p-2">
            <Image src={trend.image_url} alt="trend_image" width={20} height={20} />
            <span>{trend.name}</span>
        </Link>
    );
};
