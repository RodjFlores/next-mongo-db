"use client";
import React, { useEffect } from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import Link from "next/link";


export default function Login() {
    const [user, setUser] = React.useState({
        password:'',
        email:''
    })

    async function onLogin(){
        console.log(user)
        try{
            const result = await axios.post('/api/users/login',user)
            console.log(result.data)
        }catch(err:any){
            console.log(err.response.data)
        }

    }


    return (
        <div>
            <h2>Login</h2>
            
            <label htmlFor="email">Email: </label>
            <input 
                type="text" 
                placeholder="email"
                id="email" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
            />

            <br/>
            <label htmlFor="password">Password: </label>
            <input 
                placeholder="password"
                id="password"
                type="password" 
                value={user.password} 
                onChange={(e) => setUser({...user, password: e.target.value})}
            />

            <br/>
            <button onClick={onLogin}>Login</button>

            <br/>
            <Link href="/signup">Signup</Link>
        </div>
    )
}