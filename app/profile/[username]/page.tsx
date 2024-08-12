import { ProfileMainSection } from '@/components/profile/profile-main-section/ProfileMainSection';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
    return <ProfileMainSection username={params.username} />;
}
