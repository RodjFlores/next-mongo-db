
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

 
connect()

export async function POST(request:NextRequest,){
    try{
        const reqBody = await request.json()
        const {email, password } = reqBody

        
        const user = await User.findOne({email:email})
        console.log(user)
        if(!user){
            return NextResponse.json({error:"No User Exists"},{status:400})
        }
        const validPass = await bcryptjs.compare(password,user.password)

        if(!validPass){
            return NextResponse.json({error:"Invalid Pass"},{status:400})
        }

        return NextResponse.json({message:'Logged in',user:user},{status:200})
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}

export async function GET(){
    return NextResponse.json({msg:"SIGN UP GET TEST"})
}