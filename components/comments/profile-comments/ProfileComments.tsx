import getComments from "@/actions/comment-actions/getComments";
import ProfileCommentCard from "./ProfileCommentCard";

const ProfileComments = async ({ username }: { username: string }) => {
    const comments = await getComments(username);

    return (
        <div className="scroll-hidden mx-auto w-full space-y-2 overflow-x-scroll bg-background">
            {comments.length ? (
                comments.map((comment) => (
                    <ProfileCommentCard key={comment.id} comment={comment} />
                ))
            ) : (
                <p className="text-muted-foreground">There are no comments.</p>
            )}
        </div>
    );
};

export default ProfileComments;
