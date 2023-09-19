"use client"

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import ActiveTicketList from "../components/ActiveTicketList";

export default function ActiveTickets() {
    // get the session
    const { data: session } = useSession();

    // redirect to signin if there is no session.
    if (!session?.user) {
        const url = new URL("/api/auth/signin", "http://localhost:3000");
        redirect(url.toString());
    }

    // get user's associated database
    const selectedDb: string = session.user.selectedDb;

    // display the page
    return (
        <div>
            <h1>Welcome to the Tickets Page, {session?.user?.name}</h1>
            <ActiveTicketList selectedDb={selectedDb} />
        </div>
    );
}