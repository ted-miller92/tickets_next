"use client"

interface IProps{
    ticket: Ticket
    selectedDb: string
    toggleActive: Function
}

export default function AllTicketListItem({ticket, selectedDb, toggleActive = () => {}}: IProps) {
    return (
        <li>
            <h3>{ticket.cust_name}</h3>
            <p>{ticket.time}</p>
            <p>{ticket.date}</p>
            {ticket.active ? 
                <p>Active</p> : <p>Inactive</p>}
            <button 
                className="bg-white hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow"
                onClick={() => toggleActive(selectedDb, ticket._id, !ticket.active)}
                >Toggle Active</button>
        </li>
    )
}