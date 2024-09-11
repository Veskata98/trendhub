import { Plus, X } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import Image from 'next/image';
import { createPost } from '@/actions/post-actions/createPost';
import { imageUpload } from '@/lib/imageUpload';
import { useModal } from '@/hooks/useModalStore';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';
import LoadingSpinner from '../other/LoadingSpinner';

export const CreatePostModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { trendName } = data;

    const [image, setImage] = useState<File | null>();

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

    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || type !== 'createPost' || !trendName) {
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

        const error = await createPost(formData, trendName, imageUrl);

        if (!error) {
            onClose();
            toast.success('Post was created successfully');
            return;
        }

        Object.values(error).forEach((error) => toast.error(error));
    };

    const imageInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm w-screen h-screen"
            onClick={onBackdropClick}
        >
            <div
                className="relative backdrop-blur-lg bg-white bg-opacity-30 dark:bg-opacity-40 dark:bg-zinc-600 
            mt-16 md:mt-20 xl:mt-32 mx-4 sm:mx-8 p-8 px-2 sm:px-8 w-full md:w-2/3 xl:w-3/5 2xl:w-2/5 
            rounded-lg shadow-sm flex flex-col items-center"
            >
                <X className="absolute top-2 right-2 cursor-pointer text-zinc-200 rounded" onClick={() => onClose()} />

                <h4 className="font-semibold mb-4 text-white">Create Post</h4>

                <div className="flex flex-col-reverse lg:flex-row justify-evenly w-full gap-6">
                    <form
                        action={formAction}
                        className="flex flex-col w-full lg:w-2/3 xl:w-1/2 space-y-4 justify-center lg:h-[300px]"
                    >
                        <div>
                            <Label className="text-white" htmlFor="title">
                                <sup>*</sup>Title
                            </Label>
                            <Input type="text" name="title" required />
                        </div>
                        <div>
                            <Label className="text-white" htmlFor="description">
                                Description
                            </Label>
                            <Textarea name="description" rows={5} />
                        </div>

                        <SubmitButton />
                    </form>
                    {image ? (
                        <div className="relative m-auto">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                width={256}
                                height={256}
                                className="rounded max-w-[256]"
                            />
                            <Button
                                onClick={() => setImage(null)}
                                className="shadow bg-rose-500 absolute text-zinc-200 rounded-full p-0 h-7 w-7 -top-3 -right-3"
                            >
                                <X width={24} height={24} />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 items-center my-auto">
                            <>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="trendImage"
                                    accept=".png, .jpg, .gif, .jpeg, .avif, .webp"
                                    onChange={(e) => setImage(e.target.files?.item(0))}
                                    className="hidden"
                                />
                                <div
                                    className="rounded-full p-8 cursor-pointer bg-zinc-300 
                                    hover:bg-zinc-200 dark:bg-zinc-500 dark:hover:bg-zinc-400 transition-all"
                                    onClick={imageInputClick}
                                >
                                    <Plus
                                        className="h-8 w-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 text-white"
                                        height={44}
                                        width={44}
                                    />
                                </div>
                            </>
                            <p className="font-semibold text-sm text-white">Image</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SubmitButton = () => {
    const status = useFormStatus();
    return (
        <Button type="submit" disabled={status.pending} className="bg-primary-500 text-white">
            {status.pending ? <LoadingSpinner className="text-white w-6 h-6" /> : 'Create'}
        </Button>
    );
};
