import { X } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';
import { createPost } from '@/actions/post-actions/createPost';
import { imageUpload } from '@/lib/imageUpload';
import { useModal } from '@/hooks/useModalStore';

export const CreatePostModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { toast } = useToast();

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
                return toast({
                    className: 'bg-emerald-500 text-white',
                    duration: 3000,
                    title: uploadCareResult.error,
                });
            }

            imageUrl = uploadCareResult.imageUrl;
        }

        const error = await createPost(formData, trendName, imageUrl);

        if (!error) {
            onClose();
            toast({
                className: 'bg-emerald-500 text-white',
                duration: 3000,
                title: 'Post was created successfully',
            });
            return;
        }

        // const errors = Object.values(error)
        //     .map((e) => e)
        //     .join('\n');

        // toast({
        //     className: 'bg-rose-500 text-white',
        //     duration: 3000,
        //     title: 'Error creating post',
        //     description: errors,
        // });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm w-screen h-screen"
            onClick={onBackdropClick}
        >
            <div className="relative bg-zinc-400 dark:bg-zinc-600 mt-32 md:mt-0 mx-8 p-8 w-full md:w-2/3 xl:w-3/5 2xl:w-2/5 rounded-lg shadow-sm flex flex-col items-center">
                <X className="absolute top-2 right-2 cursor-pointer text-zinc-200 rounded" onClick={() => onClose()} />

                <h4 className="font-semibold mb-4">Create Post</h4>

                <div className="flex flex-col-reverse lg:flex-row justify-around w-full gap-6">
                    <form
                        action={formAction}
                        className="flex flex-col w-full lg:w-2/3 xl:w-1/2 space-y-4 justify-center"
                    >
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" name="title" required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description (*optional)</Label>
                            <Textarea name="description" rows={5} />
                        </div>

                        <Button type="submit" className="bg-primary-500">
                            Submit
                        </Button>
                    </form>
                    {image ? (
                        <div className="relative m-auto">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                width={256}
                                height={256}
                                className="rounded"
                            />
                            <Button
                                onClick={() => setImage(null)}
                                className="shadow bg-rose-500 absolute text-zinc-200 rounded-full p-0 h-7 w-7 -top-3 -right-3"
                            >
                                <X width={24} height={24} />
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Label htmlFor="postImage">Image (*optional)</Label>
                            <Input
                                className="cursor-pointer"
                                type="file"
                                name="postImage"
                                accept=".png, .jpg, .gif, .jpeg, .avif, .webp"
                                onChange={(e) => setImage(e.target.files?.item(0))}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
