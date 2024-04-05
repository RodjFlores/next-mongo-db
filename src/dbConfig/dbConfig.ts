import mongoose, { connection } from "mongoose";


export async function connect(){
    console.log('-----MONGOOSE-------')

    try{
        console.log('-----TRY-------')
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        // Event for Connection
        connection.on('connected', ()=> {
            console.log('MongoDB connect')
        })

        connection.on('error', (err)=>{
            console.log(err)
        })
    }catch(err){
        console.log('Failed To Connect!')
        console.error(err)
    }
}