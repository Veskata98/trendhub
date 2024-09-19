import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowBigDown, ArrowBigUp, MessageSquare } from 'lucide-react';
import { ExtendedComment } from '@/types';
import { addComment } from '@/actions/comment-actions/addComment';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';
import { useUser } from '@clerk/nextjs';
import { Textarea } from '../ui/textarea';

export default function Comment({ comment, depth = 0 }: { comment: ExtendedComment; depth?: number }) {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const { user } = useUser();

    return (
        <div className={`mt-4 ${depth > 0 ? 'ml-6 border-l-[1px] border-gray-200 dark:border-gray-500 pl-4' : ''}`}>
            <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6 shadow">
                    <AvatarImage src={comment.creator?.image_url} alt={comment.creator_name} />
                    <AvatarFallback>{comment.creator_name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{comment.creator_name}</span>
            </div>
            <p className="mt-2 text-sm">{comment.content}</p>
            <div className="mt-2 flex items-center space-x-2">
                <Button disabled={!!!user} variant="ghost" size="sm" className="px-1" onClick={() => {}}>
                    <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
                </Button>
                <span className="text-sm font-bold">{0}</span>
                <Button disabled={!!!user} variant="ghost" size="sm" className="px-1" onClick={() => {}}>
                    <ArrowBigDown className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button disabled={!!!user} variant="ghost" size="sm" onClick={() => setShowReplyInput(!showReplyInput)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reply
                </Button>
            </div>
            {showReplyInput && user && (
                <div className="mt-2">
                    <form
                        ref={formRef}
                        className="space-y-2"
                        action={async (formData) => {
                            const result = await addComment(formData, comment.postId, comment.id); // Pass comment.id as parentId
                            if (result.success) {
                                toast.success('Comment created');
                                formRef.current?.reset();
                                setShowReplyInput(false);
                            } else {
                                toast.error('Something went wrong');
                            }
                        }}
                    >
                        <Textarea
                            placeholder="Write a reply..."
                            required
                            name="content"
                            className="focus-visible:ring-0 focus-visible:outline-none
                            focus-visible:ring-offset-0 border-none shadow-sm
                            dark:bg-zinc-900/50 w-full px-4 py-2"
                        />
                        <div className="flex justify-start">
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            )}

            {/* Render replies recursively */}
            {comment.replies?.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                        <Comment key={reply.id} comment={reply} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="bg-primary-500 text-white">
            Reply
        </Button>
    );
};
