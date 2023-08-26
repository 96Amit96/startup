"use client";

import React, {  useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email:"",
        password:"",
        fullName:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {

        try {
            setLoading(true);
            const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/signup", user);
            console.log(response.data)
            router.push("/login");
            
        } catch (error:any) {
            console.log("signup failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        if(user.email.length > 0 && user.password.length > 0 && user.fullName.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py2">
            <h1>
                { loading ? "processing" : "signup" }
            </h1>
            <br/>
            <label htmlFor="username"> username </label>
            <input
            className="p-2 px-2 py-2 rounded-lg text-black"
            id="username"
            type="text"
            value={user.fullName}
            onChange={(e) => setUser({
                ...user, fullName:e.target.value
            })}
            placeholder="user name"
            />

             <label htmlFor="email"> email </label>
            <input
            className="p-2 px-2 py-2 rounded-lg text-black"
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
            className="p-2 px-2 py-2 rounded-lg mb-4 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({
                ...user, password:e.target.value
            })}
            placeholder="password"
            />
            
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 py-2" >
                {buttonDisabled ? "no sign up" : "signup"}
            </button>
            <Link href="/login">visit login page</Link>
        </div>
    )
}