import { ExtendedComment } from '@/types';

export function nestComments(comments: ExtendedComment[]) {
    const commentMap: any = {};

    // Create a map of all comments by their id
    comments.forEach((comment) => {
        comment.replies = []; // Initialize the replies array for each comment
        commentMap[comment.id] = comment;
    });

    const nestedComments: ExtendedComment[] = [];

    // Loop over the comments and nest them
    comments.forEach((comment) => {
        if (comment.parentId) {
            // If the comment has a parent, push it into the parent's replies array
            commentMap[comment.parentId].replies.push(comment);
        } else {
            // If the comment has no parent, it is a top-level comment
            nestedComments.push(comment);
        }
    });

    return nestedComments;
}
