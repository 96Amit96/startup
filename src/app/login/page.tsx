"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:3010/api/v1/auth/login", user);
            console.log(response.data)
            toast.success("Login Success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login Failed",error.message);
            toast.error(error.message);            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py2">
            <h1> { loading ? "processing" : "login" } </h1>
            <hr/>

             <label htmlFor="email"> email </label>
            <input
            className="p-2 px-2 py-2 rounded-lg mb-2 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({
                ...user, email:e.target.value
            })}
            placeholder="email"
            />

            <label htmlFor="password"> password </label>
            <input
            className="p-2 px-2 py-2 rounded-lg mb-2 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({
                ...user, password:e.target.value
            })}
            placeholder="password"
            />
            <br/>
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600 py-2" >login</button>
            <Link href="/signup">visit signup page</Link>
        </div>
    )
}