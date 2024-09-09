import { currentUser } from '@clerk/nextjs/server';
import { ActivityLinks } from './ActivityLinks';

const LIST_ITEMS = { Summary: '', Posts: 'posts', Comments: 'comments', Upvotes: 'upvotes', Downvotes: 'downvotes' };

export const ProfileActivitySection = async ({ username }: { username: string }) => {
    const user = await currentUser();
    const canEdit = user?.username === username;

    const links = canEdit ? LIST_ITEMS : { Summary: '', Posts: 'posts', Comments: 'comments' };

    return (
        <div className="p-2">
            <ActivityLinks links={links} username={username} />
        </div>
    );
};
