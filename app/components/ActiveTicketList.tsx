"use client";

import useSWR from 'swr';
import { mutate } from 'swr';
import ActiveTicket from './ActiveTicket';
import { updateActiveStatus } from '../lib/ticketLogic';

interface IProps{
    selectedDb: string
}

export default function ActiveTicketList({selectedDb}: IProps){

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(
        `/api/activeTickets?selectedDb=${selectedDb}`, 
        fetcher
        )

    // toggle active status
    async function toggleActive(selectedDb: string, _id: string, active: boolean) {
        mutate(data.filter((ticket: any) => {
            if (ticket._id !== _id){
                return true;
            }
            return false;
        }));
        
        const updateData = {
            "selectedDb": selectedDb,
            "_id" : _id,
            "active" : active
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
                        toggleActive={toggleActive}
                    />
                ))}
            </div>
        </div>
    );
}