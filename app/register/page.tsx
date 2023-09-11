"use client"

import RegisterForm from "../components/RegisterForm";
import React, { useEffect, useState } from "react";

export default function Register() {
    const [dbOptions, setDbOptions] = useState([]);

    useEffect(() => {
        callDatabaseAPI();
    }, []);
    
    // get the list of database options for user to select from
    const callDatabaseAPI = async () => {
        try {
            const res = await fetch("/api/databases");
            const data = await res.json();
            setDbOptions(data);
        } catch(err) {
            console.log(err);
        }
    }

    return <RegisterForm dbOptions={dbOptions}/>
}