import { X } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/useModalStore';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';
import LoadingSpinner from '../other/LoadingSpinner';
import deleteProfile from '@/actions/profile-actions/deleteProfile';

export const DeleteProfileModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { username } = data;

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || type !== 'deleteProfile' || !username) {
        return null;
    }

    const formAction = async () => {
        const res = await deleteProfile(username);
        if (res.success) {
            onClose();
            toast.success('Profile deleted successfully');
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm w-screen h-screen"
            onClick={onBackdropClick}
        >
            <div
                className="relative backdrop-blur-lg bg-white bg-opacity-30 dark:bg-opacity-40 dark:bg-zinc-600 
        mt-32 md:mt-0 mx-4 sm:mx-8 p-8 px-2 sm:px-8 w-full md:w-2/3 xl:w-3/5 2xl:w-2/5 
        rounded-lg shadow-sm flex flex-col items-center space-y-4"
            >
                <X className="absolute top-2 right-2 cursor-pointer text-zinc-200 rounded" onClick={onClose} />

                <h4 className="font-semibold text-white">Delete Profile</h4>

                <div className="flex flex-col items-center w-full space-y-8">
                    <p className="text-white text-center lg:text-left">
                        Are you sure you want to delete your profile &quot;<strong>{username}</strong>&quot;? This
                        action cannot be undone. To confirm, please type your username below.
                    </p>
                    <form
                        action={formAction}
                        autoComplete="off"
                        className="flex flex-col w-full lg:w-2/3 xl:w-1/2 space-y-4 justify-center"
                    >
                        <div>
                            <Input
                                type="text"
                                name="username"
                                autoComplete="new-password"
                                placeholder="Type your username to confirm"
                                required
                                onChange={(e) => setInputValue(e.target.value)}
                                className="focus-visible:ring-0 
                            focus-visible:ring-offset-0 focus-visible:outline-none
                            focus:ring-0 focus:ring-offset-0"
                            />
                        </div>

                        <SubmitButton disabled={username !== inputValue} />
                    </form>
                </div>
            </div>
        </div>
    );
};

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
    const status = useFormStatus();
    return (
        <Button type="submit" disabled={disabled || status.pending} className="bg-rose-500 text-white">
            {status.pending ? <LoadingSpinner className="text-white w-6 h-6" /> : 'Delete'}
        </Button>
    );
};
