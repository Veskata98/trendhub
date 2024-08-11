import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

type ProfilePageProps = {
    params: {
        id: string;
    };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
    const user = await currentUser();

    return (
        <div className="flex flex-col align-middle my-8 px-8 relative items-center border-r border-orange-500 w-2/5">
            <ProfileInfo />
            <form className="mb-10">
                <input className="mb-2 w-full" type="file" accept=".jpeg,.jpg,.png,.gif" />
                <button className="bg-orange-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-orange-600">
                    Save
                </button>
            </form>
            <form className="mb-10 flex flex-col w-full">
                <input
                    className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="Old Password"
                    type="password"
                    autoComplete="new-password"
                    name="oldPassword"
                />
                <input
                    className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="New Password"
                    type="password"
                    name="newPassword"
                />
                <input
                    className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
                    placeholder="Repeat New Password"
                    type="password"
                    name="repass"
                />
                <button className="bg-orange-500 text-white py-2 px-4 rounded transition duration-200 ease-in-out hover:bg-orange-600">
                    Change password
                </button>
            </form>
            <button className="bg-red-500 w-full text-white py-2 px-4 rounded transition duration-200 ease-out hover:bg-red-600">
                Delete account
            </button>
        </div>
    );
}
