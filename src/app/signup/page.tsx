"use client";
import React, { useEffect } from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import Link from "next/link";


export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:'',
        password:'',
        username:''
    })
    const [loading,setLoading] = React.useState(false)

    const [buttonDisabled,setButtonDisabled] = React.useState(false)

    async function onSignUp(){
        console.log(user)
        setLoading(true) 
        try{
            const response = await axios.post("/api/users/signup",user)
            console.log(response.data)
            router.push('/login')
        }catch(err:any){
            console.error(err.response.data)
        }finally{
            setLoading(false)
        }


    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
    

    return (
        <div>
            <h2>{loading ? 'Loading': 'Sign Up'}</h2>

            <label htmlFor="username">Username: </label>
            <input 
                type="text" 
                placeholder="Username"
                id="username" 
                value={user.username} 
                onChange={(e) => setUser({...user, username: e.target.value})}
            />

            <br/>
            <label htmlFor="email">Email: </label>
            <input 
                type="email" 
                placeholder="user@email.com"
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
            <button onClick={onSignUp}>{buttonDisabled ? 'Incomplete Form' : 'Sign Up'}</button>

            <br/>
            <Link href="/login">Visit Login</Link>
        </div>
    )
}