import { Button } from '@/components/ui/button';

const LIST_ITEMS = ['Overall', 'Posts', 'Comments', 'Upvotes', 'Downvotes'];

export const ProfileMainSection = () => {
    return (
        <div className="p-2 py-4">
            <div>
                <ul className="flex gap-4 border-y-[1px] border-primary-500 justify-center">
                    {LIST_ITEMS.map((x, i) => (
                        <li key={i}>
                            <Button>{x}</Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
