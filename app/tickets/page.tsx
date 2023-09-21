"use client";


import { useState } from 'react';
import ActiveTicket from '../components/ActiveTicket';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import useSWR from 'swr';

const listItems = [
	{
		id: "1",
		name: "Study Spanish"
	},
	{
		id: "2",
		name: "Workout"
	},
	{
		id: "3",
		name: "Film Youtube"
	},
	{
		id: "4",
		name: "Grocery Shop"
	}
]

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	padding: 10,
	margin: `0 50px 15px 50px`,
	background: isDragging ? "#4a2975" : "white",
	color: isDragging ? "white" : "black",
	border: `1px solid black`,
	fontSize: `20px`,
	borderRadius: `5px`,

	...draggableStyle
})

export default function ActiveTicketList(){
	const selectedDb = "tickets";

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(
        `/api/activeTickets?selectedDb=${selectedDb}`, 
        fetcher
        );
	
	const onDragEnd = (result: DropResult) => {
		const {source, destination} = result;
		if (!destination) {
			return;
		}

		// const tickets = Array.from(data);
		const [newOrder] = data.splice(source.index, 1);

		data.splice(destination.index, 0, newOrder);

		mutate(data.map((ticket: any) => {
            return ticket;
        }));
	}

	if (error) return <p>Error</p>
    if (isLoading) return <p>Loading...</p>


    return (
        <div className="">
            <h1>Drag and Drop</h1>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="ticketList">
					{(provided) => (
						<div className="ticketList" {...provided.droppableProps} ref={provided.innerRef}>
							{data.map(({_id, cust_name}: any, index: any) => {
								return (
									<Draggable key={_id} draggableId={_id} index={index}>
										{(provided, snapshot) => (
											<div ref={provided.innerRef} 
													{...provided.draggableProps}	
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
												>
													
												{cust_name}
											</div>
										)}
									</Draggable>
								)
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
        </div>
    );
}