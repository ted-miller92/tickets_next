import React from 'react';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navigation() {
    const { data: session } = useSession();

    if (session && session.user) {

    }

    return (
        <nav className="flex p-2 text-lg">
            <div className="flex w-2/12 justify-between">
                <Link href="/">Home</Link>
                <Link href="/activeTickets">Active Tickets</Link>
                <Link href="/allTickets">All Tickets</Link>
                <Link href="/tickets">Tickets</Link>
                <Link href="/items">Items</Link>

            </div>
            <div className="flex grow justify-end">
                {session
                    ? <button className="" onClick={() => signOut()}>Sign Out</button>
                    : <button className="" onClick={() => signIn()}>Sign In</button>
                }
            </div>
        </nav>
    );
}