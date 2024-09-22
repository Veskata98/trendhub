import { UserStatus } from "@/types";
import { CreatePostButton } from "../trend-header/CreatePostButton";
import { Button } from "@/components/ui/button";
import { joinTrend } from "@/actions/trend-actions/joinTrend";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModalStore";

const TrendStatusButton = ({
    userStatus,
    trendName,
}: {
    userStatus: UserStatus;
    trendName: string;
}) => {
    const { onOpen } = useModal();
    return (
        <div className="flex items-center gap-1">
            {(userStatus === "owner" || userStatus === "member") && (
                <CreatePostButton trendName={trendName} />
            )}

            {userStatus === "member" && (
                <Button
                    className="font-semibold text-rose-500 hover:bg-rose-500/20"
                    onClick={() => onOpen("leaveTrend", { trendName })}
                >
                    Leave
                </Button>
            )}

            {userStatus === "nonMember" && (
                <Button
                    className="font-semibold text-emerald-500 hover:bg-emerald-500/20"
                    onClick={async () => {
                        const res = await joinTrend(trendName);
                        if (res.success) {
                            toast.success(
                                `Successfully joined trend "${trendName}"`,
                            );
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
