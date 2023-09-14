"use client"

import { getServerSession } from "next-auth";
import { nextauthOptions } from "../lib/nextauthOptions";
import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";
import { useSession } from "next-auth/react";

export default async function Tickets() {
    // get the session
    const { data: session } = useSession();

    // redirect to signin if there is no session.
    if (!session?.user) {
        const url = new URL("/api/auth/signin", "http://localhost:3000");
        redirect(url.toString());
    }

    // display the page
    return (
        <div>
            <h1>Welcome to the Tickets Page, {session?.user?.name}</h1>
        </div>
    );
}