import { getServerSession } from "next-auth/next";
import { nextauthOptions } from "../lib/nextauthOptions";
import React from "react";
import { redirect } from "next/navigation";
import clientPromise from "../lib/mongodb";
import ItemsGrid from "../components/ItemsGrid";

export default async function Items() {
	// get the session
	const session = await getServerSession(nextauthOptions);

	// redirect to signin if there is no session.
	if (!session?.user) {
		const url = new URL("/api/auth/signin", "http://localhost:3000");
		url.searchParams.append("callbackUrl", "/items");
		redirect(url.toString());
	}
	console.log(session.user);

	const selectedDb = session.user.selectedDb;
	const items = await getItems(selectedDb);

	// display the page
	return (
		<div>
			<h1>Items Page for {session?.user?.selectedDb}</h1>

			<ItemsGrid items={items}/>
		</div>
	);
}

async function getItems(selectedDb: string) {
	const client = await clientPromise;
    const collection = client.db(selectedDb).collection("items");

	const items = await collection.find().toArray();
	return items;
}