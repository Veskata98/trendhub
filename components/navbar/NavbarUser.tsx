import Image from 'next/image';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

export const NavbarUser = async () => {
    const user = await getKindeServerSession().getUser();

    return (
        <div className="relative">
            <Link href={`/profile/${user?.id}`} className="flex gap-2 justify-center items-center">
                <div>
                    <Image
                        src={user?.picture || '/no-avatar.png'}
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                </div>
                <p className="font-semibold text-sm hidden md:block">{user?.given_name}</p>
            </Link>
        </div>
    );
};
