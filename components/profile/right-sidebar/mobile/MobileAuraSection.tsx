import prisma from '@/lib/db';

type MobileAuraSectionProps = {
    username: string;
};

export const MobileAuraSection = async ({ username }: MobileAuraSectionProps) => {
    const likes = await prisma.like.findMany({
        where: {
            post: { creator_name: username }, // Posts created by the given user
            username: { not: username }, // Exclude the user's own likes/dislikes
        },
    });

    const totalAura = likes.map((like) => (like.type === 'LIKE' ? 1 : -1)).reduce((a, x) => a + x, 0);

    const postAura = likes.map((like) => (like.type === 'LIKE' ? 1 : -1)).reduce((a, x) => a + x, 0);

    return (
        <div className="flex flex-col items-center w-full gap-2">
            <div className="flex flex-col items-center">
                <p className="text-sm">Total Aura</p>
                <span className="font-semibold">{totalAura}</span>
            </div>
            <div className="flex justify-around w-full">
                <div className="flex flex-col items-center">
                    <span className="font-semibold">{postAura}</span>
                    <span className="text-sm">Post Aura</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-semibold">0</span>
                    <span className="text-sm">Comment Aura</span>
                </div>
            </div>
        </div>
    );
};
