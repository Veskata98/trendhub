import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full">
            <Loader2 className="w-10 h-10 text-zinc-500 animate-spin" />
        </div>
    );
}
