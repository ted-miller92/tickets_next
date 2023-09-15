"use client";

export default function TicketList({allTickets}: any){
    let activeTicketsArray = [...allTickets].filter(function (ticket) {
        return ticket.active;
    });

    return (
        <div>
            <h2>Active Tickets:</h2>
            <ul>
                {activeTicketsArray.map((ticket: any, i: any) => (
                        <li>{ticket.cust_name}</li>
                ))}
            </ul>
        </div>
        
    );
}