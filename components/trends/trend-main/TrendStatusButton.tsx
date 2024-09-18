import { UserStatus } from '@/types';
import { CreatePostButton } from '../trend-header/CreatePostButton';
import { Button } from '@/components/ui/button';
import { leaveTrend } from '@/actions/trend-actions/leaveTrend';
import { joinTrend } from '@/actions/trend-actions/joinTrend';
import { toast } from 'sonner';

const TrendStatusButton = ({ userStatus, trendName }: { userStatus: UserStatus; trendName: string }) => {
    return (
        <div className="flex gap-1 items-center">
            {(userStatus === 'owner' || userStatus === 'member') && <CreatePostButton trendName={trendName} />}

            {userStatus === 'member' && (
                <Button
                    className="font-semibold text-rose-500 hover:bg-rose-500/20"
                    onClick={async () => {
                        const res = await leaveTrend(trendName);
                        if (res.success) {
                            toast.error(`You left trend "${trendName}"`);
                        }
                    }}
                >
                    Leave
                </Button>
            )}

            {userStatus === 'nonMember' && (
                <Button
                    className="font-semibold text-emerald-500 hover:bg-emerald-500/20"
                    onClick={async () => {
                        const res = await joinTrend(trendName);
                        if (res.success) {
                            toast.success(`Successfully joined trend "${trendName}"`);
                        }
                    }}
                >
                    Join
                </Button>
            )}
        </div>
    );
};

export default TrendStatusButton;
