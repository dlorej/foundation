import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    try{        
        const output = await sql`INSERT INTO test (var1) VALUES (2)`
        return res.status(200).json({message:"ok"})
    
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
}

console.log(function1())
