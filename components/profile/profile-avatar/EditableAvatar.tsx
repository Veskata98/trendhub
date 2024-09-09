import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, UserPen, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { imageUpload } from '@/lib/imageUpload';
import { toast } from 'sonner';
import { changeAvatar } from '@/actions/profile-actions/changeAvatar';

export const EditableAvatar = ({ src, username }: { src: string; username: string }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [newAvatar, setNewAvatar] = useState<File | null>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async () => {
        if (!newAvatar) return;

        let imageUrl: string | null = null;

        //Upload image to cdn and get the url
        const uploadCareResult = await imageUpload(newAvatar);

        if (uploadCareResult.error) {
            return toast.error(uploadCareResult.error);
        }

        imageUrl = uploadCareResult.imageUrl;

        if (imageUrl) {
            await changeAvatar(username, imageUrl);
            toast.success('Avatar successfully changed');
        }
        setNewAvatar(null);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn('relative', showEdit && 'cursor-pointer')}
                        onMouseEnter={() => {
                            if (!newAvatar) setShowEdit(true);
                        }}
                        onMouseLeave={() => {
                            if (!newAvatar) setShowEdit(false);
                        }}
                        onClick={() => {
                            if (!newAvatar) handleFileInput();
                        }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="avatar"
                            accept=".png, .jpg, .jpeg, .avif, .webp"
                            onChange={(e) => setNewAvatar(e.target.files?.item(0))}
                            className="hidden"
                        />
                        {newAvatar ? (
                            <div className="relative m-auto">
                                <Avatar className="h-[100px] w-[100px] shadow">
                                    <AvatarImage src={URL.createObjectURL(newAvatar)} alt="trend_avatar" />
                                </Avatar>
                                <Button
                                    onClick={handleAvatarChange}
                                    className="shadow bg-emerald-500 absolute text-zinc-200 rounded-full 
                                p-0 h-7 w-7 -bottom-1 -left-1"
                                >
                                    <Check width={24} height={24} />
                                </Button>
                                <Button
                                    onClick={() => setNewAvatar(null)}
                                    className="shadow bg-rose-500 absolute text-zinc-200 rounded-full 
                                p-0 h-7 w-7 -bottom-1 -right-1"
                                >
                                    <X width={24} height={24} />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Avatar
                                    className={cn(
                                        'h-[100px] w-[100px] border-zinc-500 border-[1px] border-opacity-20 shadow',
                                        showEdit && 'opacity-50'
                                    )}
                                >
                                    {src ? (
                                        <AvatarImage src={src} alt="trend_avatar" />
                                    ) : (
                                        <AvatarFallback className="text-6xl">
                                            {username.at(0)?.toUpperCase()}
                                        </AvatarFallback>
                                    )}
                                </Avatar>

                                {showEdit && (
                                    <UserPen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                )}
                            </>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white text-zinc-900">
                    {!newAvatar ? <p>Change Avatar</p> : <p>Save Avatar</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
