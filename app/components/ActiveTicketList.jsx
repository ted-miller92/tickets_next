"use client";

import useSWR from 'swr';

export default function TicketList({allTickets}){
    // let activeTicketsArray = [...allTickets].filter(function (ticket) {
    //     return ticket.active;
    // });

    const selectedDb = "tickets";
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const {data, error, isLoading} = useSWR(`/api/tickets?selectedDb=${selectedDb}`, fetcher);

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    return (
        <div>
            {typeof(data)}
        </div>
    )
    // return (
    //     <div>
    //         <h2>Active Tickets:</h2>

    //         <ul>
    //             {/* {activeTicketsArray.map((ticket: any, i: any) => (
    //                     <li>{ticket.cust_name}</li>
    //             ))} */}
    //         </ul>
    //     </div>
        
    // );
}

function Tickets(selectedDb) {
    const {data, error, isLoading} = useSWR(`/api/tickets?selectedDb=${selectedDb}`);

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    return <div>{data}</div>
}