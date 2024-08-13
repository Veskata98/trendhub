import { redirect } from 'next/navigation';
import { ProfileActivitySection } from '@/components/profile/profile-activity-section/ProfileActivitySection';
import { currentUser } from '@clerk/nextjs/server';

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

    const user = await currentUser();

    if (!ACTIVITY_TYPES.includes(activity)) {
        redirect('/');
    }

    if (!(user?.username === username) && (activity === 'upvotes' || activity === 'downvotes')) {
        redirect('/');
    }

    return <ProfileActivitySection username={username} activity={activity} />;
}
