"use client";

import useSWR from 'swr';

export default function AllTicketList({selectedDb}: any){
    
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error, isLoading} = useSWR(`/api/allTickets?selectedDb=${selectedDb}`, fetcher);

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    return (
        <div>
            <ul>
            {data.map((ticket: any, key: any) => (
                <li key={key}>{ticket.cust_name}</li>
            ))}
            </ul>
        </div>
    )
}