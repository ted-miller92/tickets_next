export default function AllTicketList({allTickets}: any){
    return (
        <div>
            <h2>All Tickets:</h2>
            <ul>
                {allTickets.map((ticket: any, i: any) => (
                        <li>{ticket.cust_name}</li>
                ))}
            </ul>
        </div>
        
    )
}