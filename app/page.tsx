import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Home() {
    const user = await getKindeServerSession().getUser();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 dark">
            <button className="text-primary-500">Click</button>
        </main>
    );
}
