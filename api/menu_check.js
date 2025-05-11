import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var {item_serial} = req.body
    const check = await sql`SELECT item_name FROM menu WHERE item_serial = ${item_serial}`
    if (check.rows.length == 1){
        const price_check = await sql`SELECT price FROM menu WHERE item_serial = ${item_serial}`
        return res.status(200).json({
            item_name:check.rows[0],
            item_price:price_check[0]
        })   
    }else{
        return res.status(200).json({message:"fail"})
    }

}