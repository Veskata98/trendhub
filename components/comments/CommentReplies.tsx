import Comment from './Comment';
import { ExtendedComment } from '@/types';

type CommentRepliesProps = {
    replies: ExtendedComment[];
    depth: number;
};

const CommentReplies = ({ replies, depth }: CommentRepliesProps) => {
    return (
        <div className="mt-4 space-y-4">
            {replies.map((reply) => (
                <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
    );
};

export default CommentReplies;
