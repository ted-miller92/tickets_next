"use client"

interface IProps{
    ticket: Ticket
    selectedDb: string
    toggleActive: Function
}

export default function ActiveTicket({ticket, selectedDb, toggleActive = () => {}}: IProps) {

    const ticketItems = ticket.ticket_items;
    console.log(ticketItems);

    return (
        <div className="bg-white p-2 w-fit border border-grey-400 shadow-md hover:shadow-xl">
            <h3>{ticket.cust_name}</h3>
            <div className="flex gap-2 mt-3">
                <button 
                    className="bg-white hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow"
                    onClick={() => toggleActive(selectedDb, ticket._id, false)}
                    >Complete</button>
                <button className="bg-white hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow"
                    >Edit</button>
            </div>

            {ticketItems.map((item, key) => (
                <div>
                    <p>{item.item_name}</p>
                    <p>{item.mods}</p>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
}