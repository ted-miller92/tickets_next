// This API endpoint returns a list of tickets from the db

import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function POST(req: Request, res: Response) {
    
    const data = await req.json();

    const selectedDb = data.selectedDb;
    const client = await clientPromise;
    const collection = client.db(selectedDb).collection("tickets");

    const tickets = await collection.find().toArray();

    return NextResponse.json(tickets);
}