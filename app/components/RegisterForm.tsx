"use client";

import Link from "next/link";
import React, {useState } from "react";
import Select from "react-select";
import {useRouter} from "next/navigation";

const userData = {
    name: "",
    email: "",
    password: "",
};

export default function RegisterForm({dbOptions}: any) {
    // state variables
    const [formData, setFormData] = useState(userData);
    const [selectedDb, setSelectedDb] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSearchable, setIsSearchable] = useState(true);

    // router
    const router = useRouter();

    // options for select dropdown 
    type SelectOptionType = {label: string, value: string}
    const options = dbOptions.map((db: any) => ({
        value: db,
        label: db,
    }));

    // handle change of select dropdown
    const handleSelectChange = (option: SelectOptionType | null) => {
        if (option) {
            setSelectedDb(option.value);
            console.log(selectedDb);
        }
    }

    // handle change for text inputs
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }));
        console.log(e.target.value);
    }
   
    // handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {name, email, password} = formData;
        console.log(name, email, password, selectedDb);
        
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
                        name="name"
                        onChange={onChange}
                        type="text" 
                        placeholder="Full Name"
                    />
                    <input 
                        name="email"
                        onChange={onChange}
                        type="text" 
                        placeholder="Email"
                    />
                    <input 
                        name="password"
                        onChange={onChange}
                        type="password" 
                        placeholder="Password"
                    />
                    
                    <label>Select your group or restaurant:</label>
                    <Select 
                        id="selectedDb"
                        options={options} 
                        onChange={handleSelectChange}
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