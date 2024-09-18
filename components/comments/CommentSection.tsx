import Comment from './Comment';

export default function CommentSection() {
    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-background">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {/* {initialComments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))} */}
        </div>
    );
}
