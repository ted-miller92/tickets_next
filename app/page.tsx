// import LoginForm from "@/components/LoginForm";
"use client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
// import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log("session.user", session?.user);
    return <button onClick={() => signOut()}>Sign Out</button>
  }

  return (
    <main>
      <button onClick={() => signIn()}>Sign In</button>
      <a href="/restricted">Restricted page</a>
    </main>
    
  )
}
