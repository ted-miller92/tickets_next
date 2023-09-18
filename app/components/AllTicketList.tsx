"use client";

import useSWR from 'swr';

export default function TicketList({selectedDb}: any){
    
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error, isLoading} = useSWR(`/api/allTickets?selectedDb=${selectedDb}`, fetcher);

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    console.log(data);

    return (
        <div>
            <ul>
            {data.map((ticket: any, i: any) => (
                <li>{ticket.cust_name}</li>
            ))}
            </ul>
        </div>
    )
}