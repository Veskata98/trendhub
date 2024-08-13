import { TrendHeader } from '@/components/trends/trend-main/TrendHeader';
import prisma from '@/lib/db';
import Image from 'next/image';
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

    return (
        <section className="w-full">
            <div className="w-full md:w-2/3 mx-auto p-4">
                <TrendHeader trend={trend} />
            </div>
        </section>
    );
}
