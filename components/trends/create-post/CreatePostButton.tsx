import { Button } from '../../ui/button';
import { useModal } from '@/hooks/useModalStore';

export const CreatePostButton = ({ trendName }: { trendName: string }) => {
    const { onOpen } = useModal();
    return (
        <Button
            onClick={() => onOpen('createPost', { trendName })}
            className="font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-600"
        >
            Add post
        </Button>
    );
};
