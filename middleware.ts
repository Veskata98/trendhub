import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const user = await getKindeServerSession().getUser();

    if (user && !user.username) {
        return NextResponse.redirect(new URL('/profile/set-username', req.url));
    }
}

export const config = {
    matcher: ['/'],
};
