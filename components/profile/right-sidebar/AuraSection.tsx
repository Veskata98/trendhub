type AuraSectionProps = {
    createdAtDate: string;
};

export const AuraSection = ({ createdAtDate }: AuraSectionProps) => {
    return (
        <div className="flex flex-col items-center w-full gap-8">
            <div className="flex justify-around w-full">
                <div className="flex flex-col items-center">
                    <span>0</span>
                    <span>Post Aura</span>
                </div>
                <div className="flex flex-col items-center">
                    <span>0</span>
                    <span>Comment Aura</span>
                </div>
            </div>

            <div>
                <p>Member since: {createdAtDate}</p>
            </div>
        </div>
    );
};
