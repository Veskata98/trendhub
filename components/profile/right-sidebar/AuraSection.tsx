import prisma from '@/lib/db';
import moment from 'moment';

type AuraSectionProps = {
    username: string;
};

export const AuraSection = async ({ username }: AuraSectionProps) => {
    const likes = await prisma.like.findMany({
        where: {
            username,
        },
    });

    const totalAura = likes.map((like) => (like.type === 'LIKE' ? 1 : -1)).reduce((a, x) => a + x, 0);

    const postAura = likes.map((like) => (like.type === 'LIKE' ? 1 : -1)).reduce((a, x) => a + x, 0);

    return (
        <div className="flex flex-col items-center w-full gap-8 font-semibold">
            <div className="flex flex-col items-center">
                <p className="text-sm">Total Aura</p>
                <span>{totalAura}</span>
            </div>
            <div className="flex justify-around w-full">
                <div className="flex flex-col items-center">
                    <span>{postAura}</span>
                    <span className="text-sm">Post Aura</span>
                </div>
                <div className="flex flex-col items-center">
                    <span>0</span>
                    <span className="text-sm">Comment Aura</span>
                </div>
            </div>
        </div>
    );
};
