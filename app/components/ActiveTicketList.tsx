"use client";

import useSWR from 'swr';
import { mutate } from 'swr';
import ActiveTicket from './ActiveTicket';

interface IProps{
    selectedDb: string
}

async function updateActiveStatus(data: any) {
    await fetch("/api/allTickets", {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export default function ActiveTicketList({selectedDb}: IProps){

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(`/api/activeTickets?selectedDb=${selectedDb}`, fetcher)

    // toggle active status
    async function markComplete(selectedDb: string, _id: string) {
        mutate(data.filter((ticket: any) => {
            if (ticket._id !== _id){
                return true;
            }
            return false;
        }));
        
        const updateData = {
            "selectedDb": selectedDb,
            "_id" : _id,
            "active" : false
        }
        updateActiveStatus(updateData);
        mutate(data.map((ticket: any) => {
            return ticket;
        }));
        
    }
    if (error) return <p>Error</p>
    if (isLoading) return <p>Loading...</p>

    return (
        <div className="overflow-x-auto">
            <div className="flex">
                {data.map((ticket: any, key: any) => (
                        <ActiveTicket 
                            key={key}    
                            ticket={ticket}
                            selectedDb={selectedDb}
                            markComplete={markComplete}
                        />
                ))}
            </div>
        </div>
    );
}