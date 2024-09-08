// loading.tsx
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ className }: { className?: string }) {
    return <Loader2 className={cn('w-10 h-10 text-zinc-500 animate-spin', className)} />;
}
