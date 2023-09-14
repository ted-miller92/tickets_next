"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage(){
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg">
                <h2 className="text-xl font-bold my-4">Log In</h2>
                    <LoginForm />
            </div>
        </div>
    )

}