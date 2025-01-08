import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {name,poly} = req.body
    const check = await sql`SELECT * FROM buildings WHERE boundary = ${String(poly)}`
        if (check.rows.length == 0){}
}