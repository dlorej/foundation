import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {name,poly} = req.body
    if (name == null){
        name = ""
    }
    try{
        const check = await sql`SELECT * FROM buildings WHERE boundary = ${String(poly)}`
        if (check.rows.length == 0){
            await sql`INSERT INTO buildings (boundary, name, state) VALUES (${String(poly)},${name},0)`
            var output = "success"
        } else { 
            var output = "exists"
        }
        return res.status(200).json({message:output})
    
    }catch(error){
        console.log(name,poly)
        return res.status(500).json({message:"fail"})
    }
}


//write test case
