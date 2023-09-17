export default function ItemGridElement({item}: any){
    return (
        <div className="bg-white p-2 w-fit border border-grey-400 shadow-md hover:shadow-xl">
            <h3 className="text-2xl">{item.item_name}</h3>
            <p className="text-xl">${item.price}</p>
            {item.sold_out 
                ? <p className="font-semibold text-red-600">Sold Out</p> 
                : <p className="text-slate-600">Available</p>
            }
            
            <div className="flex gap-2 mt-3">
                <button className="bg-white hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow">Edit</button>
                <button className="bg-white hover:bg-slate-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow">Sold Out</button>
                <button className="bg-white hover:bg-red-400 text-gray-800 hover:text-white font-bold py-2 px-4 border border-gray-300 rounded shadow">Delete</button>
                
            </div>
        </div>
    );
}