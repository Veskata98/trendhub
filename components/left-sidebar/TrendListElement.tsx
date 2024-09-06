import { Trend } from '@prisma/client';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';

export const TrendListElement = async ({ trend }: { trend: Trend }) => {
    return (
        <Link href={`/t/${trend.name}`} className="flex gap-2 items-center p-2">
            <Avatar>
                <AvatarImage src={trend.image_url} alt="trend_image" />
            </Avatar>
            <span>{trend.name}</span>
        </Link>
    );
};
