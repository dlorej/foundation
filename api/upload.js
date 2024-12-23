import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    try{
        const {name,poly} = req.body

        const check = await sql`SELECT * FROM buildings WHERE boundary = ${String(poly)}`
        if (check.rows.length == 0){
            var output = await sql`INSERT INTO buildings (boundary, name, state) VALUES (${String(poly)},${name},0)`
        } else { 
            var output = "exists"
        }
        return res.status(200).json({message:output})
    
    }catch(error){
        return res.status(500).json({message:"fail"})
    }
}


//write test case
