"use client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Navigation from "./components/Navigation";
import Link from "next/link";

export default function Home() {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<div>
				<Link href="/tickets">Tickets</Link>
				<Link href="/items">Items</Link>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		);
	}

	return (
		<main>
			<h1 className="text-5xl">Tickets</h1>
			<div className="grid place-items-center h-screen">
				<div className="shadow-lg p-5 rounded-lg">
					
					<button onClick={() => signIn()}>Sign In</button>
					<a href="/restricted">Restricted page</a>
				</div>
			</div>
			
		</main>
	);
}
