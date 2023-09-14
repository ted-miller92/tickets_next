import React from 'react';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navigation() {
    const { data: session } = useSession();

    if (session && session.user) {

    }

    const primaryLinkMap: any = [
        {href : "/", name: "Home"},
        {href : "/tickets", name: "Tickets"},
        {href : "/items", name : "Items"}
    ]

    return (
        <nav className="flex p-2 text-lg">
            <div className="flex w-2/12 justify-between">
                {primaryLinkMap.map((link: any) => 
                    <Link
                        className=""
                        href={link.href}
                    >{link.name}</Link>
                )}
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