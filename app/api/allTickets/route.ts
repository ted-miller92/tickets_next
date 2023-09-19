// This API endpoint returns a list of tickets from the db

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { z } from "zod";
import { ObjectId } from "mongodb";

const ItemSchema = z.object({
    item_name: z.string(),
    price: z.number(),
    mods: z.string()
})

const TicketSchema = z.object({
    selectedDb: z.string(),
    cust_name: z.string(),
    ticket_items: z.array(ItemSchema),
    promo_code: z.string().optional()
})

export async function GET(req: NextRequest, res: NextResponse) {
    const selectedDb = req.nextUrl.searchParams.get("selectedDb")
    const client = await clientPromise;
    const collection = client.db(selectedDb).collection("tickets");
    const tickets = await collection.find().toArray();
    return NextResponse.json(tickets);
}

export async function POST(req: NextRequest, res: NextResponse) {
    // parse and validate req.body
    const validation = TicketSchema.safeParse(await req.json());

    // response is validation error if errors exist
    if (validation.success === false) {
        return NextResponse.json( {
            "error": validation.error,
            status: 400
        });
    }

    // get data
    const {selectedDb, cust_name, ticket_items, promo_code} = validation.data;

    // connect to db and make the edit
    const client = await clientPromise;

    // Date and time are automatically generated
    const current_date = new Date();
    const date_string = current_date.toDateString()
    const time_string = current_date.toLocaleTimeString();

    // ticket object
    const ticket: any = ({
        cust_name: cust_name, 
        date: date_string,
        time: time_string,
        ticket_items: ticket_items,
        promo_code: promo_code, 
        active: true
    });

    try {
        const result = await client.db(selectedDb).collection("tickets").insertOne(ticket);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            {error: "Error in inserting document to database"},
            {status: 500}
        );
    }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const id = body._id;
    const selectedDb = body.selectedDb;
    
    // connect to db and make the edit
    const client = await clientPromise;

    try {
        const result = await client.db(selectedDb).collection("tickets").updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                active: body.active
            }}
        );
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            {error: "Error in updating document"},
            {status: 500}
        );
    }
}