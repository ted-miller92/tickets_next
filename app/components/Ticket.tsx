"use client"

interface IProps{
    ticket: Ticket
}

export default function Ticket({ticket} : IProps) {
    return (
        <div>
            <h3>{ticket.cust_name}</h3>
            <button 
                className="bg-white hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow"
                
                >Complete</button>
        </div>
    );
}