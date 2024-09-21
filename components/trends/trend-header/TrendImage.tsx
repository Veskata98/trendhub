import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const TrendImage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <Avatar className="h-16 w-16 shadow">
            <AvatarImage src={imageUrl} alt="trend_image" />
        </Avatar>
    );
};

export default TrendImage;
