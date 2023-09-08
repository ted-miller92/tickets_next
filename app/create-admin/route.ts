// app/create-admin/route.ts
import clientPromise from "../lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db("users").collection("users");

  const password = bcrypt.hashSync("password", 10);
  await collection.insertOne({
    email: "admin@example.com",
    password: password,
    role: "admin",
  });

  return NextResponse.json({ success: true });
}
