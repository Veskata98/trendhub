import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { LogoutButton } from './LogoutButton';

export const ProfileInfo = async () => {
    const user = await getKindeServerSession().getUser();
    return (
        <div className="flex items-center gap-2 ">
            <Image
                className="rounded-full object-cover object-center"
                src={user?.picture || '/no-avatar.png'}
                width={64}
                height={64}
                alt="user_avatar"
            />
            <h2 className="font-semibold">{user?.given_name}</h2>

            <LogoutButton />
        </div>
    );
};
