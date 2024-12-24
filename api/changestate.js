import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {name,poly} = req.body
    var {name,poly} = req.body
    if (name == null){
        name = ""
    }
    try{
        console.log(name,poly)

        await sql`UPDATE buildings
            SET state = -1
            WHERE name = ${name} AND boundary = ${String(poly)}`
        return res.status(200).json({message:"success"})
    }catch{
        return res.status(500).json({message:"fail"})
    }
    
}