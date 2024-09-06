import { UserPen, X } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { createTrend } from '@/actions/trend-actions/createTrend';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useModal } from '@/hooks/useModalStore';
import { imageUpload } from '@/lib/imageUpload';
import { Avatar, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

export const CreateTrendModal = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [image, setImage] = useState<File | null>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { isOpen, onClose, type } = useModal();

    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setImage(null);
        }
    }, [isOpen]);

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

    if (!isOpen || type !== 'createTrend') {
        return null;
    }

    const formAction = async (formData: FormData) => {
        let imageUrl: string | null = null;

        //Upload image to cdn and get the url
        if (image) {
            const uploadCareResult = await imageUpload(image);

            if (uploadCareResult.error) {
                return toast.error(uploadCareResult.error);
            }

            imageUrl = uploadCareResult.imageUrl;
        }

        const error = await createTrend(formData, imageUrl);

        if (!error) {
            onClose();
            toast.success('Trend was created successfully');
            return;
        }

        Object.values(error).forEach((error) => toast.error(error));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm w-screen h-screen"
            onClick={onBackdropClick}
        >
            <div className="relative bg-zinc-400 dark:bg-zinc-600 mt-32 md:mt-0 mx-8 p-8 w-full md:w-2/3 xl:w-3/5 2xl:w-2/5 rounded-lg shadow-sm flex flex-col items-center">
                <X className="absolute top-2 right-2 cursor-pointer text-zinc-200 rounded" onClick={() => onClose()} />
                <div className="flex flex-col-reverse lg:flex-row justify-around w-full gap-6">
                    <form
                        action={formAction}
                        className="flex flex-col w-full lg:w-2/3 xl:w-1/2 space-y-4 justify-center"
                    >
                        <div className="relative flex items-center">
                            <Input
                                className="ml-[28px] focus-visible:ring-0 focus-visible:outline-none
                                focus-visible:ring-offset-0"
                                type="text"
                                name="name"
                                required
                            />
                            <span className="absolute top-[6px] left-2 select-none font-semibold text-lg">t/</span>
                        </div>
                        <div>
                            <Label htmlFor="description" className="font-semibold">
                                Trend Info
                            </Label>
                            <Textarea
                                className="focus-visible:ring-0 focus-visible:outline-none
                                focus-visible:ring-offset-0"
                                name="description"
                                rows={5}
                            />
                        </div>

                        <Button type="submit" className="bg-primary-500">
                            Submit
                        </Button>
                    </form>
                    <div className="flex flex-col gap-4 items-center">
                        <p className="font-semibold text-sm">Trend Avatar</p>

                        {image ? (
                            <div className="relative m-auto">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={URL.createObjectURL(image)} alt="trend_avatar" />
                                </Avatar>
                                <Button
                                    onClick={() => setImage(null)}
                                    className="shadow bg-rose-500 absolute text-zinc-200 rounded-full 
                                p-0 h-7 w-7 -top-1 -right-1"
                                >
                                    <X width={24} height={24} />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="postImage"
                                    accept=".png, .jpg, .gif, .jpeg, .avif, .webp"
                                    onChange={(e) => setImage(e.target.files?.item(0))}
                                    className="hidden"
                                />
                                <Avatar
                                    className={cn('h-24 w-24 relative cursor-pointer shadow', showEdit && 'opacity-50')}
                                    onMouseEnter={() => setShowEdit(true)}
                                    onMouseLeave={() => setShowEdit(false)}
                                    onClick={handleAvatarClick}
                                >
                                    <AvatarImage src="/default-trend-logo.png" alt="trend_avatar" />
                                    {showEdit && (
                                        <UserPen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                    )}
                                </Avatar>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
