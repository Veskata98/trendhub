import { X } from "lucide-react";
import { MouseEvent, useEffect } from "react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../other/LoadingSpinner";
import { leaveTrend } from "@/actions/trend-actions/leaveTrend";

export default function LeaveTrendModal() {
    const { isOpen, onClose, type, data } = useModal();
    const { trendName } = data;

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || type !== "leaveTrend" || !trendName) {
        return null;
    }

    const formAction = async () => {
        const res = await leaveTrend(trendName);
        if (res.success) {
            toast.error(`You left trend "${trendName}"`);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex h-screen w-screen items-start justify-center bg-black bg-opacity-60 backdrop-blur-sm md:items-center"
            onClick={onBackdropClick}
        >
            <div className="relative mx-4 mt-32 flex w-full flex-col items-center space-y-4 rounded-lg bg-white bg-opacity-30 p-8 px-2 shadow-sm backdrop-blur-lg dark:bg-zinc-600 dark:bg-opacity-40 sm:mx-8 sm:px-8 md:mt-0 md:w-2/3 xl:w-3/5 2xl:w-2/5">
                <X
                    className="absolute right-2 top-2 cursor-pointer rounded text-zinc-200"
                    onClick={onClose}
                />

                <h4 className="!mt-0 font-semibold text-white">Leave Trend</h4>

                <div className="flex w-full flex-col items-center space-y-8">
                    <p className="text-center text-white lg:text-left">
                        You are about to leave trend &quot;
                        <strong>{trendName}</strong>&quot;? Please confirm this
                        action.
                    </p>
                    <form
                        action={formAction}
                        className="flex w-full flex-col justify-center space-y-4 lg:w-2/3 xl:w-1/2"
                    >
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </div>
    );
}

const SubmitButton = () => {
    const status = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={status.pending}
            className="bg-rose-500 text-white"
        >
            {status.pending ? (
                <LoadingSpinner className="h-6 w-6 text-white" />
            ) : (
                "Confirm"
            )}
        </Button>
    );
};
