"use client";

import useSWR from 'swr';
import Ticket from './Ticket';

export default function TicketList({selectedDb}: any){
    
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error, isLoading} = useSWR(
        `/api/activeTickets?selectedDb=${selectedDb}`, 
        fetcher,
        { refreshInterval: 1000}
        );

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    console.log(data);

    return (
        <div>
            <ul>
            {data.map((ticket: any, i: any) => (
                <Ticket ticket={ticket}/>
            ))}
            </ul>
        </div>
    )
}