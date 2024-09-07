import { ServerUser } from '@/types';
import { auth, currentUser } from '@clerk/nextjs/server';

type ServerUserProps = {
    redirectToLogin?: boolean;
};

export default async function serverUser({ redirectToLogin = false }: ServerUserProps = {}) {
    const user = await currentUser();

    if (user) {
        return user as ServerUser;
    }

    if (redirectToLogin) {
        return auth().redirectToSignIn();
    }

    return null;
}
