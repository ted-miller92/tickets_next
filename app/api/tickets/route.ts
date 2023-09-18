// This API endpoint returns a list of tickets from the db

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
    const selectedDb = req.nextUrl.searchParams.get("selectedDb")

    const client = await clientPromise;
    const collection = client.db(selectedDb).collection("tickets");

    const tickets = await collection.find().toArray();

    return NextResponse.json(tickets);
}