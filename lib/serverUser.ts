import { ServerUser } from '@/types';
import { currentUser } from '@clerk/nextjs/server';

export default async function serverUser() {
    try {
        const user = await currentUser();

        if (user) {
            return user as ServerUser;
        }
    } catch (error) {
        return null;
    }
}
