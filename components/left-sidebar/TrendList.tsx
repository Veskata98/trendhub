import prisma from '@/lib/db';
import React from 'react';
import { TrendListElement } from './TrendListElement';

export const TrendList = async () => {
    const trends = await prisma.trend.findMany({ orderBy: { created_at: 'desc' } });

    return (
        <ul>
            {trends.map((trend) => (
                <li key={trend.name} className="hover:bg-zinc-100 rounded dark:hover:bg-zinc-600">
                    <TrendListElement trend={trend} />
                </li>
            ))}
        </ul>
    );
};
