'use client';

import { useModal } from '@/hooks/useModalStore';

export const DeleteProfileButton = ({ username }: { username: string }) => {
    const { onOpen } = useModal();
    return (
        <button
            onClick={() => onOpen('deleteProfile', { username })}
            className="bg-zinc-300 w-full text-primary-800 font-semibold py-2 px-4 rounded transition duration-200 ease-out hover:bg-black mt-auto"
        >
            Delete profile
        </button>
    );
};
