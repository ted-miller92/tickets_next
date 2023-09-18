"use client"

import { getServerSession } from "next-auth";
import { nextauthOptions } from "../lib/nextauthOptions";
import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ActiveTicketList from "../components/ActiveTicketList";
import AllTicketList from "../components/AllTicketList";

type Item = {
    item_name: string
    price: number
    mods: string
}

type Ticket = {
    cust_name: string
    date: string
    time: string
    ticket_items: Array<Item>
    promo_code: string
    active: boolean
}

export default function Tickets() {
    // get the session
    const { data: session } = useSession();

    // state vars
    const [activeTickets, setActiveTickets] = useState<Ticket[]>([]);
    const [allTickets, setAllTickets] = useState<Ticket[]>([]);

    // redirect to signin if there is no session.
    if (!session?.user) {
        const url = new URL("/api/auth/signin", "http://localhost:3000");
        redirect(url.toString());
    }

    const selectedDb: string = session.user.selectedDb;

    const loadTickets = async () => {
        const res = await fetch(`/api/tickets?selectedDb=${selectedDb}`, {
            method: "GET",});
        const data = await res.json();
        const ticketArray: Ticket[] = Object.values(data);
        setAllTickets(ticketArray);
    }

    useEffect(() => {        
        loadTickets()
    }, []);

    // display the page
    return (
        <div>
            <h1>Welcome to the Tickets Page, {session?.user?.name}</h1>
            <ActiveTicketList allTickets={allTickets}/>
            {/* <AllTicketList allTickets={allTickets}/> */}
        </div>
    );
}