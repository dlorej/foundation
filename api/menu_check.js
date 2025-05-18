import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {item_name} = req.body
    const check = await sql`SELECT price FROM menu WHERE item_name = ${item_name}`
    if (check.rows.length == 1){
        return res.status(200).json(check.rows[0])   
    }else{
        return res.status(200).json({message:"fail"})
    }

}