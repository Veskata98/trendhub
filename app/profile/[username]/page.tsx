import { ProfileSummary } from '@/components/profile/profile-summary/ProfileSummary';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
    const username = params.username;

    return <ProfileSummary username={username} />;
}
