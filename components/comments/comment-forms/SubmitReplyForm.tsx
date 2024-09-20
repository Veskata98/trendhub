import { addComment } from '@/actions/comment-actions/addComment';
import { useRef } from 'react';
import { toast } from 'sonner';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { useFormStatus } from 'react-dom';
import { ExtendedComment } from '@/types';

type SubmitReplyFormProps = {
    comment: ExtendedComment;
    replyClose: () => void;
};

const SubmitReplyForm = ({ comment, replyClose }: SubmitReplyFormProps) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    return (
        <div className="mt-2">
            <form
                ref={formRef}
                className="space-y-2"
                action={async (formData) => {
                    const result = await addComment(formData, comment.postId, comment.id); // Pass comment.id as parentId
                    if (result.success) {
                        toast.success('Comment created');
                        formRef.current?.reset();
                        replyClose();
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
            focus-visible:ring-offset-0 border-none shadow
            dark:bg-zinc-900/50 w-full px-4 py-2"
                />
                <div className="flex justify-start">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="bg-primary-500 text-white">
            Reply
        </Button>
    );
};

export default SubmitReplyForm;
