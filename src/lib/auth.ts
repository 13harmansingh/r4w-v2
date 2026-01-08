import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authConfig: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend({
            from: process.env.EMAIL_FROM || 'ЯДШ <no-reply@yadsh.com>',
        }),
    ],
    pages: {
        signIn: '/account/login',
        verifyRequest: '/account/verify',
        error: '/account/error',
    },
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    session: {
        strategy: 'database',
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
