import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { useFormStatus } from 'react-dom';
import { addComment } from '@/actions/comment-actions/addComment';
import { toast } from 'sonner';
import { useRef } from 'react';

const SubmitCommentForm = ({ postId }: { postId: string }) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    return (
        <form
            ref={formRef}
            className="space-y-2"
            action={async (formData) => {
                const result = await addComment(formData, postId);
                if (result.success) {
                    toast.success('Comment created');
                    formRef.current?.reset();
                } else {
                    toast.error('Something went wrong');
                }
            }}
        >
            <Textarea
                placeholder="Comment here..."
                required
                name="content"
                className="focus-visible:ring-0 focus-visible:outline-none
                focus-visible:ring-offset-0 border-[1px] shadow-sm
                dark:border-zinc-500"
            />
            <div className="flex justify-end">
                <SubmitButton />
            </div>
        </form>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} className="bg-primary-500 text-white">
            Submit
        </Button>
    );
};

export default SubmitCommentForm;
