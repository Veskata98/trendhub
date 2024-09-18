import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowBigDown, ArrowBigUp, MessageSquare } from 'lucide-react';
import { ExtendedComment } from '@/types';

export default function Comment({ comment, depth = 0 }: { comment: ExtendedComment; depth?: number }) {
    const [showReplyInput, setShowReplyInput] = useState(false);

    return (
        <div className={`mt-4 ${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
            <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={comment.creator_name} />
                    <AvatarFallback>{comment.creator_name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{comment.creator_name}</span>
            </div>
            <p className="mt-2 text-sm">{comment.content}</p>
            <div className="mt-2 flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="px-1" onClick={() => {}}>
                    <ArrowBigUp className="h-4 w-4 text-muted-foreground" />
                </Button>
                <span className="text-sm font-bold">{0}</span>
                <Button variant="ghost" size="sm" className="px-1" onClick={() => {}}>
                    <ArrowBigDown className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowReplyInput(!showReplyInput)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reply
                </Button>
            </div>
            {showReplyInput && (
                <div className="mt-2">
                    <textarea className="w-full p-2 border rounded" placeholder="Write a reply..." />
                    <Button size="sm" className="mt-2">
                        Submit Reply
                    </Button>
                </div>
            )}
            {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
    );
}
