"use client";

import useSWR from 'swr';
import { updateActiveStatus } from '../lib/ticketLogic';
import AllTicketListItem from './AllTicketListItem';

interface IProps{
    selectedDb: string
}

export default function AllTicketList({selectedDb}: IProps){
    
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error, isLoading, mutate} = useSWR(`/api/allTickets?selectedDb=${selectedDb}`, fetcher);

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

    if (error) return <h1>failed to load</h1>
    if (isLoading) return <h1>loading...</h1>

    return (
        <div>
            <ul>
                {data.map((ticket: any, key: any) => (
                    <AllTicketListItem
                        key={key}    
                        ticket={ticket}
                        selectedDb={selectedDb}
                        toggleActive={toggleActive} 
                    />
                ))}
            </ul>
        </div>
    )
}