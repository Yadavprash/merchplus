"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { persistor } from '@/store/store';

export default function Home() {
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        await persistor.purge();
        
        await signOut();
    };

    if (session) {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
                <button onClick={handleSignOut}>Sign out</button>
            </div>
        );
    }

    return (
        <div>
            {JSON.stringify(session)}
            <button onClick={async () => {
                await signIn("google");
            }}>Login with Google</button>

            <br />

            <button onClick={async () => {
                const res = await signIn("guest", {
                    redirect: true,
                });
            }}>Guest Login</button>
        </div>
    );
}