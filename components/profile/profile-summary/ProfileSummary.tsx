import serverUser from '@/lib/serverUser';
import { ProfileJoinedTrends } from './profile-joined-trends/ProfileJoinedTrends';
import { ProfileMyTrends } from './profile-my-trends/ProfileMyTrends';

type ProfileSummaryProps = {
    username: string;
};

export const ProfileSummary = async ({ username }: ProfileSummaryProps) => {
    const user = await serverUser();

    return (
        <div className="w-full bg-zinc-100/40 dark:bg-zinc-700/40 rounded p-2">
            <ProfileMyTrends username={username} />
            {user?.username === username && <ProfileJoinedTrends username={username} />}
        </div>
    );
};
