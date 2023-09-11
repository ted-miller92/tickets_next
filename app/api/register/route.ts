import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { z } from "zod";
import bcrypt from "bcrypt";

// validation schema
const UserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    selectedDb: z.string()
});

export async function POST(req: NextRequest, res: NextResponse) {

    // parse and validate req.body
    const validation = UserSchema.safeParse(await req.json());
    
    // response is validation error if errors exist
    if (validation.success === false) {
        return new NextResponse("Validation Error", {
            status: 400,
        });
    }
    
    // get data
    const {name, email, password, selectedDb} = validation.data;
    
    // connect to db
    const client = await clientPromise;
    const db = client.db("users");

    // check if user exists
    let count = await db.collection("users").find({email: email}).count();
    if (count > 0) { 
        return new NextResponse("Email already in use", {
            status: 409,
        });
    }
    
    // hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    let newUser = await db.collection("users").insertOne({
        name, email, hashedPassword, selectedDb
    });

    return new NextResponse(newUser, {
        status: 201,
    });
}