// this API endpoint sends a list of all of the databases
// for use when registering as a new user
// user can choose which database they would like to be a part of

import { NextResponse } from 'next/server'
import clientPromise from "../../lib/mongodb";

export async function GET() {
    // get the list of databases from mongodb
    const client = await clientPromise;
    const admin = client.db("tickets").admin();
    const dbInfo = await admin.command({
        listDatabases: 1,
        nameOnly: true, 
    });

    // make an array
    const dbList = [];
    for (const db of dbInfo.databases) {
      dbList.push(db.name);
    }

    // filter out "admin" and "local"
    const filteredList: any= dbList.filter(function(db) {
        return db !== "admin" && db !== "local" && db!== "users";
    });

    return NextResponse.json(filteredList);
}