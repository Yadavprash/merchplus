'use client'; // Mark this as a Client Component

import { signIn, signOut } from 'next-auth/react';

export default function SessionActions({ isSignedIn }: { isSignedIn: boolean }) {
  if (isSignedIn) {
    return (
      <button onClick={() => signOut()}>Sign out</button>
    );
  }

  return (
    <div>
      <button
        onClick={async () => {
          await signIn('google');
        }}
      >
        Login with Google
      </button>

      <br />

      <button
        onClick={async () => {
          await signIn('guest', { redirect: true });
        }}
      >
        Guest Login
      </button>
    </div>
  );
}
