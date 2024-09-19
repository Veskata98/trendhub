import Comment from './Comment';
import { ExtendedComment } from '@/types';

export default function CommentSection({ comments }: { comments: ExtendedComment[] }) {
    return (
        <div className="w-full max-w-2xl px-4 bg-background overflow-x-scroll">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {comments.length ? (
                comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            ) : (
                <p className="text-muted-foreground">There are no comments.</p>
            )}
        </div>
    );
}
