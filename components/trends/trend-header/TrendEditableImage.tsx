import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Camera, Check, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { imageUpload } from '@/lib/imageUpload';
import { toast } from 'sonner';
import { changeTrendImage } from '@/actions/trend-actions/changeTrendImage';

const TrendEditableImage = ({ imageUrl, trendName }: { imageUrl: string; trendName: string }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [newImage, setNewImage] = useState<File | null>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async () => {
        if (!newImage) return;

        let imageUrl: string | null = null;

        //Upload image to cdn and get the url
        const uploadCareResult = await imageUpload(newImage);

        if (uploadCareResult.error) {
            return toast.error(uploadCareResult.error);
        }

        imageUrl = uploadCareResult.imageUrl;

        if (imageUrl) {
            await changeTrendImage(imageUrl, trendName);
            toast.success('Trend image successfully changed');
        }
        setNewImage(null);
    };

    return (
        <div
            className={cn('relative', showEdit && 'cursor-pointer')}
            onMouseEnter={() => {
                if (!newImage) setShowEdit(true);
            }}
            onMouseLeave={() => {
                if (!newImage) setShowEdit(false);
            }}
            onClick={() => {
                if (!newImage) handleFileInput();
            }}
        >
            <input
                ref={fileInputRef}
                type="file"
                name="avatar"
                accept=".png, .jpg, .jpeg, .avif, .webp"
                onChange={(e) => setNewImage(e.target.files?.item(0))}
                className="hidden"
            />
            {newImage ? (
                <div className="relative m-auto">
                    <Avatar className="w-16 h-16 shadow">
                        <AvatarImage src={URL.createObjectURL(newImage)} alt="trend_avatar" />
                    </Avatar>
                    <Button
                        onClick={handleImageChange}
                        className="shadow bg-emerald-500 absolute text-zinc-200 rounded-full 
                                p-0 h-7 w-7 -bottom-1 -left-1"
                    >
                        <Check width={24} height={24} />
                    </Button>
                    <Button
                        onClick={() => setNewImage(null)}
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
                            'w-16 h-16 border-zinc-500 border-[1px] border-opacity-20 shadow',
                            showEdit && 'opacity-50'
                        )}
                    >
                        <AvatarImage src={imageUrl} alt="trend_avatar" />
                    </Avatar>

                    {showEdit && (
                        <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                </>
            )}
        </div>
    );
};

export default TrendEditableImage;
