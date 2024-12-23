import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    const select = await sql`SELECT * FROM buildings`
    return res.status(200).json({message:select.rows})
}