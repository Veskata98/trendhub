import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export const TrendName = ({ trendName }: { trendName: string }) => {
    const trendUrl = `${process.env.NEXT_PUBLIC_BASE_URL!}/t/${trendName}`;

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(trendUrl);
        toast.success('Trend copied to clipboard');
    };

    return (
        <div className="relative cursor-pointer select-none" onClick={handleCopyClick}>
            <span className="text-xl font-semibold">t/{trendName}</span>
            <Copy className="absolute top-0 -right-5" width={16} height={16} />
        </div>
    );
};
