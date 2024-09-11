import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const TrendImage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <Avatar className="w-16 h-16 shadow">
            <AvatarImage src={imageUrl} alt="trend_image" />
        </Avatar>
    );
};

export default TrendImage;
