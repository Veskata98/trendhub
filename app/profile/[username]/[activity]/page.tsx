import { redirect } from 'next/navigation';
import { ProfileMainSection } from '@/components/profile/profile-main-section/ProfileMainSection';

type ProfileActivityPageProps = {
    params: {
        activity: string;
        username: string;
    };
};

const ACTIVITY_TYPES = ['posts', 'comments', 'upvotes', 'downvotes'];

export default async function ProfileActivityPage({ params }: ProfileActivityPageProps) {
    const activity = params.activity;
    const username = params.username;

    if (!ACTIVITY_TYPES.includes(activity)) {
        redirect('/');
    }

    return <ProfileMainSection username={username} activity={activity} />;
}
