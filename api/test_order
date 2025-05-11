import {sql} from "@vercel/postgres"

export default async function function1(req,res){
    var orderid = req.body
    const check = await sql`SELECT items FROM testingorder WHERE orderid = ${orderid}`
    if (check.rows.length == 1){
        return res.status(200).json({message:"success",content:check.rows[0]})   
    }else{
        return res.status(200).json({message:"fail"})
    }

}