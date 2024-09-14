"use client"
import { signIn, signOut, useSession } from 'next-auth/react';

export default function() {
    const { data: session } = useSession();

    if(session){
        return <div>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
    }

    return <div>
        <button onClick={async () => {
            await signIn("google");
        }}>Login with google</button>

        <br />
        <button onClick={async () => {
            await signIn("github");
        }}>Login with Github</button>
        <br />
        <button onClick={async () => {
            const res = await signIn("guest", {
                redirect: true,
            });
            console.log(res);
        }}>Guest Login</button>
        
    </div>
}