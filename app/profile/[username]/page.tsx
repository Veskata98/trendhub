import { ProfileActivitySection } from '@/components/profile/profile-activity-section/ProfileActivitySection';

type ProfilePageProps = {
    params: {
        username: string;
    };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
    return <div>posts</div>;
}
