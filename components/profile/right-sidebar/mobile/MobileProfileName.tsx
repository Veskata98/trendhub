export const MobileProfileName = ({ username }: { username: string }) => {
    return (
        <div className="relative cursor-pointer select-none flex flex-col items-center">
            <p className="font-semibold">{username}</p>
            <span className="text-xs">profile name</span>
        </div>
    );
};
