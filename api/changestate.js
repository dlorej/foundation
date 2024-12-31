import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {name,poly} = req.body
    var {name,poly} = req.body
    if (name == null){
        name = ""
    }
    try{
        const query = await sql`SELECT state FROM buildings 
            WHERE name = ${name} AND boundary = ${String(poly)} `
        if (query.rows.length == 1){
            if (query.rows[0]["state"] == 0){
                var newstate = -1
            }else if (query.rows[0]["state"] == -1){
                var newstate = 0
            }
            await sql`UPDATE buildings
                SET state = ${newstate}
                WHERE name = ${name} AND boundary = ${String(poly)}`
        }
        return res.status(200).json({message:"success"})
    }catch{
        return res.status(500).json({message:"fail"})
    }
    
}