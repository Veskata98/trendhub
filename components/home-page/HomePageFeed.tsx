import { getTrends } from '@/actions/trend-actions/getTrends';
import { PostFeed } from '../posts/PostFeed';
import { getPosts } from '@/actions/post-actions/getPosts';
import { getProfiles } from '@/actions/profile-actions/getProfiles';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

type HomePageFeedProps = {
    searchTerm: string;
    sort: 'hot' | 'new' | 'top';
};

export const HomePageFeed = async ({ searchTerm, sort }: HomePageFeedProps) => {
    const posts = await getPosts({ searchTerm, sort });

    if (searchTerm) {
        const trends = await getTrends(searchTerm);
        const profiles = await getProfiles(searchTerm);

        return (
            <div className="space-y-2 px-2 md:px-4 lg:px-8 py-2 w-full max-w-[750px] mx-auto">
                <p className="text-sm text-center">Search results</p>

                {/* Trends result */}
                <div>
                    <h2 className="font-semibold">Trends</h2>
                    <Separator className="w-full h-[1px] bg-zinc-600" />
                </div>
                {trends.length ? (
                    <>
                        <ul>
                            {trends.map((trend) => (
                                <li
                                    key={trend.name}
                                    className="hover:bg-zinc-100 rounded dark:hover:bg-zinc-600 flex justify-between items-center p-1 px-0 lg:px-2"
                                >
                                    <Link href={`/t/${trend.name}`} className="flex gap-2 items-center p-2 flex-1">
                                        <Avatar className="shadow w-8 h-8">
                                            <AvatarImage src={trend.image_url} alt="trend_image" />
                                        </Avatar>
                                        <span className="font-semibold text-sm">t/{trend.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="w-full flex justify-center items-center text-muted-foreground">
                        <p className="font-semibold text-sm md:text-base">
                            There are no trends matching this search criteria
                        </p>
                    </div>
                )}

                {/* Profiles result */}
                <div>
                    <h2 className="font-semibold">Profiles</h2>
                    <Separator className="w-full h-[1px] bg-zinc-600" />
                </div>
                {profiles.length ? (
                    <>
                        <ul>
                            {profiles.map((profile) => (
                                <li
                                    key={profile.username}
                                    className="hover:bg-zinc-100 rounded dark:hover:bg-zinc-600 flex justify-between items-center p-1 px-0 lg:px-2"
                                >
                                    <Link
                                        href={`/profile/${profile.username}`}
                                        className="flex gap-2 items-center p-2 flex-1"
                                    >
                                        <Avatar className="shadow w-8 h-8">
                                            {profile.image_url ? (
                                                <AvatarImage src={profile.image_url} alt="user_avatar" />
                                            ) : (
                                                <AvatarFallback>{profile.username.at(0)?.toUpperCase()}</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <span className="font-semibold text-sm">{profile.username}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="w-full flex justify-center items-center text-muted-foreground">
                        <p className="font-semibold text-sm md:text-base">
                            There are no profiles matching this search criteria
                        </p>
                    </div>
                )}

                <div>
                    <h2 className="font-semibold">Posts</h2>
                    <Separator className="w-full h-[1px] bg-zinc-600" />
                </div>
                <PostFeed pageType="home" initialPosts={posts} searchTerm={searchTerm} sort={sort} />
            </div>
        );
    }

    return <PostFeed pageType="home" initialPosts={posts} searchTerm={searchTerm} sort={sort} />;
};
