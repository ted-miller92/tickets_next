"use client";

import Link from "next/link";
import React, {useState } from "react";
import Select from "react-select";
import {useRouter} from "next/router";

export default function RegisterForm({dbOptions}: any) {
    // state variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [selectedDb, setSelectedDb] = useState("");
    const [isSearchable, setIsSearchable] = useState(true);

    // router
    const router = useRouter();

    // options for select dropdown 
    const options = dbOptions.map((db: any) => ({
        value: JSON.stringify(db),
        label: db
    }));

    // handle change of select dropdown
    const handleChange = (selectedDb: { value: string; }) => {
        setSelectedDb(JSON.parse(selectedDb.value));
    }

    // handle submit
    const  handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!name || !email || !password || !selectedDb) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({name, email, password, selectedDb})
            });
            
            // email already exists in db
            if (res.status === 409){
                setError("Email is already in use");
            }

            // redirect
            if (res.status === 201){
                console.log("New user created: ", email);
                router.push("/");
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3">
                    <input 
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        placeholder="Full Name"
                    />
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" 
                        placeholder="Email"
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Password"
                    />
                    
                    <label>Select your group or restaurant:</label>
                    <Select 
                        onChange={handleChange}
                        options={options} 
                        isSearchable={isSearchable}
                    />
                    <button className="bg-purple-500 text-white font-bold cursor-pointer px-6 py-2">Register</button>

                    { error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}</div>
                    )}

                    <Link className="hover:text-purple-400" href={"/"}>Already a user? Login</Link>
                </form>
            </div>
        </div>
    );
}