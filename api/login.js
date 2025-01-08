import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {uid,email} = req.body
    console.log(uid,email)
    // const check = await sql`SELECT * FROM buildings WHERE boundary = ${String(poly)}`
    //     if (check.rows.length == 0){}
}