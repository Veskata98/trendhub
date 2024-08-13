import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

type TrendNamePageProps = {
    params: {
        trendName: string;
    };
};

export default async function TrendNamePage({ params }: TrendNamePageProps) {
    const trendName = params.trendName;

    const trend = await prisma.trend.findFirst({
        where: {
            name: trendName,
        },
    });

    if (!trend) {
        redirect('/');
    }

    return <div>Trend</div>;
}
