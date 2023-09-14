"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

export default function LoginForm(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    // handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            setFormData({email: "", password: ""});

            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
                callbackUrl,
            });

            setLoading(false);

            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("Invalid credentials");
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    // handle change for text inputs
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }));
        console.log(e.target.value);
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-3">
            
            <input
                name="email"
                onChange={onChange}
                type="text" 
                placeholder="Email" />
            

            <input
                name="password"
                onChange={onChange}
                type="password" 
                placeholder="Password"
            />
            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}</div>
            )}
            <button className="bg-purple-500 text-white font-bold cursor-pointer px-6 py-2">Log In</button>
            <Link className="hover:text-purple-400" href={"/register"}>Register Here</Link>
        </form>
    )

}