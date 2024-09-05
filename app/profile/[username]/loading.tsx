// loading.tsx
import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full mt-32">
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            {/* <span className="text-xl font-semibold text-gray-700">Loading...</span> */}
        </div>
    );
}
