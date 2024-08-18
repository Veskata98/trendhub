import { X } from 'lucide-react';
import { MouseEvent, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { useToast } from '../../ui/use-toast';
import Image from 'next/image';
import { createPost } from '@/actions/createPost';

type CreatePostModalProps = {
    isOpen: boolean;
    trendName: string;
    onClose: () => void;
};

export const CreatePostModal = ({ isOpen, trendName, onClose }: CreatePostModalProps) => {
    const { toast } = useToast();
    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm w-screen h-screen"
            onClick={onBackdropClick}
        >
            <div className="relative bg-zinc-500 mt-32 md:mt-0 mx-8 p-8 w-full md:w-2/4 lg:w-1/3 max-w-[460px] rounded-lg shadow-sm flex flex-col items-center">
                <X className="absolute top-2 right-2 cursor-pointer" onClick={() => onClose()} />
                {/* <div className="w-40 h-40 relative">
                    <Image src={user.image || '/no-avatar.png'} alt="" fill className="rounded-md shadow p-2" />
                </div> */}
                <form
                    action={async (formData) => {
                        const error = await createPost(formData, trendName);

                        if (!error) {
                            return onClose();
                        }

                        const errors = Object.values(error)
                            .map((e) => e)
                            .join('\n');

                        toast({
                            className: 'bg-rose-500 text-white',
                            duration: 3000,
                            title: 'Error creating post',
                            description: errors,
                        });
                    }}
                >
                    <h4 className="font-semibold mb-4">Create Post</h4>
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="title" />

                    <Label htmlFor="postImage">Image (*optional)</Label>
                    <Input type="file" accept=".png, .jpg, .gif, .jpeg, .avif, .webp" name="postImage" />

                    <Label htmlFor="description">Description (*optional)</Label>
                    <Textarea name="description" />

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};
