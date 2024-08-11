import Image from 'next/image';
import { LogoutButton } from './LogoutButton';
import { currentUser } from '@clerk/nextjs/server';

export const ProfileInfo = async () => {
    const user = await currentUser();
    return (
        <div className="flex items-center gap-2 ">
            <Image
                className="rounded-full object-cover object-center"
                src={user?.imageUrl || '/no-avatar.png'}
                width={64}
                height={64}
                alt="user_avatar"
            />
            <h2 className="font-semibold">{user?.fullName}</h2>

            <LogoutButton />
        </div>
    );
};
