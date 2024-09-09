import { ProfileRightSidebar } from '../ProfileRightSidebar';

type MobileRightSidebarProps = {
    username: string;
};

export const MobileRightSidebar = ({ username }: MobileRightSidebarProps) => {
    return <ProfileRightSidebar username={username} smallDisplay={true} />;
};
