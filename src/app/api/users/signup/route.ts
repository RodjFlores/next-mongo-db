
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

 
connect()

export async function POST(request:NextRequest,){
    try{
        const reqBody = await request.json()
        const {username,email, password } = reqBody

        console.log(reqBody)
        
        const user = await User.findOne({email:email})
        console.log(user)
        if(user){
            return NextResponse.json({error:"User Exists"},{status:400})
        }
        console.log('salting pass')
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,email,password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({message:'User Created',user:newUser},{status:201})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}

export async function GET(){
    return NextResponse.json({msg:"SIGN UP GET TEST"})
}